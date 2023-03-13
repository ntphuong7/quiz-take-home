import { useNavigation } from '@react-navigation/native';
import { USER_KEY } from '../../const';
import { storage } from '../../store';
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks';
import { DetailItem } from './DetailItem';
import { setUser, User, UserState } from '../../store/user';
import { useDispatch, useSelector } from 'react-redux';

const Profile = () => {
  const { Layout, Gutters, Fonts, Common, Colors } = useTheme();
  const navigation = useNavigation();
  const dataUser = useSelector(
    (state: { user: UserState }) => state.user.userInfo,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const userInfo = JSON.parse(storage.getString(USER_KEY) || '{}');
    dispatch(
      setUser({
        userInfo: { ...userInfo, postcode: Number(userInfo.postcode) } as User,
      }),
    );
  }, []);
  return (
    <View style={[Layout.fill, Gutters.tinyPadding, Common.backgroundReset]}>
      <DetailItem title="Full name" content={dataUser.name} />
      <DetailItem title="Username" content={dataUser.username} />
      <DetailItem title="Email" content={dataUser.email} />
      <DetailItem title="Address" content={dataUser.address} />
      <DetailItem title="Postcode" content={'' + dataUser.postcode} />
      <DetailItem title="City" content={dataUser.city} />
      <DetailItem title="Country" content={dataUser.country} />
      <View style={{ justifyContent: 'flex-end', flex: 1 }}>
        <TouchableOpacity
          style={[Gutters.smallBMargin, Common.button.base]}
          onPress={() => navigation.navigate('UpdateProfile')}
        >
          <Text style={[Fonts.textSmall, { color: Colors.white }]}>
            Update profile
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[Common.button.outline]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={[Fonts.textSmall]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
