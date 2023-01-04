import React from 'react';
import { GestureResponderEvent, Image, Modal, Pressable, TouchableOpacity, View } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { MyImage } from './hooks/useGallery';

const ArrowButton = ({
    iconName,
    onPress,
    disabled,
}: {
    iconName: string;
    onPress: (event: GestureResponderEvent) => void;
    disabled: boolean;
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={{ height: '100%', paddingHorizontal: 20, justifyContent: 'center' }}>
            <SimpleLineIcons name={iconName} size={20} color={disabled ? 'transparent' : 'black'} />
        </TouchableOpacity>
    );
};

const TextInputModal = ({
    modalVisible,
    onPressBackdrop,
    selectedImage,
    onPressArrow,
    showPreviousArrow,
    showNextArrow,
}: {
    modalVisible: boolean;
    onPressBackdrop: () => void;
    selectedImage: MyImage | null;
    onPressArrow: (direction: 'left' | 'right') => void;
    showPreviousArrow: boolean;
    showNextArrow: boolean;
}) => {
    return (
        <Modal animationType="fade" transparent={true} visible={modalVisible} statusBarTranslucent={true}>
            <Pressable
                onPress={onPressBackdrop}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#99999980' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <ArrowButton
                        iconName="arrow-left"
                        onPress={() => onPressArrow('left')}
                        disabled={!showPreviousArrow}
                    />
                    <Pressable>
                        <Image
                            source={{ uri: selectedImage?.uri }}
                            style={{ width: 280, height: 280, backgroundColor: '#FFF' }}
                            resizeMode="contain"
                        />
                    </Pressable>
                    <ArrowButton
                        iconName="arrow-right"
                        onPress={() => onPressArrow('right')}
                        disabled={!showNextArrow}
                    />
                </View>
            </Pressable>
        </Modal>
    );
};

export default TextInputModal;
