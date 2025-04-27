import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { FormFieldMapper } from './FormFieldMapper';
import { buildYupSchema } from '../utils/buildYupSchema';

export const DynamicFormRender = ({
  config,
  market = 'en-US',
  onNext,
  initialValues = {},
  isReviewPage = false,
  onFinalSubmit
}) => {
  const defaultInitialValues = config.fields.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {});

  const combinedInitialValues = { ...defaultInitialValues, ...initialValues };
  const validationSchema = buildYupSchema(config.fields, market);

  // Group fields by rows
  const groupedByRow = {};
  config.fields.forEach((field) => {
    const rowKey = field.position?.split('Column')[0];
    if (!groupedByRow[rowKey]) {
      groupedByRow[rowKey] = [];
    }
    groupedByRow[rowKey].push(field);
  });

  return (
    <Formik
      initialValues={combinedInitialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={(values) => {
        if (isReviewPage && onFinalSubmit) {
          onFinalSubmit(values);  // Final Submit -> All Form Data
        } else {
          onNext(values);          // Save current page values
        }
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <h2>{config.title}</h2>

          {Object.entries(groupedByRow).map(([row, fields]) => (
            <div key={row} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              {fields.map((field) => (
                <div key={field.name} style={{ flex: 1 }}>
                  <FormFieldMapper fieldConfig={field} />
                  <ErrorMessage name={field.name} component="div" style={{ color: 'red', fontSize: '0.8rem' }} />
                </div>
              ))}
            </div>
          ))}

          <button type="submit" style={{ marginTop: '1rem' }}>
            {isReviewPage ? 'Submit Application' : 'Next'}
          </button>
        </Form>
      )}
    </Formik>
  );
};
