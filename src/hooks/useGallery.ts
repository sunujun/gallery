import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';

export type MyImage = {
    id: number;
    uri: string;
    albumId: number;
};

export type MyAlbum = {
    id: number;
    title: string;
};

const defaultAlbum: MyAlbum = {
    id: 1,
    title: '기본',
};

const ASYNC_KEY = {
    IMAGES: 'images',
    ALBUMS: 'albums',
};

export const useGallery = () => {
    const [images, setImages] = useState<MyImage[]>([]);
    const [selectedAlbum, setSelectedAlbum] = useState(defaultAlbum);
    const [albums, setAlbums] = useState([defaultAlbum]);
    const [textInputModalVisible, setTextInputModalVisible] = useState(false);
    const [bigImageModalVisible, setBigImageModalVisible] = useState(false);
    const [albumTitle, setAlbumTitle] = useState('');
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<MyImage | null>(null);

    const filteredImages = images.filter(image => image.albumId === selectedAlbum.id);
    const showPreviousArrow = filteredImages.findIndex(image => image.id === selectedImage?.id) !== 0;
    const showNextArrow =
        filteredImages.findIndex(image => image.id === selectedImage?.id) !== filteredImages.length - 1;

    const imagesWithAddButton: MyImage[] = [
        ...filteredImages,
        {
            id: -1,
            uri: '',
            albumId: -1,
        },
    ];

    const initValues = async () => {
        const imagesFromStorage = await AsyncStorage.getItem(ASYNC_KEY.IMAGES);
        if (imagesFromStorage !== null) {
            const parsed = JSON.parse(imagesFromStorage);
            setImages(parsed);
        }
        const albumsFromStorage = await AsyncStorage.getItem(ASYNC_KEY.ALBUMS);
        if (albumsFromStorage !== null) {
            const parsed = JSON.parse(albumsFromStorage);
            setAlbums(parsed);
        }
    };

    useEffect(() => {
        initValues();
    }, []);

    const _setImages = (newImages: MyImage[]) => {
        setImages(newImages);
        AsyncStorage.setItem(ASYNC_KEY.IMAGES, JSON.stringify(newImages));
    };

    const _setAlbums = (newAlbums: MyAlbum[]) => {
        setAlbums(newAlbums);
        AsyncStorage.setItem(ASYNC_KEY.ALBUMS, JSON.stringify(newAlbums));
    };

    const pickImage = async () => {
        let result = await launchImageLibrary({
            mediaType: 'mixed',
            quality: 1,
        });

        if (!result.didCancel && result.assets !== undefined) {
            if (result.assets[0].uri !== undefined) {
                const lastId = images.length === 0 ? 0 : images[images.length - 1].id;
                const newImage: MyImage = {
                    id: lastId + 1,
                    uri: result.assets[0].uri,
                    albumId: selectedAlbum.id,
                };
                _setImages([...images, newImage]);
            }
        }
    };
    const deleteImage = (imageId: number) => {
        Alert.alert('이미지를 삭제하시겠습니까?', '', [
            {
                style: 'cancel',
                text: '아니요',
            },
            {
                text: '네',
                onPress: () => {
                    const newImages = images.filter(image => image.id !== imageId);
                    _setImages(newImages);
                },
            },
        ]);
    };
    const deleteAlbumImages = (albumId: number) => {
        const newImages = images.filter(image => image.albumId !== albumId);
        setImages(newImages);
    };
    const openTextInputModal = () => {
        setTextInputModalVisible(true);
    };
    const closeTextInputModal = () => {
        setTextInputModalVisible(false);
    };
    const addAlbum = () => {
        const lastId = albums.length === 0 ? 0 : albums[albums.length - 1].id;
        const newAlbum = {
            id: lastId + 1,
            title: albumTitle,
        };
        _setAlbums([...albums, newAlbum]);
    };
    const resetAlbumTitle = () => {
        setAlbumTitle('');
    };
    const openDropDown = () => {
        setIsDropDownOpen(true);
    };
    const closeDropDown = () => {
        setIsDropDownOpen(false);
    };
    const selectAlbum = (album: MyAlbum) => {
        setSelectedAlbum(album);
    };
    const deleteAlbum = (albumId: number) => {
        if (albumId === defaultAlbum.id) {
            Alert.alert('기본 앨범은 삭제할 수 없습니다');
            return;
        }
        Alert.alert('앨범을 삭제하시겠습니까?', '', [
            {
                style: 'cancel',
                text: '아니요',
            },
            {
                text: '네',
                onPress: () => {
                    deleteAlbumImages(albumId);
                    const newAlbums = albums.filter(album => album.id !== albumId);
                    _setAlbums(newAlbums);
                    setSelectedAlbum(defaultAlbum);
                },
            },
        ]);
    };
    const openBigImageModal = () => {
        setBigImageModalVisible(true);
    };
    const closeBigImageModal = () => {
        setBigImageModalVisible(false);
    };
    const selectImage = (image: MyImage) => {
        setSelectedImage(image);
    };
    const moveToPreviousImage = () => {
        if (!selectedImage) {
            return;
        }
        const selectedImageIndex = filteredImages.findIndex(image => image.id === selectedImage.id);
        const previousImageIndex = selectedImageIndex - 1;
        if (previousImageIndex < 0) {
            return;
        }
        const previousImage = filteredImages[previousImageIndex];
        setSelectedImage(previousImage);
    };
    const moveToNextImage = () => {
        if (!selectedImage) {
            return;
        }
        const selectedImageIndex = filteredImages.findIndex(image => image.id === selectedImage.id);
        const nextImageIndex = selectedImageIndex + 1;
        if (nextImageIndex > filteredImages.length - 1 || nextImageIndex === -1) {
            return;
        }
        const nextImage = filteredImages[nextImageIndex];
        setSelectedImage(nextImage);
    };

    return {
        imagesWithAddButton,
        pickImage,
        deleteImage,
        selectedAlbum,
        textInputModalVisible,
        openTextInputModal,
        closeTextInputModal,
        albumTitle,
        setAlbumTitle,
        addAlbum,
        resetAlbumTitle,
        isDropDownOpen,
        openDropDown,
        closeDropDown,
        albums,
        selectAlbum,
        deleteAlbum,
        bigImageModalVisible,
        openBigImageModal,
        closeBigImageModal,
        selectImage,
        selectedImage,
        moveToPreviousImage,
        moveToNextImage,
        showPreviousArrow,
        showNextArrow,
    };
};
