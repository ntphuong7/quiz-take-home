import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../hooks';

const Brand = () => {
  const { Fonts, Layout } = useTheme();

  return (
    <View testID={'brand-wrapper'} style={Layout.justifyContentCenter}>
      <Text style={[Fonts.textLarge, Fonts.textBold, Fonts.textPrimary]}>
        LOGO
      </Text>
    </View>
  );
};

export default Brand;
