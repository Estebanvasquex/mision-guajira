export interface OrderFormData {
  name: string;
  phone: string;
  deliveryMethod: 'pickup' | 'delivery';
  address?: string;
  frameStyle: number;
  color1: string;
  color2: string;
  color3?: string;
  verse?: string;
  customMessage?: string;
  paymentProof?: string;
}

export interface FormStep {
  id: number;
  title: string;
  isValid: boolean;
}
