import {Lock, Sms} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {Alert, Image, Switch} from 'react-native';
// import authenticationAPI from '../../apis/authApi';
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

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(true);
  const [isDisable, setIsDisable] = useState(true);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const emailValidation = Validate.email(email);

  //   if (!email || !password || !emailValidation) {
  //     setIsDisable(true);
  //   } else {
  //     setIsDisable(false);
  //   }
  // }, [email, password]);

  // const handleLogin = async () => {
  //   const emailValidation = Validate.email(email);
  //   if (emailValidation) {
  //     try {
  //       const res = await authenticationAPI.HandleAuthentication(
  //         '/login',
  //         {email, password},
  //         'post',
  //       );

  //       dispatch(addAuth(res.data));

  //       await AsyncStorage.setItem(
  //         'auth',
  //         isRemember ? JSON.stringify(res.data) : email,
  //       );
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else {
  //     Alert.alert('Email is not correct!!!!');
  //   }
  // };

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
        <TextComponent size={24} title text="Sign in" />
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
          placeholder="Password"
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
            <TextComponent text="Remember me" />
          </RowComponent>
          <ButtonComponent
            text="Forgot Password?"
            onPress={() => navigation.navigate('ForgotPassword')}
            type="text"
          />
        </RowComponent>
      </SectionComponent>
      <SpaceComponent height={16} />
      <SectionComponent>
      <ButtonComponent text="SIGN IN" type="primary"/>
      </SectionComponent>
      <SocialLogin/>
      <SectionComponent>
        <RowComponent justify="center">
          <TextComponent text="Don’t have an account? " />
          <ButtonComponent
            type="link"
            text="Sign up"
            onPress={() => navigation.navigate('SignUpScreen')}
          />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default LoginScreen;
// import {View, Text, Button} from  'react-native';
// // import React from "react";
// import React, {useState} from 'react';
// import { ButtonComponent } from '../../components';
// import InputComponent from '../../components/InputComponent';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { globalStyles } from '../../styles/globalStyles';
// import {Lock, Sms} from 'iconsax-react-native';
// import { appColors } from '../../constants/appColors';
// const LoginScreen = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   return (
//     <View
//       style={[
//         globalStyles.container,
//         {alignItems: 'center', justifyContent: 'center', padding: 20},
//       ]}>
//         <InputComponent
//         value = {email}
//         placeholder="Email"
//         onChange={val => setEmail(val)}
//         //isPassword
//         allowClear
//         affix={<Sms size={22} color={appColors.gray}/>}
//         />
//         <InputComponent
//         value = {password}
//         placeholder="Password"
//         onChange={val => setPassword(val)}
//         isPassword
//         allowClear
//         affix={<Lock size={22} color={appColors.gray}/>}
//         />
//     </View>
//   )
// };

// export default LoginScreen;