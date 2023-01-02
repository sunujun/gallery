import React from 'react';
import { Image, Modal, Pressable } from 'react-native';
import { MyImage } from './hooks/useGallery';

const TextInputModal = ({
    modalVisible,
    onPressBackdrop,
    selectedImage,
}: {
    modalVisible: boolean;
    onPressBackdrop: () => void;
    selectedImage: MyImage | null;
}) => {
    return (
        <Modal animationType="fade" transparent={true} visible={modalVisible} statusBarTranslucent={true}>
            <Pressable
                onPress={onPressBackdrop}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#99999980' }}>
                <Pressable>
                    <Image
                        source={{ uri: selectedImage?.uri }}
                        style={{ width: 280, height: 280, backgroundColor: '#FFF' }}
                        resizeMode="contain"
                    />
                </Pressable>
            </Pressable>
        </Modal>
    );
};

export default TextInputModal;
