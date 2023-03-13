import React from 'react';
import { Text, ScrollView } from 'react-native';

import { useTheme } from '../../hooks';

import { useNavigation } from '@react-navigation/native';
import { RegisterForm } from '../../components';
import { setUser, User } from '../../store/user';
import { useDispatch } from 'react-redux';
import { USER_KEY } from '../../const';
import { storage } from '../../store';

const UpdateProfile = () => {
  const navigation = useNavigation();
  const { Fonts, Gutters, Layout } = useTheme();

  const userInfo = JSON.parse(storage.getString(USER_KEY) || '{}') as User;

  const dispatch = useDispatch();
  const onSubmitForm = (data: User) => {
    storage.set(USER_KEY, JSON.stringify(data));
    dispatch(setUser({ userInfo: data }));
    navigation.goBack();
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
      <Text style={[Fonts.titleSmall, Gutters.smallTMargin]}>
        Update Profile
      </Text>
      <RegisterForm
        userInfo={userInfo}
        onSubmitAction={onSubmitForm}
        isUpdate={true}
      />
    </ScrollView>
  );
};

export default UpdateProfile;
