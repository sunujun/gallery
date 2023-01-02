import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { MyAlbum } from './hooks/useGallery';

const headerHeight = 50;

const MyDropDownPicker = ({
    isDropDownOpen,
    onPressAddAlbum,
    onPressHeader,
    onPressAlbum,
    onLongPressAlbum,
    albums,
    selectedAlbum,
}: {
    isDropDownOpen: boolean;
    onPressAddAlbum: () => void;
    onPressHeader: () => void;
    onPressAlbum: (album: MyAlbum) => void;
    onLongPressAlbum: (albumId: number) => void;
    albums: MyAlbum[];
    selectedAlbum: MyAlbum;
}) => {
    return (
        <View style={{ width: '100%' }}>
            <TouchableOpacity
                onPress={onPressHeader}
                activeOpacity={1}
                style={{
                    height: headerHeight,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                }}>
                <Text style={{ fontWeight: 'bold' }}>{selectedAlbum.title}</Text>
                <SimpleLineIcons
                    name={isDropDownOpen ? 'arrow-up' : 'arrow-down'}
                    size={12}
                    color="black"
                    style={{ marginLeft: 8 }}
                />
                <TouchableOpacity
                    onPress={onPressAddAlbum}
                    style={{
                        position: 'absolute',
                        right: 0,
                        height: headerHeight,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                    }}>
                    <Text style={{ fontSize: 12 }}>앨범 추가</Text>
                </TouchableOpacity>
            </TouchableOpacity>
            {isDropDownOpen && (
                <View
                    style={{
                        position: 'absolute',
                        top: headerHeight,
                        width: '100%',
                        borderColor: 'gery',
                        borderTopWidth: 0.5,
                        borderBottomWidth: 0.5,
                    }}>
                    {albums.map(album => {
                        const isSelectedAlbum = album.id === selectedAlbum.id;

                        return (
                            <TouchableOpacity
                                onPress={() => onPressAlbum(album)}
                                onLongPress={() => onLongPressAlbum(album.id)}
                                key={`album-${album.id}`}
                                activeOpacity={1}
                                style={{
                                    paddingVertical: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#FFFFFF',
                                    height: 40,
                                }}>
                                <Text style={{ fontWeight: isSelectedAlbum ? 'bold' : 'normal' }}>{album.title}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            )}
        </View>
    );
};

export default MyDropDownPicker;
