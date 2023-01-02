import React from 'react';
import { Dimensions, FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { MyImage, useGallery } from './src/hooks/useGallery';

const width = Dimensions.get('screen').width;
const columnSize = width / 3;

const App = () => {
    const { imagesWithAddButton, pickImage, deleteImage } = useGallery();

    const onPressOpenGallery = () => {
        pickImage();
    };
    const renderItem = ({ item: { id, uri } }: { item: MyImage }) => {
        const onLongPressImage = () => {
            deleteImage(id);
        };

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
            <TouchableOpacity onLongPress={onLongPressImage}>
                <Image source={{ uri }} style={{ width: columnSize, height: columnSize }} />
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
                <FlatList data={imagesWithAddButton} renderItem={renderItem} numColumns={3} style={{ width: '100%' }} />
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default App;
