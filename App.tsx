import React, { useEffect } from 'react';
import { Alert, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import mobileAds from 'react-native-google-mobile-ads';
import { MyAlbum, MyImage, useGallery } from './src/hooks/useGallery';
import { useRewardAd } from './src/hooks/useRewardAd';
import BigImageModal from './src/BigImageModal';
import MyDropDownPicker from './src/MyDropDownPicker';
import TextInputModal from './src/TextInputModal';
import ImageList from './src/ImageList';

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

    const onPressWatchAd = () => {
        rewarded.show();
    };
    const onPressAddAlbum = () => {
        if (albums.length >= 2) {
            Alert.alert('????????? ???????????? ????????? ????????? ??? ????????????.', '', [
                {
                    style: 'cancel',
                    text: '??????',
                },
                {
                    text: '?????? ??????',
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
                {/* ?????? DropDown, ?????? ?????? ?????? */}
                <MyDropDownPicker
                    isDropDownOpen={isDropDownOpen}
                    selectedAlbum={selectedAlbum}
                    onPressAddAlbum={onPressAddAlbum}
                    onPressHeader={onPressHeader}
                    onPressAlbum={onPressAlbum}
                    onLongPressAlbum={onLongPressAlbum}
                    albums={albums}
                />
                {/* ????????? ???????????? TextInput Modal */}
                <TextInputModal
                    modalVisible={textInputModalVisible}
                    albumTitle={albumTitle}
                    setAlbumTitle={setAlbumTitle}
                    onSubmitEditing={onSubmitEditing}
                    onPressBackdrop={onPressTextInputModalBackdrop}
                />
                {/* ???????????? ?????? ?????? Modal */}
                <BigImageModal
                    modalVisible={bigImageModalVisible}
                    onPressBackdrop={onPressBigImageModalBackdrop}
                    selectedImage={selectedImage}
                    onPressArrow={onPressArrow}
                    showPreviousArrow={showPreviousArrow}
                    showNextArrow={showNextArrow}
                />
                {/* ????????? ????????? */}
                <ImageList
                    imagesWithAddButton={imagesWithAddButton}
                    onPressOpenGallery={onPressOpenGallery}
                    onPressImage={onPressImage}
                    onLongPressImage={onLongPressImage}
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
