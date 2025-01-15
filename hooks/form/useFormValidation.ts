import { useState } from 'react';

const useFormValidation = () => {
  const [errors, setErrors] = useState<string[]>([]);

  const validateStep1 = (
    clientId: string,
    campaignId: string,
    managementId: string,
    detailManagementId: string,
    title: string,
  ): boolean => {
    const errorMessages: string[] = [];
    if (!clientId) errorMessages.push('El cliente es obligatorio.');
    if (!campaignId) errorMessages.push('La campaña es obligatoria.');
    if (!managementId) errorMessages.push('El tipo de gestión es obligatorio.');
    if (!detailManagementId) errorMessages.push('El detalle de gestión es obligatorio.');
    if (!title) errorMessages.push('El titulo es obligatorio.');
    
    setErrors(errorMessages);
    return errorMessages.length === 0;
  };

  const validateStep2 = (requestDetails: string, attachedDocuments: File[]): boolean => {
    const errorMessages: string[] = [];
    if (!requestDetails) errorMessages.push('Los detalles de la solicitud son obligatorios.');
    if (attachedDocuments.length === 0) errorMessages.push('Debes adjuntar al menos un documento.');
    setErrors(errorMessages);
    return errorMessages.length === 0;
  };

  return { errors, validateStep1, validateStep2 };
};

export default useFormValidation;
