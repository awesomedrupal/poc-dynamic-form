import React, {useState} from 'react';
import { DynamicFormRender } from './components/DynamicFormRender';
import { useFormData } from './context/FormDataContext';
import { journeyData, formConfigs } from './loadMarketConfigs';



const App = () => {
  const { formData, updateFormData } = useFormData();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Assume market is chosen here (can be from URL later)
  const market = 'en-IN'; // or 'en-US'

  const currentStep = journeyData[market].steps[currentStepIndex];
  const formConfig = formConfigs[market][currentStep.id];

  const journey = journeyData[market];

  const handleNext = (values) => {
    updateFormData(currentStep.id, values); // Save form values
    setCurrentStepIndex((prev) => {
      if (prev < journey.steps.length - 1) {
        return prev + 1;
      }
      return prev; // Don't go beyond last step
    });
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleSubmitAll = (values) => {
    updateFormData(currentStep.id, values);
    console.log('Submitting Full Form Data:', formData);
    alert(JSON.stringify(formData, null, 2));
  };

  const isLastStep = currentStepIndex === journey.steps.length - 1;

  const initialValuesForCurrentStep = formData[currentStep.id] || {};

  console.log('Current Form Data:', formData);

  return (
    <div style={{ padding: '2rem' }}>
      {currentStepIndex < journey.steps.length ? (
        <DynamicFormRender
          config={formConfig}
          market={market}
          onNext={handleNext}
          initialValues={initialValuesForCurrentStep}
          isReviewPage={isLastStep}
          onFinalSubmit={handleSubmitAll}
        />
      ) : (
        <div>Thank you for submitting your application!</div> // or whatever you want
      )}
      <div style={{ marginTop: '1rem' }}>
        {currentStepIndex > 0 && currentStepIndex < journey.steps.length && (
          <button onClick={handleBack} style={{ marginRight: '1rem' }}>
            Back
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
