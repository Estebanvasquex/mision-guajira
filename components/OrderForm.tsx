'use client';

import { useState } from 'react';
import { OrderFormData } from '@/lib/types';
import { FRAME_STYLES } from '@/lib/constants';
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

  // Verificar si el estilo seleccionado permite colores
  const selectedFrame = FRAME_STYLES.find(f => f.id === formData.frameStyle);
  const shouldShowColorStep = selectedFrame?.allowColors ?? false;

  // Función para avanzar desde el paso 2 (selección de cuadro)
  const nextFromFrameStep = () => {
    if (shouldShowColorStep) {
      setCurrentStep(3); // Ir a selección de colores
    } else {
      // Limpiar colores si no se permiten
      setFormData(prev => ({ ...prev, color1: undefined, color2: undefined, color3: undefined }));
      setCurrentStep(4); // Saltar a mensaje
    }
  };

  // Función para retroceder desde el paso 4 (mensaje)
  const backFromMessageStep = () => {
    if (shouldShowColorStep) {
      setCurrentStep(3); // Volver a colores
    } else {
      setCurrentStep(2); // Volver a selección de cuadro
    }
  };

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
          onNext={nextFromFrameStep}
          onBack={prevStep}
        />
      )}
      {currentStep === 3 && shouldShowColorStep && (
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
          onBack={backFromMessageStep}
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
