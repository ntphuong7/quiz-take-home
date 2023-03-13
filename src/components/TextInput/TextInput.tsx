import React from 'react';

import {
  View,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  Text,
  StyleSheet,
} from 'react-native';

import {
  useController,
  useFormContext,
  UseControllerProps,
} from 'react-hook-form';
import { useTheme } from '../../hooks';

interface TextInputProps extends RNTextInputProps, UseControllerProps {
  label: string;
  name: string;
  // eslint-disable-next-line react/require-default-props
  defaultValue?: string;
  setFormError: Function;
}

const ControlledInput = (props: TextInputProps) => {
  const { Common } = useTheme();

  const formContext = useFormContext();
  const { formState } = formContext;

  const { name, label, rules, defaultValue, ...inputProps } = props;

  const { field } = useController({ name, rules, defaultValue });

  const hasError = Boolean(formState?.errors[name]);

  return (
    <View style={styles.container}>
      <RNTextInput
        autoCapitalize="none"
        textAlign="left"
        // style={styles.input}
        style={[Common.textInput]}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        placeholder={label}
        {...inputProps}
      />

      {hasError && (
        <View style={styles.errorContainer}>
          <Text style={styles.error}>{formState.errors[name].message}</Text>
        </View>
      )}
    </View>
  );
};

export const TextInput = (props: TextInputProps) => {
  const { name, setFormError } = props;

  const formContext = useFormContext();

  // Placeholder until input name is initialized
  if (!formContext || !name) {
    const msg = !formContext
      ? 'TextInput must be wrapped by the FormProvider'
      : 'Name must be defined';
    setFormError(true);
    return null;
  }

  return <ControlledInput {...props} />;
};

const styles = StyleSheet.create({
  container: {
    flex: -1,
    justifyContent: 'center',
    paddingVertical: 8,
    // backgroundColor: '#0e101c',
    // borderColor: 'white',
    // borderWidth: 1,
  },
  errorContainer: {
    flex: -1,
    height: 20,
    paddingTop: 3,
  },
  error: {
    color: 'red',
  },
});
