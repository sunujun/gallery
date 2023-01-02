import React from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, TextInput, View } from 'react-native';

const TextInputModal = ({
    modalVisible,
    albumTitle,
    setAlbumTitle,
    onSubmitEditing,
    onPressBackdrop,
}: {
    modalVisible: boolean;
    albumTitle: string;
    setAlbumTitle: React.Dispatch<React.SetStateAction<string>>;
    onSubmitEditing: () => void;
    onPressBackdrop: () => void;
}) => {
    return (
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <Pressable onPress={onPressBackdrop} style={{ flex: 1 }}>
                    <View style={{ width: '100%', position: 'absolute', bottom: 0, flex: 1 }}>
                        <TextInput
                            placeholder="앨범명을 입력해주세요"
                            value={albumTitle}
                            onChangeText={setAlbumTitle}
                            onSubmitEditing={onSubmitEditing}
                            autoFocus={true}
                            style={{ width: '100%', padding: 10, borderWidth: 0.5, borderColor: 'lightgrey' }}
                        />
                    </View>
                </Pressable>
            </KeyboardAvoidingView>
        </Modal>
    );
};

export default TextInputModal;
