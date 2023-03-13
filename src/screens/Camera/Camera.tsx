import React, { useState } from 'react';
import {
  View,
  Text,
  // TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {
  launchImageLibrary,
  ImageLibraryOptions,
  Asset,
} from 'react-native-image-picker';
import { useTheme } from '../../hooks';

import { useNavigation } from '@react-navigation/native';

const PreviewInfo = () => {
  const navigation = useNavigation();
  const [pickedImage, setPickedImage] = useState<Asset[]>([]);
  const { Common, Fonts, Gutters, Layout, Colors } = useTheme();
  const takePhoto = async () => {
    let options: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: 0,
    };
    const result = await launchImageLibrary(options);
    if (result.assets) {
      setPickedImage(result.assets);
      return;
    }
    if (result.didCancel) {
      console.log('User cancelled image picker');
      return;
    }
    if (result.errorCode) {
      console.log('ImagePicker Error: ', result.errorMessage);
    }
  };
  const onPreview = () => {
    navigation.navigate('PreviewInfo');
  };
  return (
    <View style={[Layout.fill, Gutters.smallMargin]}>
      <Text style={[Fonts.textSmall, Fonts.textBold, Gutters.smallVMargin]}>
        Upload your international passport or identity card
      </Text>

      <TouchableOpacity
        style={[Common.button.rounded, Gutters.regularBMargin]}
        onPress={takePhoto}
      >
        <Text style={[Fonts.textRegular, { color: Colors.white }]}>
          Upload Photos
        </Text>
      </TouchableOpacity>
      {pickedImage.length > 0 && (
        <>
          <View style={styles.ImageSections}>
            {pickedImage.map(image => (
              <Image
                key={image.fileName}
                source={{ uri: image.uri }}
                style={styles.images}
              />
            ))}
          </View>
          <TouchableOpacity
            style={[
              Common.button.rounded,
              Gutters.regularVMargin,
              Layout.fullWidth,
            ]}
            onPress={onPreview}
          >
            <Text style={[Fonts.textRegular, { color: Colors.white }]}>
              Preview
            </Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity
        style={[Common.button.outlineRounded, Gutters.regularBMargin]}
        onPress={navigation.goBack}
      >
        <Text style={[Fonts.textRegular]}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PreviewInfo;
const styles = StyleSheet.create({
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  images: {
    width: 150,
    height: 150,
    margin: 3,
  },
});
