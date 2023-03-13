import * as yup from 'yup';

export const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref('password')], 'Your passwords do not match.'),
    name: yup.string().required(),
    username: yup.string().required(),
    address: yup.string().required(),
    city: yup.string().required(),
    country: yup.string().required(),
    postcode: yup.number().positive().integer().required(),
  })
  .required();
