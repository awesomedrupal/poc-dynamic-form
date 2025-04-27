import React, {useState} from 'react';
import { DynamicFormRender } from './components/DynamicFormRender';
import formConfig from './config/formConfig.json';
import journey from './config/journey.json';
import companyInformationForm from './config/companyInformationForm.json';
import applicantInformationForm from './config/applicantInformationForm.json';
import reviewForm from './config/reviewForm.json';
import { useFormData } from './context/FormDataContext';

const formConfigs = {
  companyInformationForm,
  applicantInformationForm,
  reviewForm
};

const App = () => {
  const { formData, updateFormData } = useFormData();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const currentStep = journey.steps[currentStepIndex];
  const formConfig = formConfigs[currentStep.id];

  const handleNext = (values) => {
    updateFormData(currentStep.id, values);
    if (currentStepIndex < journey.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleSubmitAll = () => {
    console.log('Submitting Full Form Data:', formData);
    alert(JSON.stringify(formData, null, 2));
  };


  // Change market here to 'en-IN' or 'en-US' (POC Purpose hardcoded)
  const market = 'en-IN';  // test by changing this
  const isLastStep = currentStepIndex === journey.steps.length - 1;

  const initialValuesForCurrentStep = formData[currentStep.id] || {};

  console.log('Current Form Data:', formData);

  return (
    <div style={{ padding: '2rem' }}>
      <DynamicFormRender
        config={formConfig}
        market={market}
        onNext={handleNext}
        initialValues={initialValuesForCurrentStep}
        isReviewPage={isLastStep}
        onFinalSubmit={handleSubmitAll}
      />
      <div style={{ marginTop: '1rem' }}>
        {currentStepIndex > 0 && (
          <button onClick={handleBack} style={{ marginRight: '1rem' }}>
            Back
          </button>
        )}
        {currentStepIndex < journey.steps.length - 1 && (
          <button onClick={handleNext}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
