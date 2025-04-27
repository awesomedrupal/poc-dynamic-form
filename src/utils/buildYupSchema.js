import * as Yup from 'yup';

// Get validation details based on market
const getFieldValidation = (field, market) => {
  const override = field.marketOverrides?.[market];

  return {
    regex: override?.regex || field.validation?.regex,
    validationMessage: override?.errorMessage || field.validation?.errorMessage,
    minLength: field.validation?.minLength,
    maxLength: field.validation?.maxLength
  };
};

export const buildYupSchema = (fields, market) => {
  const shape = {};

  fields.forEach((field) => {
    let validator = Yup.string();

    if (field.required) {
      validator = validator.required('Required');
    }

    const { regex, validationMessage, minLength, maxLength } = getFieldValidation(field, market);

    if (regex) {
      validator = validator.matches(new RegExp(regex), validationMessage || 'Invalid format');
    }
    if (minLength) {
      validator = validator.min(minLength);
    }
    if (maxLength) {
      validator = validator.max(maxLength);
    }

    shape[field.name] = validator;
  });

  return Yup.object().shape(shape);
};
