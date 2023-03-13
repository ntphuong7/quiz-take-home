import { useNavigation } from '@react-navigation/native';
import { USER_KEY } from '../../const';
import { storage } from '../../store';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks';
import { DetailItem } from './DetailItem';

const Profile = () => {
  const { Layout, Gutters, Fonts, Common, Colors } = useTheme();
  const navigation = useNavigation();
  const dataUser = JSON.parse(storage.getString(USER_KEY) || '{}');

  // name, address, postcode, city, country, email, username
  return (
    <View style={[Layout.fill, Gutters.tinyPadding, Common.backgroundReset]}>
      <DetailItem title="Full name" content={dataUser.name} />
      <DetailItem title="Username" content={dataUser.username} />
      <DetailItem title="Email" content={dataUser.email} />
      <DetailItem title="Address" content={dataUser.address} />
      <DetailItem title="postcode" content={dataUser.postcode} />
      <DetailItem title="city" content={dataUser.city} />
      <DetailItem title="country" content={dataUser.country} />
      <View style={{ justifyContent: 'flex-end', flex: 1 }}>
        {/* <TouchableOpacity
          style={[Gutters.smallBMargin, Common.button.base]}
          // onPress={() => onChangeTheme({ darkMode: true })}
        >
          <Text style={[Fonts.textSmall, { color: Colors.white }]}>
            Update profile
          </Text>
        </TouchableOpacity> */}

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
