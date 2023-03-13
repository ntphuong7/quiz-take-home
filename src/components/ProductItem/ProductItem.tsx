import React from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../../hooks';

const { width } = Dimensions.get('window');

export const ProductItem = ({ item }: any) => {
  const { Fonts } = useTheme();
  return (
    <Pressable
      style={styles.container}
      // onPress={() => navigation.navigate('Details')}
    >
      {/* Image */}
      <Image
        source={{
          uri: item.image,
        }}
        style={styles.image}
      />
      <View style={styles.titleContainer}>
        {/* Title */}
        <Text style={Fonts.textBold} numberOfLines={1}>
          {item.title}
        </Text>
        {/* Description */}
        <Text style={Fonts.subTitle} numberOfLines={2}>
          {item.description}
        </Text>
        {/* Price */}
        <Text style={[Fonts.textBold, Fonts.textPrimary]}>{item.price}</Text>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    width: width / 2.2,
    backgroundColor: 'white',
    marginVertical: 4,
    marginRight: 4,
    borderRadius: 20,
    margin: 10,
  },

  image: {
    width: '100%',
    height: 180,
    alignSelf: 'center',
    borderRadius: 20,
    resizeMode: 'cover',
  },
  titleContainer: {
    padding: 8,
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
  },
});
