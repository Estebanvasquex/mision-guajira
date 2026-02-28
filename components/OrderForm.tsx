'use client';

import { useState } from 'react';
import { OrderFormData } from '@/lib/types';
import PersonalInfoStep from './steps/PersonalInfoStep';
import FrameSelectionStep from './steps/FrameSelectionStep';
import ColorSelectionStep from './steps/ColorSelectionStep';
import MessageStep from './steps/MessageStep';
import PaymentStep from './steps/PaymentStep';

export default function OrderForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<OrderFormData>>({
    deliveryMethod: 'pickup',
  });

  const updateFormData = (data: Partial<OrderFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="card">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2 gap-1">
          {[1, 2, 3, 4, 5].map(step => (
            <div
              key={step}
              className={`w-full h-3 rounded-full transition-all ${
                step <= currentStep 
                  ? 'bg-gradient-to-r from-wayuu-orange to-wayuu-red shadow-sm' 
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-wayuu-brown font-medium text-center mt-3">
          Paso {currentStep} de 5
        </p>
      </div>

      {/* Steps */}
      {currentStep === 1 && (
        <PersonalInfoStep
          data={formData}
          onUpdate={updateFormData}
          onNext={nextStep}
        />
      )}
      {currentStep === 2 && (
        <FrameSelectionStep
          data={formData}
          onUpdate={updateFormData}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
      {currentStep === 3 && (
        <ColorSelectionStep
          data={formData}
          onUpdate={updateFormData}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
      {currentStep === 4 && (
        <MessageStep
          data={formData}
          onUpdate={updateFormData}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
      {currentStep === 5 && (
        <PaymentStep
          data={formData}
          onUpdate={updateFormData}
          onBack={prevStep}
        />
      )}
    </div>
  );
}
