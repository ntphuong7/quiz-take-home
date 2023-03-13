import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  // TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { useTheme } from '../../hooks';
import { TextInput } from '../../components/TextInput/TextInput';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { storage } from '../../store';
import { USER_KEY } from '../../const';

type FormValues = {
  email: string;
  password: string;
};
export const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

const Login = () => {
  const navigation = useNavigation();
  const { Common, Fonts, Gutters, Layout, Colors } = useTheme();
  const { ...methods } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const [formError, setError] = useState<Boolean>(false);
  const [errorMessage, setErrorMessage] = useState<String>('');
  const onSubmit: SubmitHandler<FormValues> = data => {
    const dataUser = JSON.parse(storage.getString(USER_KEY) || '{}');
    if (dataUser.email === data.email && dataUser.password === data.password) {
      navigation.navigate('Main');
    } else {
      setErrorMessage('Wrong email or password!');
    }
  };

  return (
    <ScrollView
      style={Layout.fill}
      contentContainerStyle={[
        Layout.fullSize,
        Layout.fill,
        Layout.colCenter,
        Layout.scrollSpaceBetween,
        Gutters.smallHPadding,
      ]}
    >
      <Text style={[Fonts.titleRegular, Gutters.smallTMargin]}>Welcome</Text>
      <View style={[Layout.fullWidth, Gutters.smallVMargin]}>
        <FormProvider {...methods}>
          <View>
            <TextInput
              name="email"
              label="Email"
              keyboardType="email-address"
              setFormError={setError}
            />
            <TextInput
              name="password"
              label="Password"
              secureTextEntry
              setFormError={setError}
            />
          </View>
        </FormProvider>
      </View>
      <View style={[Gutters.regularBMargin, Layout.fullWidth]}>
        {errorMessage && (
          <Text style={[Fonts.textError, Fonts.textCenter]}>
            {errorMessage}
          </Text>
        )}
        <TouchableOpacity
          style={[Common.button.rounded, Gutters.tinyVMargin, Layout.fullWidth]}
          onPress={methods.handleSubmit(onSubmit)}
        >
          <Text style={[Fonts.textRegular, { color: Colors.white }]}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[Layout.fullWidth]}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={[Fonts.textCenter]}>Don't have account? Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Login;
