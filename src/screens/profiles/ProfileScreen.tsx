import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, StatusBar, Platform } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { appColors } from '../../constants/appColors';
import { TextComponent, ButtonComponent } from '../../components';
import { fontFamilies } from '../../constants/fontFamilies';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserData } from '../../components/getDataUser';

// Định nghĩa kiểu cho navigation
type ProfileScreenProps = {
  navigation: NavigationProp<any>;
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  // Mock thông tin người dùng
  const user = {
    avatar: require('../../assets/images/salad.jpg'), // Link ảnh đại diện
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    gender: 'Nam', // Giới tính
    height: 170, // Chiều cao (cm)
    weight: 65, // Cân nặng (kg)
    healthConditions: ['Tiểu đường', 'Cao huyết áp'],
  };
  // const dataUser = async () => {
  //   const userData = await getUserData();
  //   return userData
  // }

  const [userData, setUserData] = useState<any>(null); // Initialize with null or default state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData(); // Get data asynchronously
      setUserData(data); // Set the data in the state
      setUsername(data?.username || ''); // Gán giá trị mặc định
    };

    fetchData(); // Call the async function to fetch data
  }, []); // Empty dependency array means it runs once when the component mounts
  console.log(userData)
  // React.useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await fetch('http://your-api-url/users/profile', {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       });
  //       const data = await response.json();
  //       setUser(data); // Giả sử API trả về dữ liệu người dùng
  //     } catch (error) {
  //       console.error('Lỗi khi lấy dữ liệu người dùng:', error);
  //     }
  //   };

  //   fetchUserData();
  // }, []);
  const [avatar, setAvatar] = React.useState(user.avatar);
  const handleChangeAvatar = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    // launchImageLibrary(options, (response) => {
    //   if (response.didCancel) {
    //     console.log('Người dùng đã hủy chọn ảnh.');
    //   } else if (response.errorCode) {
    //     console.error('Lỗi khi chọn ảnh:', response.errorMessage);
    //   } else {
    //     const source = { uri: response.assets[0].uri };
    //     setAvatar(source); // Cập nhật ảnh đại diện
    //   }
    // });
  };

  // const uploadAvatar = async (imageUri) => {
  //   const formData = new FormData();
  //   formData.append('avatar', {
  //     uri: imageUri,
  //     type: 'image/jpeg', // hoặc loại ảnh phù hợp
  //     name: 'avatar.jpg',
  //   });

  //   try {
  //     const response = await fetch('http://your-api-url/upload-avatar', {
  //       method: 'POST',
  //       body: formData,
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

  //     const data = await response.json();
  //     console.log('Ảnh đã được tải lên:', data);
  //   } catch (error) {
  //     console.error('Lỗi khi tải ảnh lên:', error);
  //   }
  //   if (response.assets[0].uri) {
  //     const source = { uri: response.assets[0].uri };
  //     setAvatar(source);
  //     uploadAvatar(response.assets[0].uri); // Tải ảnh lên server
  //   }

  // };


  const handleLogout = async () => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn đăng xuất không?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Đăng xuất',
          onPress: async () => {
            try {
              // Xóa thông tin người dùng khỏi AsyncStorage
              await AsyncStorage.removeItem('auth');
              await AsyncStorage.removeItem('accessToken');
              await AsyncStorage.clear();

              // Điều hướng về màn hình đăng nhập
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });

              console.log('Đã đăng xuất');
            } catch (error) {
              console.error('Lỗi khi đăng xuất:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="light-content" backgroundColor={appColors.primary} />
      <View
        style={{
          backgroundColor: appColors.primary,
          height: 180,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 + 20 : 20,
          paddingHorizontal: 16,
        }}>
        <TextComponent
          text="Thông tin hồ sơ"
          title
          color={appColors.white} 
          font={fontFamilies.medium}
          styles={{
            marginTop: 36,
          }}
        />


      </View>

      {/* Thông tin người dùng */}
      <View style={styles.profileContainer}>
        {/* <Image source={user.avatar} style={styles.avatar} /> */}
        {/* <TouchableOpacity onPress={handleChangeAvatar}>
          <Image source={avatar} style={styles.avatar} />
        </TouchableOpacity> */}

        {/* Avatar */}
        <Image source={avatar} style={styles.avatar} />
        <Text style={styles.name}>{userData?.username}</Text>
        <Text style={styles.email}>{userData?.email}</Text>
        {/* Hiển thị thông tin giới tính */}
        <Text style={styles.infoText}>Giới tính: {userData?.gender}</Text>

        {/* Hiển thị chiều cao */}
        <Text style={styles.infoText}>Chiều cao: {"" + userData?.height} cm</Text>

        {/* Hiển thị cân nặng */}
        <Text style={styles.infoText}>Cân nặng: {"" + userData?.weight} kg</Text>

        {/* Hiển thị tình trạng bệnh */}
        <Text style={styles.infoText}>
          Tình trạng bệnh: {userData?.statusHealth?.length > 0 ? userData?.statusHealth.join(', ') : 'Không có'}
        </Text>
      </View>
      {/* Thay đổi thông tin */}
      <ButtonComponent
        text="Thay đổi thông tin"
        type="primary"
        onPress={() => navigation.navigate('EditProfile')}
      />
      {/* Nút Đăng xuất */}
      <ButtonComponent
        text="Đăng xuất"
        type="primary"
        onPress={handleLogout}

      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: appColors.primary,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 32,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  changeAvatarText: {
    color: appColors.primary,
    fontSize: 14,
    marginTop: 8,
    fontWeight: '600',
  },
  changeInfoButton: {
    backgroundColor: appColors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
  },
  changeInfoText: {
    color: appColors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },

});


export default ProfileScreen;


