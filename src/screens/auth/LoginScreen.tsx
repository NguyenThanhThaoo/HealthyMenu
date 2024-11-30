import {Lock, Sms} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {Alert, Image, Switch} from 'react-native';
import {authApi} from '../../apis/authenticationApi';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
// import {Validate} from '../../utils/validate';
// import SocialLogin from './components/SocialLogin';
// import {useDispatch} from 'react-redux';
// import {addAuth} from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SocialLogin from './components/SocialLogin';
import { Validate } from '../../utils/validate';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(true);
  const [isDisable, setIsDisable] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const emailValidation = Validate.email(email);

    if (!email || !password || !emailValidation) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [email, password]);

  const handleLogin = async () => {
    const emailValidation = Validate.email(email);
    if (emailValidation) {
      try {
        const res = await authApi.login({ email, password });
        if (res?.status === 200) {
          const accessToken = res?.data?.acesstoken; // Lấy access token từ phản hồi
          const userData = JSON.stringify(res?.data.data); // Chuyển thông tin người dùng thành chuỗi JSON
  
          // Hiển thị Toast thông báo thành công
          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: 'Đăng nhập thành công!',
            text2: 'Bạn đã hoàn thành thao tác.',
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 50,
            bottomOffset: 40,
          });
  
          // Lưu access token và dữ liệu người dùng vào AsyncStorage
          // console.log(accessToken,userData)
          await AsyncStorage.setItem('auth', userData);
          await AsyncStorage.setItem('accessToken', accessToken);
          if(res?.data?.data.new){
            setTimeout(() => {
              // navigation.navigate('Main');
              navigation.navigate('HealthFormScreen');
            }, 1000);
          }
          else{
            setTimeout(() => {
              navigation.navigate('Main');
              // navigation.navigate('HealthFormScreen');
            }, 1000);
          }
         
        } else {
          // Thông báo lỗi nếu đăng nhập thất bại
          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Đăng nhập thất bại!',
            text2: res?.data?.message || 'Có lỗi xảy ra.',
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 50,
            bottomOffset: 40,
          });
        }
      } catch (error) {
        console.error(error);
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Lỗi hệ thống',
          text2: 'Vui lòng thử lại sau.',
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 50,
          bottomOffset: 40,
        });
      }
    } else {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Lỗi hệ thống',
        text2: 'Vui lòng thử lại sau.',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 50,
        bottomOffset: 40,
      });
    }
  };
  
  return (
    <ContainerComponent isImageBackground isScroll>
      <SectionComponent
        styles={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 75,
        }}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={{
            width: 230,
            height: 150,
            marginBottom: 20,
          }}
        />
      </SectionComponent>
      <SectionComponent>
     
        <TextComponent size={24} title text="Đăng nhập" />
        <SpaceComponent height={21} />
        <InputComponent
          value={email}
          placeholder="Email"
          onChange={val => setEmail(val)}
          allowClear
          affix={<Sms size={22} color={appColors.gray} />}
        />
        <InputComponent
          value={password}
          placeholder="Mật khẩu"
          onChange={val => setPassword(val)}
          isPassword
          allowClear
          affix={<Lock size={22} color={appColors.gray} />}
        />
        <RowComponent justify="space-between">
          <RowComponent onPress={() => setIsRemember(!isRemember)}>
            <Switch
              trackColor={{false: appColors.gray, true: appColors.primary}}
              thumbColor={appColors.white2}
              value={isRemember}
              onChange={() => setIsRemember(!isRemember)}
            />
            <SpaceComponent width={4} />
            <TextComponent text="Ghi nhớ tôi" />
          </RowComponent>
          <ButtonComponent
            text="Quên mật khẩu?"
            onPress={() => navigation.navigate('ForgotPassword')}
            type="text"
          />
        </RowComponent>
      </SectionComponent>
      <SpaceComponent height={16} />
      <SectionComponent>
      <ButtonComponent text="Đăng nhập" type="primary" onPress={()=>handleLogin()}/>
      </SectionComponent>
      <SectionComponent>
        <RowComponent justify="center">
          <TextComponent text="Bạn chưa có tài khoản? " />
          <ButtonComponent
            type="link"
            text="Đăng ký"
            onPress={() => navigation.navigate('Signup')}
          />
        </RowComponent>
      </SectionComponent>
      <Toast />
    </ContainerComponent>
    
  );
};

export default LoginScreen;
