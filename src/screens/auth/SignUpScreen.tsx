import { Lock, Sms, User } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
// import {useDispatch} from 'react-redux';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import { appColors } from '../../constants/appColors';
import {authApi} from '../../apis/authenticationApi';
// import authenticationAPI from '../../apis/authApi';

import { Alert, Image, Switch, SafeAreaView, View } from 'react-native';
import { Validate } from '../../utils/validate';

// interface ErrorMessages {
//   email: string;
//   password: string;
//   confirmPassword: string;
// }

const initValue = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpScreen = ({ navigation }: any) => {
  const [values, setValues] = useState(initValue);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>();
  const [isDisable, setIsDisable] = useState(true);


  // const dispatch = useDispatch();

  useEffect(() => {
    if (
      !errorMessage ||
      (errorMessage &&
        (errorMessage.email ||
          errorMessage.password ||
          errorMessage.confirmPassword)) ||
      !values.email ||
      !values.password ||
      !values.confirmPassword
    ) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [errorMessage, values]);

  const handleChangeValue = (key: string, value: string) => {
    const data: any = { ...values };

    data[`${key}`] = value;

    setValues(data);
  };

  const formValidator = (key: string) => {
    const data = {...errorMessage};
    let message = ``;

    switch (key) {
      case 'email':
        if (!values.email) {
          message = `Email không được bỏ trống!!!`;
        } else if (!Validate.email(values.email)) {
          message = 'Email không hợp lệ!!';
        } else {
          message = '';
        }

        break;

      case 'password':
        message = !values.password ? `Mật khẩu không được bỏ trống!!!` : '';
        break;

      case 'confirmPassword':
        if (!values.confirmPassword) {
          message = `Vui lòng xác nhận mật khẩu!!`;
        } else if (values.confirmPassword !== values.password) {
          message = 'Mật khẩu không trùng khớp!!!';
        } else {
          message = '';
        }

        break;
    }

    data[`${key}`] = message;

    setErrorMessage(data);
  };

  const handleRegister = async () => {
    // const api = `/verification`;
    setIsLoading(true);
    try {
      const res = await authApi.register(
        {email: values.email,password:values.password},
      );

      setIsLoading(false);
    if (res?.data && res.status == 200) {
      Alert.alert(
        'Thành công',
        'Bạn đã đăng ký thành công!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ],
        { cancelable: false }
      );
    }
  } catch (error) {
    console.log(error);
    Alert.alert('Thất bại', 'Đăng ký không thành công. Vui lòng thử lại!');
    setIsLoading(false);
  }
};

    return (
        <ContainerComponent isImageBackground isScroll>
          <SectionComponent>
            <TextComponent size={24} title text="Đăng ký" />
            <SpaceComponent height={21} />
            <InputComponent
              value={values.username}
              placeholder="Họ tên"
              onChange={val => handleChangeValue('username', val)}
              allowClear
              affix={<User size={22} color={appColors.gray} />}
            />
            <InputComponent
              value={values.email}
              placeholder="abc@email.com"
              onChange={val => handleChangeValue('email', val)}
              allowClear
              affix={<Sms size={22} color={appColors.gray} />}
              onEnd={() => formValidator('email')}
            />
            <InputComponent
              value={values.password}
              placeholder="Mật khẩu"
              onChange={val => handleChangeValue('password', val)}
              isPassword
              allowClear
              affix={<Lock size={22} color={appColors.gray} />}
              onEnd={() => formValidator('password')}
            />
            <InputComponent
              value={values.confirmPassword}
              placeholder="Xác nhận mật khẩu"
              onChange={val => handleChangeValue('confirmPassword', val)}
              isPassword
              allowClear
              affix={<Lock size={22} color={appColors.gray} />}
              onEnd={() => formValidator('confirmPassword')}
            />
          </SectionComponent>

          {errorMessage && (
            <SectionComponent>
              {Object.keys(errorMessage).map(
                (error, index) =>
                  errorMessage[`${error}`] && (
                    <TextComponent
                      text={errorMessage[`${error}`]}
                      key={`error${index}`}
                      color={appColors.danger}
                    />
                  ),
              )}
            </SectionComponent>
          )}
          <SpaceComponent height={16} />
          <SectionComponent>
            <ButtonComponent
              onPress={handleRegister}
              text="Đăng ký"
              disable={isDisable}
              type="primary"
            />
          </SectionComponent>
          <SectionComponent>
            <RowComponent justify="center">
              <TextComponent text="Bạn đã có tài khoản? " />
              <ButtonComponent
                type="link"
                text="Đăng nhập"
                onPress={() => navigation.navigate('Login')}
              />
            </RowComponent>
          </SectionComponent>
        </ContainerComponent>

    );
  };
export default SignUpScreen;

//   return (
//     <ContainerComponent isImageBackground isScroll title="" back>
//       <SectionComponent>
//         <TextComponent size={24} title text="Sign up" />
//         <SpaceComponent height={21} />
//         <InputComponent
//           value={values.username}
//           placeholder="Full name"
//           onChange={val => handleChangeValue('username', val)}
//           allowClear
//           affix={<User size={22} color={appColors.gray} />}
//         />
//         <InputComponent
//           value={values.email}
//           placeholder="abc@email.com"
//           onChange={val => handleChangeValue('email', val)}
//           allowClear
//           affix={<Sms size={22} color={appColors.gray} />}
//           // onEnd={() => formValidator('email')}
//         />
//         <InputComponent
//           value={values.password}
//           placeholder="Password"
//           onChange={val => handleChangeValue('password', val)}
//           isPassword
//           allowClear
//           affix={<Lock size={22} color={appColors.gray} />}
//           // onEnd={() => formValidator('password')}
//         />
//         <InputComponent
//           value={values.confirmPassword}
//           placeholder="Confirm password"
//           onChange={val => handleChangeValue('confirmPassword', val)}
//           isPassword
//           allowClear
//           affix={<Lock size={22} color={appColors.gray} />}
//           // onEnd={() => formValidator('confirmPassword')}
//         />
//         <RowComponent justify="space-between">
//           {/* <RowComponent onPress={() => setIsRemember(!isRemember)}>
//             <Switch
//               trackColor={{ false: appColors.gray, true: appColors.primary }}
//               thumbColor={appColors.white2}
//               value={isRemember}
//               onChange={() => setIsRemember(!isRemember)}
//             />
//             <SpaceComponent width={4} />
//             <TextComponent text="Remember me" />
//           </RowComponent> */}
//           <ButtonComponent
//             text="Forgot Password?"
//             onPress={() => navigation.navigate('ForgotPassword')}
//             type="text"
//           />
//         </RowComponent>
//       </SectionComponent>
//       <SpaceComponent height={16} />
//       <SectionComponent>
//         <ButtonComponent text="SIGN UP" type="primary" onPress={()=>handleRegister()}/>
//       </SectionComponent>
//       {/* <SocialLogin /> */}
//       <SectionComponent>
//         <RowComponent justify="center">
//           <TextComponent text="Already have an account? " />
//           <ButtonComponent
//             type="link"
//             text="Login"
//             onPress={() => navigation.navigate('Login')}
//           />
//         </RowComponent>
//       </SectionComponent>
//     </ContainerComponent>
//   );
// };



