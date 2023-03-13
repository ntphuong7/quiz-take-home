import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { useTheme } from '../../hooks';
import { TextInput } from '../../components/TextInput/TextInput';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './validation';
import { User } from '../../store/user';

interface RegisterFormProps {
  onSubmitAction: (data: User) => void;
  userInfo?: User;
  isUpdate?: Boolean;
}
export const RegisterForm = ({
  onSubmitAction,
  isUpdate = false,
  userInfo,
}: RegisterFormProps) => {
  const { Common, Fonts, Gutters, Layout, Colors } = useTheme();
  const { ...methods } = useForm({
    mode: 'onChange',
    defaultValues: userInfo || {},
    resolver: yupResolver(schema),
  });
  const [formError, setError] = useState<Boolean>(false);

  const onSubmit: SubmitHandler<User> = data => {
    onSubmitAction(data);
  };

  return (
    <>
      <View style={[Layout.fullWidth, Gutters.smallVMargin]}>
        <FormProvider {...methods}>
          <View>
            <TextInput
              name="email"
              label="Email"
              keyboardType="email-address"
              setFormError={setError}
            />
            {!isUpdate && (
              <>
                <TextInput
                  name="password"
                  label="Password"
                  secureTextEntry
                  setFormError={setError}
                />
                <TextInput
                  name="confirmPassword"
                  label="Confirm Password"
                  secureTextEntry
                  setFormError={setError}
                />
              </>
            )}

            <TextInput name="name" label="Full Name " setFormError={setError} />
            <TextInput
              name="username"
              label="Username "
              setFormError={setError}
            />
            <TextInput
              name="address"
              label="Address "
              setFormError={setError}
            />
            <TextInput
              name="postcode"
              keyboardType="number-pad"
              label="Postcode"
              setFormError={setError}
            />
            <TextInput name="city" label="City " setFormError={setError} />
            <TextInput
              name="country"
              label="Country "
              setFormError={setError}
            />
          </View>
        </FormProvider>
      </View>

      <TouchableOpacity
        style={[
          Common.button.rounded,
          Gutters.regularBMargin,
          Layout.fullWidth,
        ]}
        onPress={methods.handleSubmit(onSubmit)}
      >
        <Text style={[Fonts.textRegular, { color: Colors.white }]}>
          {isUpdate ? 'Update' : 'Next'}
        </Text>
      </TouchableOpacity>
    </>
  );
};
