import React, { useEffect } from 'react';
import { Alert, Dimensions, FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import mobileAds from 'react-native-google-mobile-ads';
import { MyAlbum, MyImage, useGallery } from './src/hooks/useGallery';
import { useRewardAd } from './src/hooks/useRewardAd';
import BigImageModal from './src/BigImageModal';
import MyDropDownPicker from './src/MyDropDownPicker';
import TextInputModal from './src/TextInputModal';

const width = Dimensions.get('screen').width;
const columnSize = width / 3;

const App = () => {
    mobileAds()
        .initialize()
        .then(() => {
            // Initialization complete!
        });

    const { rewarded, isEarned, setIsEarned, setIsLoaded } = useRewardAd();
    const {
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
    } = useGallery();

    useEffect(() => {
        if (isEarned) {
            openTextInputModal();
            setIsLoaded(false);
            setIsEarned(false);
        }
    }, [isEarned, openTextInputModal, setIsEarned, setIsLoaded]);

    const onPressOpenGallery = () => {
        pickImage();
    };
    const onLongPressImage = (imageId: number) => {
        deleteImage(imageId);
    };
    const onPressImage = (image: MyImage) => {
        selectImage(image);
        openBigImageModal();
    };
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
    const onPressWatchAd = () => {
        rewarded.show();
    };
    const onPressAddAlbum = () => {
        if (albums.length >= 2) {
            Alert.alert('광고를 시청해야 앨범을 추가할 수 있습니다.', '', [
                {
                    style: 'cancel',
                    text: '닫기',
                },
                {
                    text: '광고 시청',
                    onPress: onPressWatchAd,
                },
            ]);
        } else {
            openTextInputModal();
        }
    };
    const onSubmitEditing = () => {
        if (albumTitle) {
            addAlbum();
            resetAlbumTitle();
        }
        closeTextInputModal();
    };
    const onPressTextInputModalBackdrop = () => {
        closeTextInputModal();
    };
    const onPressHeader = () => {
        if (isDropDownOpen) {
            closeDropDown();
        } else {
            openDropDown();
        }
    };
    const onPressAlbum = (album: MyAlbum) => {
        selectAlbum(album);
        closeDropDown();
    };
    const onLongPressAlbum = (albumId: number) => {
        deleteAlbum(albumId);
    };
    const onPressBigImageModalBackdrop = () => {
        closeBigImageModal();
    };
    const onPressArrow = (direction: 'left' | 'right') => {
        if (direction === 'left') {
            moveToPreviousImage();
        } else {
            moveToNextImage();
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
                {/* 앨범 DropDown, 앨범 추가 버튼 */}
                <MyDropDownPicker
                    isDropDownOpen={isDropDownOpen}
                    selectedAlbum={selectedAlbum}
                    onPressAddAlbum={onPressAddAlbum}
                    onPressHeader={onPressHeader}
                    onPressAlbum={onPressAlbum}
                    onLongPressAlbum={onLongPressAlbum}
                    albums={albums}
                />
                {/* 앨범을 추가하는 TextInput Modal */}
                <TextInputModal
                    modalVisible={textInputModalVisible}
                    albumTitle={albumTitle}
                    setAlbumTitle={setAlbumTitle}
                    onSubmitEditing={onSubmitEditing}
                    onPressBackdrop={onPressTextInputModalBackdrop}
                />
                {/* 이미지를 크게 보는 Modal */}
                <BigImageModal
                    modalVisible={bigImageModalVisible}
                    onPressBackdrop={onPressBigImageModalBackdrop}
                    selectedImage={selectedImage}
                    onPressArrow={onPressArrow}
                    showPreviousArrow={showPreviousArrow}
                    showNextArrow={showNextArrow}
                />
                {/* 이미지 리스트 */}
                <FlatList
                    data={imagesWithAddButton}
                    renderItem={renderItem}
                    numColumns={3}
                    style={{ width: '100%', zIndex: -1 }}
                />
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
