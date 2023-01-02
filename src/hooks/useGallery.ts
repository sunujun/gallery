import { useState } from 'react';
import { Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

export type MyImage = {
    id: number;
    uri: string;
};

export const useGallery = () => {
    const [images, setImages] = useState<MyImage[]>([]);

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
    const imagesWithAddButton: MyImage[] = [
        ...images,
        {
            id: -1,
            uri: '',
        },
    ];

    return {
        images,
        imagesWithAddButton,
        pickImage,
        deleteImage,
    };
};
