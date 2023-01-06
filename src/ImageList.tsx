import React from 'react';
import { TouchableOpacity, Text, Image, FlatList, Dimensions } from 'react-native';
import { MyImage } from './hooks/useGallery';

const width = Dimensions.get('screen').width;
const minColumnSize = width >= 500 ? 200 : 120;
const divisor = width / minColumnSize;
const numColumns = Math.floor(divisor);
const columnSize = width / numColumns;

const ImageList = ({
    imagesWithAddButton,
    onPressOpenGallery,
    onPressImage,
    onLongPressImage,
}: {
    imagesWithAddButton: MyImage[];
    onPressOpenGallery: () => void;
    onPressImage: (image: MyImage) => void;
    onLongPressImage: (imageId: number) => void;
}) => {
    const renderItem = ({ item: image }: { item: MyImage }) => {
        const { id, uri } = image;
        if (id === -1) {
            return (
                <TouchableOpacity
                    onPress={onPressOpenGallery}
                    style={{
                        width: columnSize,
                        height: columnSize,
                        backgroundColor: 'lightgrey',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text style={{ fontWeight: '100', fontSize: 45 }}>+</Text>
                </TouchableOpacity>
            );
        }

        return (
            <TouchableOpacity
                onPress={() => onPressImage(image)}
                onLongPress={() => {
                    onLongPressImage(id);
                }}>
                <Image source={{ uri }} style={{ width: columnSize, height: columnSize }} />
            </TouchableOpacity>
        );
    };
    return (
        <FlatList
            data={imagesWithAddButton}
            renderItem={renderItem}
            numColumns={numColumns}
            style={{ width: '100%', zIndex: -1 }}
        />
    );
};

export default ImageList;
