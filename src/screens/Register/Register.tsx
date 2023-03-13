import React, { useEffect } from 'react';
import { Text, ScrollView } from 'react-native';

import { useTheme } from '../../hooks';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RegisterForm } from '../../components';
import { setUser, User, UserState } from '../../store/user';
import { useDispatch, useSelector } from 'react-redux';

const Register = () => {
  const navigation = useNavigation();
  const { Fonts, Gutters, Layout } = useTheme();
  const userInfo = useSelector(
    (state: { user: UserState }) => state.user.userInfo,
  );

  const dispatch = useDispatch();
  // useFocusEffect(
  //   React.useCallback(() => {
  //     return () => dispatch(setUser({ userInfo: {} as User }));
  //   }, []),
  // );
  const onSubmitForm = (data: User) => {
    dispatch(setUser({ userInfo: data, isActive: false }));
    navigation.navigate('Camera');
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
      <Text style={[Fonts.titleRegular, Gutters.smallTMargin]}>Sign Up</Text>
      <RegisterForm userInfo={userInfo} onSubmitAction={onSubmitForm} />
      <Text
        style={[Gutters.smallBMargin]}
        onPress={() => navigation.navigate('Login')}
      >
        Already have an account? Login
      </Text>
    </ScrollView>
  );
};

export default Register;
