import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

export type MainParamsList = {
  Home: undefined;
  Profile: undefined;
};

export type ApplicationStackParamList = {
  Startup: undefined;
  Register: undefined;
  Login: undefined;
  Camera: undefined;
  PreviewInfo: undefined;
  ActiveAccount: undefined;
  Main: NavigatorScreenParams<MainParamsList>;
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;
