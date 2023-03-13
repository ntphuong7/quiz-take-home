import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks';
import { Brand } from '../../components';
import { ApplicationScreenProps } from '../../../@types/navigation';
import { setUser, UserState } from '../../store/user';
import { useDispatch, useSelector } from 'react-redux';

const ActiveAccount = ({ navigation }: ApplicationScreenProps) => {
  const { Layout, Gutters, Common, Fonts, Colors } = useTheme();
  const [loading, setLoading] = useState<Boolean>(false);
  const isActive = useSelector(
    (state: { user: UserState }) => state.user.isActive,
  );

  const dispatch = useDispatch();
  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        setLoading(true);
        resolve(true);
      }, 2000),
    );

    await new Promise(resolve =>
      setTimeout(() => {
        setLoading(false);
        dispatch(setUser({ isActive: true }));

        resolve(true);
      }, 2000),
    );
    await new Promise(resolve =>
      setTimeout(() => {
        // navigation.navigate('Main');
        resolve(true);
      }, 2000),
    );
  };

  useEffect(() => {
    init();
  }, []);
  if (loading) {
    return <ActivityIndicator size={'large'} style={[Gutters.largeVMargin]} />;
  }
  if (isActive) {
    return (
      <View style={[Layout.fill, Layout.colCenter, Gutters.smallMargin]}>
        <Text>
          Your account has been activated successfully.Please proceed by logging
          in to your account
        </Text>
        <TouchableOpacity
          style={[
            Common.button.rounded,
            Gutters.regularVMargin,
            Layout.fullWidth,
          ]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={[Fonts.textRegular, { color: Colors.white }]}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={[Layout.fill, Layout.colCenter, Gutters.smallMargin]}>
      <Brand />
      <Text>
        An email has been sent to your email address containing an activation
        link. Please click on the link to activate your account. If you do not
        receive the email within a few minutes, please check your spam folder.
      </Text>
    </View>
  );
};

export default ActiveAccount;
