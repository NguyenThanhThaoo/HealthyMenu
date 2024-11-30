import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  Alert,
  TouchableOpacity,
  Platform,
  StatusBar,
  TextInput
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView } from 'react-native-virtualized-view';
import {
  CircleComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
  ContainerComponent,
  CardComponent,
  ButtonComponent
} from '../../components';
import { fontFamilies } from '../../constants/fontFamilies';
import { globalStyles } from '../../styles/globalStyles';
import { appColors } from '../../constants/appColors';
import { LinearGradient } from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RecommandDishesAPI } from '../../apis/RecommandDishesAPI';

type RootStackParamList = {
  HealthFormScreen: undefined; // Khai báo màn hình HealthForm
  Main: undefined; // Thêm các màn hình khác nếu cần
};


type Props = NativeStackScreenProps<RootStackParamList, 'HealthFormScreen'>;

const HealthFormScreen: React.FC<Props> = ({ navigation, route }: any) => {
  const [healthConditions, setHealthConditions] = useState<string[]>([]);
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);
  const [authData, setAuthData] = useState(null);
  const [gender, setGender] = useState<string>(''); // Giới tính
  const [height, setHeight] = useState<string>(''); // Chiều cao
  const [weight, setWeight] = useState<string>(''); // Cân nặng
  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        const value = await AsyncStorage.getItem('auth');
        if (value !== null) {
          const parsedData = JSON.parse(value);
          console.log("parsedData",parsedData)
          setGender(parsedData?.gender||"")
          setHeight(""+parsedData?.height||"")
          setWeight(""+parsedData?.weight||"")
          setHealthConditions(parsedData?.statusHealth)
          setAuthData(parsedData);
        } else {
          console.log('Không có dữ liệu trong AsyncStorage');
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ AsyncStorage:', error);
      }
    };

    fetchAuthData();
  }, []); // Chạy khi component được mount

  // const toggleCheckbox = (
  //   item: string,
  //   list: string[],
  //   setList: React.Dispatch<React.SetStateAction<string[]>>
  // ) => {
  //   if (list.includes(item)) {
  //     setList(list.filter((i) => i !== item));
  //   } else {
  //     setList([...list, item]);
  //   }
  // };
  const handleChangeWeight = (text: string) => {
    // Kiểm tra nếu giá trị là một số hợp lệ
    const numericValue = text.replace(/[^0-9.]/g, ''); // Loại bỏ ký tự không phải số
    setWeight(numericValue);
  };
  const handleChangeHeight = (text: string) => {
    // Kiểm tra nếu giá trị là một số hợp lệ
    const numericValue = text.replace(/[^0-9.]/g, ''); // Loại bỏ ký tự không phải số
    setHeight(numericValue);
  };
  const toggleCheckbox = (
    item: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (item === 'none') {
      // Nếu chọn "Không có", bỏ chọn tất cả các mục khác
      setList(list.includes(item) ? [] : ['none']);
    } else {
      // Bỏ chọn "Không có" nếu chọn mục khác
      setList(list.includes(item) ? list.filter((i) => i !== item) : [...list.filter((i) => i !== 'none'), item]);
    }
  };

  const getAccessToken = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (token !== null) {
        // Nếu dữ liệu tồn tại, giải mã chuỗi JSON nếu cần
        return token; // Hoặc JSON.parse(token) nếu bạn lưu trữ đối tượng JSON
      }
    } catch (error) {
      console.error('Lỗi lấy accessToken:', error);
      return null;
    }
  };
  
  const handleSubmit = async () => {
    const userData = {
      statusHealth: healthConditions,
      gender,
      height: parseFloat(height), 
      weight: parseFloat(weight),
    };


    try {
      const token = await getAccessToken();
      const response = await RecommandDishesAPI.submitFormInfo(userData,token)

      if (response?.status===200) {
        Alert.alert('Thông báo', 'Thông tin đã được lưu thành công!');
        const updatedUserData = response.data.data;
        await AsyncStorage.setItem('auth', JSON.stringify(updatedUserData))
   
        navigation.navigate('Main', {updatedHealthData: userData});
      } else {
        Alert.alert('Lỗi', 'Không thể lưu thông tin, vui lòng thử lại sau.');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Đã xảy ra lỗi trong quá trình gửi thông tin.');
      console.error(error);
    }
  };
  
  
  

  const healthOptions = [
    { label: 'Tiểu đường', value: 'Tiểu đường' },
    { label: 'Tim mạch', value: 'Tim mạch' },
    { label: 'Cao huyết áp', value: 'Cao huyết áp' },
    { label: 'Thừa cân', value: 'Thừa cân' },
    { label: 'Thiếu cân', value: 'Thiếu cân' },
    { label: 'Gút', value: 'Gút' },
    { label: 'Mỡ trong máu', value: 'Mỡ trong máu' },
    { label: 'Thiếu máu', value: 'Thiếu máu' },
    { label: 'Tai biến mạch máu não', value: 'Tai biến mạch máu não' },
    { label: 'Xơ gan', value: 'Xơ gan' },
    { label: 'Viêm phổi', value: 'Viêm phổi' },
    { label: 'Không có', value: 'Không có' },
  ];


  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Xử lý padding trên Android

      }}
    >
      <ScrollView style={{ flex: 1 }}>
        {/* <RowComponent styles={{ padding: 16 }}>
          <RowComponent styles={{ flex: 1 }}>
            <TextComponent
              flex={1}
              text="Nhập thông tin thể trạng"
              title
              color={appColors.text} // Sửa lỗi cú pháp
            />
          </RowComponent>
        </RowComponent> */}
        <View style={{ padding: 16 }}>
          <TextComponent
            text="Giới tính "
            font={fontFamilies.medium}
            size={20}
            styles={{ marginBottom: 8 }}
          />
          <RowComponent>
            <TouchableOpacity
              style={{
                flex: 1,
                padding: 10,
                margin: 4,
                borderWidth: 1,
                borderRadius: 8,
                borderColor: gender === 'male' ? '#6cbb4e' : '#ccc',
                backgroundColor: gender === 'male' ? '#d4f5d0' : '#fff',
                alignItems: 'center',
              }}
              onPress={() => setGender('male')}
            >
              <Text>Nam</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                padding: 10,
                margin: 4,
                borderWidth: 1,
                borderRadius: 8,
                borderColor: gender === 'female' ? '#6cbb4e' : '#ccc',
                backgroundColor: gender === 'female' ? '#d4f5d0' : '#fff',
                alignItems: 'center',
              }}
              onPress={() => setGender('female')}
            >
              <Text>Nữ</Text>
            </TouchableOpacity>
          </RowComponent>

          <TextComponent
            text="Chiều cao (cm)"
            font={fontFamilies.medium}
            size={20}
            styles={{ marginBottom: 8, marginTop: 8 }} />
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 8,
              padding: 8,
              borderColor: '#ccc',
              marginTop: 8,
            }}
            placeholder="Nhập chiều cao của bạn"
            keyboardType="numeric"
            value={height||""}
            onChangeText={handleChangeHeight}
          />

          <TextComponent
            text="Cân nặng (kg)"
            font={fontFamilies.medium}
            size={20}
            styles={{ marginBottom: 8, marginTop: 8 }} />
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 8,
              padding: 8,
              borderColor: '#ccc',
              marginTop: 8,
            }}
            placeholder="Nhập cân nặng của bạn"
            keyboardType="numeric"
            value={weight||""}
            onChangeText={handleChangeWeight}
          />
        </View>


        <SectionComponent styles={{ paddingBottom: 1 }}>
          <RowComponent styles={{}}>
            <TextComponent
              flex={1}
              text="Bạn có gặp tình trạng nào dưới đây không?"
              font={fontFamilies.semiBold}
              size={20}
              styles={{ marginBottom: 8 }}
            />
          </RowComponent>
        </SectionComponent>
        <View style={{ paddingBottom: 100 }}>
          {healthOptions.map((option) => (
            <Checkbox.Item
              key={option.value}
              label={option.label}
              status={healthConditions.includes(option.value) ? 'checked' : 'unchecked'}
              onPress={() => toggleCheckbox(option.value, healthConditions, setHealthConditions)}
              style={styles.checkboxItem}
              color='#6cbb4e'
            />
          ))}
        </View>
      </ScrollView>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 1)']}
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          padding: 12,
        }}>
        <ButtonComponent
          text="Gửi thông tin"
          type="primary"
          onPress={handleSubmit}
        />
      </LinearGradient>
    </SafeAreaView>
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
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  checkboxItem: {
    paddingBottom: 0,
  },
});

export default HealthFormScreen;
