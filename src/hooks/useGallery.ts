import { useState } from 'react';
import { Alert } from 'react-native';
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

export const useGallery = () => {
    const [images, setImages] = useState<MyImage[]>([]);
    const [selectedAlbum, setSelectedAlbum] = useState(defaultAlbum);
    const [albums, setAlbums] = useState([defaultAlbum]);
    const [modalVisible, setModalVisible] = useState(false);
    const [albumTitle, setAlbumTitle] = useState('');
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);

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
                setImages([...images, newImage]);
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
                    setImages(newImages);
                },
            },
        ]);
    };
    const openModal = () => {
        setModalVisible(true);
    };
    const closeModal = () => {
        setModalVisible(false);
    };
    const addAlbum = () => {
        const lastId = albums.length === 0 ? 0 : albums[albums.length - 1].id;
        const newAlbum = {
            id: lastId + 1,
            title: albumTitle,
        };
        setAlbums([...albums, newAlbum]);
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

    const filteredImages = images.filter(image => image.albumId === selectedAlbum.id);
    const imagesWithAddButton: MyImage[] = [
        ...filteredImages,
        {
            id: -1,
            uri: '',
            albumId: -1,
        },
    ];

    return {
        imagesWithAddButton,
        pickImage,
        deleteImage,
        selectedAlbum,
        modalVisible,
        openModal,
        closeModal,
        albumTitle,
        setAlbumTitle,
        addAlbum,
        resetAlbumTitle,
        isDropDownOpen,
        openDropDown,
        closeDropDown,
        albums,
        selectAlbum,
    };
};
