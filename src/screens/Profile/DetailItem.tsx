import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks';

interface DetailItemProps {
  title: string;
  content: string;
}

export const DetailItem = ({ title, content }: DetailItemProps) => {
  const { Gutters, Fonts } = useTheme();

  return (
    <View style={[Gutters.tinyVPadding, styles.detailItem]}>
      <Text style={[Fonts.textPrimary, Fonts.textBold, Fonts.textUppercase]}>
        {title} :
      </Text>
      <Text style={[Fonts.textSmall]}>{content || 'Example'} </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  detailItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
