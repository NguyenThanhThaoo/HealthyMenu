import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
    StatusBar,
    Platform
} from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { TextComponent, ButtonComponent, InputComponent, RowComponent } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { appColors } from '../../constants/appColors';
import { Lock, Sms, User } from 'iconsax-react-native';
import { ArrowLeft2 } from 'iconsax-react-native';
import { fontFamilies } from '../../constants/fontFamilies';

const initValue = {
    username: '',
    password: '',
};
const EditProfileScreen = () => {
    const navigation = useNavigation();
    const [values, setValues] = useState(initValue);
    const [errorMessage, setErrorMessage] = useState<any>();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState<string | null>(null);

    // Hàm chọn ảnh từ thư viện
    const handleChoosePhoto = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                maxWidth: 300,
                maxHeight: 300,
                quality: 0.8,
            },
            (response) => {
                if (response.didCancel) {
                    console.log('User canceled image picker');
                } else if (response.errorMessage) {
                    console.log('ImagePicker Error:', response.errorMessage);
                } else if (response.assets && response.assets.length > 0 && response.assets[0].uri) {
                    setAvatar(response.assets[0].uri); // Gán URI ảnh
                }
            }
        );
    };

    // Hàm chụp ảnh mới
    const handleTakePhoto = () => {
        launchCamera(
            {
                mediaType: 'photo',
                maxWidth: 300,
                maxHeight: 300,
                quality: 0.8,
            },
            (response) => {
                if (response.didCancel) {
                    console.log('User canceled camera');
                } else if (response.errorMessage) {
                    console.log('Camera Error:', response.errorMessage);
                } else if (response.assets && response.assets.length > 0 && response.assets[0].uri) {
                    setAvatar(response.assets[0].uri);
                }
            }
        );
    };

    const handleChangeValue = (key: string, value: string) => {
        const data: any = { ...values };

        data[`${key}`] = value;

        setValues(data);
    };
    const formValidator = (key: string) => {
        const data = { ...errorMessage };
        let message = '';

        switch (key) {
            case 'password':
                message = !values.password ? `Mật khẩu không được bỏ trống!` : '';
                break;
            case 'username':
                message = !values.username ? `Tên người dùng không được bỏ trống!` : '';
                break;
            default:
                break;
        }

        data[key] = message;
        setErrorMessage(data);
        return message;
    };

    // Hàm xử lý lưu thay đổi
    const handleSaveChanges = () => {
        if (!username.trim() || !password.trim()) {
            Alert.alert('Lỗi', 'Tên người dùng và mật khẩu không được để trống.');
            return;
        }

        Alert.alert(
            'Xác nhận',
            'Bạn có chắc chắn muốn lưu thay đổi?',
            [
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
                {
                    text: 'Lưu',
                    onPress: async () => {
                        try {
                            // Gửi dữ liệu lên server (mock API ở đây)
                            console.log('Avatar:', avatar || 'Chưa có ảnh');
                            console.log('Username:', username);
                            console.log('Password:', password);

                            // Hiển thị thông báo thành công
                            Alert.alert('Thành công', 'Thông tin đã được cập nhật.');
                        } catch (error) {
                            console.error('Lỗi khi lưu thông tin:', error);
                            Alert.alert('Lỗi', 'Không thể cập nhật thông tin.');
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {/* <Text style={styles.title}>Chỉnh sửa thông tin</Text> */}
            <StatusBar barStyle="light-content" backgroundColor={appColors.primary} />
      
            {/* Phần Header */}
            <View
              style={{
                backgroundColor: appColors.primary,
                height: 180,
                borderBottomLeftRadius: 40,
                borderBottomRightRadius: 40,
                paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 + 20 : 20,
                paddingHorizontal: 1,
              }}>
            <RowComponent styles={{ padding: 16 }}>
                <RowComponent styles={{ flex: 1, marginTop: 25 }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            width: 32,
                            height: 30,
                            justifyContent: 'center',

                        }}>
                        <ArrowLeft2 size={24} color={appColors.white} />
                    </TouchableOpacity>
                    <TextComponent
                        flex={1}
                        text="Chỉnh sửa thông tin"
                        title
                        color={appColors.white}
                        font={fontFamilies.medium}

                    />
                </RowComponent>
            </RowComponent>
            </View>

            {/* Avatar */}
            <View style={styles.container}>
            <View style={styles.avatarContainer}>
                {avatar ? (
                    <Image source={{ uri: avatar }} style={styles.avatar} />
                ) : (
                    <Text style={styles.avatarPlaceholder}>Chưa có ảnh đại diện</Text>
                )}
                <TouchableOpacity onPress={handleChoosePhoto} >
                    <Text style={styles.changeAvatarText}>Chọn ảnh từ thư viện</Text>
                </TouchableOpacity>
                {/* <ButtonComponent
                    text="Chọn ảnh từ thư viện"
                    type="primary"
                    onPress={handleChoosePhoto}
                /> */}
            </View>

            {/* Thông tin người dùng */}
            {/* <TextInput
                style={styles.input}
                placeholder="Họ tên"
                value={username}
                onChangeText={setUsername}
            /> */}
            <InputComponent
                value={values.username}
                placeholder="Họ tên"
                onChange={val => handleChangeValue('username', val)}
                allowClear
                affix={<User size={22} color={appColors.gray} />}
            />
            {/* <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            /> */}
            <InputComponent
                value={values.password}
                placeholder="Mật khẩu"
                onChange={val => handleChangeValue('password', val)}
                isPassword
                allowClear
                affix={<Lock size={22} color={appColors.gray} />}
                onEnd={() => formValidator('password')}
            />

            {/* Lưu thay đổi */}
            <ButtonComponent
                text="Thay đổi thông tin"
                type="primary"
                onPress={handleSaveChanges}
            />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 16,
        paddingTop: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 12,
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#ccc',
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#fff',
        fontSize: 16,
        marginBottom: 12,
    },
    changeAvatarButton: {
        backgroundColor: '#007bff',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginBottom: 8,
    },
    changeAvatarText: {
        color: appColors.primary,
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
});

export default EditProfileScreen;
