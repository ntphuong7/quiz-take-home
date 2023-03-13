import React from 'react';
import {
  View,
  Text,
  // TextInput,
  TouchableOpacity,
} from 'react-native';

import { useTheme } from '../../hooks';

import { useNavigation } from '@react-navigation/native';
import { storage } from '../../store';
import { USER_KEY } from '../../const';
import { DetailItem } from '../Profile/DetailItem';
import { useSelector } from 'react-redux';
import { UserState } from '../../store/user';

const PreviewInfo = () => {
  const navigation = useNavigation();
  const { Common, Fonts, Gutters, Layout, Colors } = useTheme();
  const dataUser = useSelector(
    (state: { user: UserState }) => state.user.userInfo,
  );
  console.log('dataUser', dataUser);
  const onSubmit = () => {
    storage.set(USER_KEY, JSON.stringify(dataUser));
    navigation.navigate('ActiveAccount');
  };
  //
  return (
    <View style={[Layout.fill, Gutters.smallMargin]}>
      <Text style={[Fonts.textSmall, Fonts.textBold, Gutters.smallVMargin]}>
        Please check your information below!
      </Text>
      <DetailItem title="Full name" content={dataUser.name} />
      <DetailItem title="Username" content={dataUser.username} />
      <DetailItem title="Email" content={dataUser.email} />
      <DetailItem title="Address" content={dataUser.address} />
      <DetailItem title="Postcode" content={'' + dataUser.postcode} />
      <DetailItem title="City" content={dataUser.city} />
      <DetailItem title="Country" content={dataUser.country} />
      <View style={[Layout.fill, Layout.row, Layout.justifyContentBetween]}>
        <TouchableOpacity
          style={[
            Common.button.outlineRounded,
            Gutters.regularBMargin,
            Gutters.smallRMargin,
            Layout.fill,
          ]}
          onPress={navigation.goBack}
        >
          <Text style={[Fonts.textRegular]}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[Common.button.rounded, Gutters.regularBMargin, Layout.fill]}
          onPress={onSubmit}
        >
          <Text style={[Fonts.textRegular, { color: Colors.white }]}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PreviewInfo;
