import React from 'react';
import { Field } from 'formik';

export const FormFieldMapper = ({ fieldConfig }) => {
  if (fieldConfig.type === 'text') {
    return (
      <div style={{ marginBottom: '1rem' }}>
        <label>{fieldConfig.label}</label>
        <Field name={fieldConfig.name} type="text" placeholder={fieldConfig.props?.placeholder || ''} />
      </div>
    );
  }

  if (fieldConfig.type === 'select') {
    return (
      <div style={{ marginBottom: '1rem' }}>
        <label>{fieldConfig.label}</label>
        <Field as="select" name={fieldConfig.name}>
          <option value="">Select</option>
          {fieldConfig.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </Field>
      </div>
    );
  }

  return null;
};
