import React, { useState } from 'react';
import { useTypeClients } from '../../../hooks/client/useTypeClient';
import { useCampaings } from '../../../hooks/client/campaigns';
import { useDetailManagement } from '../../../hooks/management/useDetailManagement';
import { useTypeManagement } from '../../../hooks/management/useTypeManagement';
import Navbar from '../../../components/solicitante/Navbar';
import DrawerSolicitante from '../../../components/solicitante/DrawerSolicitante';
import Alert from '../../../components/solicitante/Form/Alert';
import FileInput from '../../../components/solicitante/Form/FileInput';
import useFormValidation from '../../../hooks/form/useFormValidation';
import { submitSolicitud } from '../../../services/ticket/submitTicket';
import './../../../app/globals.css';
import { useAuth } from '../../../context/AuthContext';
export default function Solicitud() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [selectedManagementId, setSelectedManagementId] = useState<number | null>(null);
  const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(null);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado de cargando
  const { typeClients, loading, error } = useTypeClients();
  const { typeManagement } = useTypeManagement();
  const { campaigns } = useCampaings(selectedClientId as number);
  const { detailManagement } = useDetailManagement(selectedManagementId as number);
  const { user, token } = useAuth();
  const userInfor = user as { id: number };
  const [numberTicket, setNumberTicket] = useState<string | null>(null); // Guarda el número del ticket generado
 const [formData, setFormData] = useState({
    clientId: '',
    campaignId: '',
    managementId: '',
    title: '',
    detailManagementId: '',
    requestDetails: '',
    attachedDocuments: [] as File[],
    user_id: userInfor.id
  });

  const { errors, validateStep1, validateStep2 } = useFormValidation();

  const handleClientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const clientId = parseInt(event.target.value, 10);
    setSelectedClientId(clientId);
    setFormData((prevData) => ({ ...prevData, clientId: event.target.value }));
  };

  const handleManagementChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const managementId = parseInt(event.target.value, 10);
    setSelectedManagementId(managementId);
    setFormData((prevData) => ({ ...prevData, managementId: event.target.value }));
  };

  const handleCampaignChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const campaignId = parseInt(event.target.value, 10);
    setSelectedCampaignId(campaignId);
    setFormData((prevData) => ({ ...prevData, campaignId: event.target.value }));
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({ ...prevData, title: event.target.value }));
  };

  const handleDetailManagementChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const detailManagementId = parseInt(event.target.value, 10);
    setFormData((prevData) => ({ ...prevData, detailManagementId: event.target.value }));
  };

  const handleRequestDetailsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prevData) => ({ ...prevData, requestDetails: event.target.value }));
  };

  const handleFileChange = (files: File[]) => {
    setFormData((prevData) => ({
      ...prevData,
      attachedDocuments: files,
    }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!userInfor?.id) {
    alert('User ID is missing. Please log in again.');
    return;
  }

  const form = new FormData();
  form.append("clientId", formData.clientId);
  form.append("campaignId", formData.campaignId);
  form.append("managementId", formData.managementId);
  form.append("title", formData.title);
  form.append("detailManagementId", formData.detailManagementId);
  form.append("requestDetails", formData.requestDetails);
  form.append("user_id", userInfor.id.toString());

  formData.attachedDocuments.forEach((file) => {
    form.append("materials", file);
  });

  try {
    setIsSubmitting(true);
    const response = await submitSolicitud(form); // Submit the FormData
    console.log('response:', response);
  

    if (response && response.number_ticket) {
      const { number_ticket } = response; // Ahora accedes correctamente
      setNumberTicket(number_ticket);
      console.log('Ticket generado:', number_ticket);
      setStep(3); // Ir al paso de éxito
    } else {
      console.error('El campo number_ticket no está definido en response:', response);
      alert('Error: No se pudo generar el número de ticket.');
    }
    
  } catch (error) {
    console.error('Error al enviar la solicitud:', error);
    alert('Hubo un error al enviar la solicitud. Inténtelo de nuevo.');
  }
};

  const handleNextStep = () => {
    if (step === 1) {
      const isValid = validateStep1(
        formData.clientId,
        formData.campaignId,
        formData.managementId,
        formData.detailManagementId, // Pass the detailManagementId to validation
        formData.title
      );
      if (isValid) {
        setStep(2);
      }
    } else if (step === 2) {
      const isValid = validateStep2(formData.requestDetails, formData.attachedDocuments);
      if (isValid) {
        // Your submit logic goes here (if needed)
      }
    }
  };


const handleNewRequest = () => {
    setFormData({
      clientId: '',
      campaignId: '',
      managementId: '',
      title: '',
      detailManagementId: '',
      requestDetails: '',
      attachedDocuments: [],
      user_id: userInfor.id,
    });
    setNumberTicket(null);
    setStep(1);
};

return (
    <div className="flex flex-col lg:flex-row h-screen  bg-white text-black">
      <DrawerSolicitante showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div
        className={`flex-1 p-6 transition-all duration-300 text-black ${
          showSidebar ? 'ml-64' : 'ml-16'
        }`}
      >
        <Navbar
          bgColor="bg-gradient-to-r from-[#682cd8] via-[#7959ef] to-[#f428e1]"
          paddingtop="pt-4"
        />
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-black">Formulario de Solicitud</h1>

          {/* Progress Bar */}
          <div className="relative mb-8">
            <div className="flex justify-between mb-2">
              <div className="w-1/3 text-center">Paso 1</div>
              <div className="w-1/3 text-center">Paso 2</div>
            </div>
            <div className="relative w-full h-1 bg-gray-300">
              <div
                className={`absolute top-0 left-0 h-1 bg-purple-500 transition-all duration-300`}
                style={{ width: `${(step / 2) * 100}%` }}
              ></div>
            </div>
          </div>

          {errors.length > 0 && <Alert message={errors.join(' ')} type="error" />}
          {step < 3 && (
          <form className="bg-white p-6 rounded-lg shadow-lg space-y-6" onSubmit={handleSubmit}>
            {/* Paso 1 */}
            {step === 1 && (
              <>
                <div className="mb-4">
                  <label htmlFor="cliente" className="block text-lg font-semibold mb-2">Titulo</label>
                  <input
                    id="cliente"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#682cd8] transition"
                    value={formData.title}
                    onChange={handleTitleChange}
                   ></input>
                </div>

                <div className="mb-4">
                  <label htmlFor="cliente" className="block text-lg font-semibold mb-2">Tipo de Cliente</label>
                  <select
                    id="cliente"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#682cd8] transition"
                    value={formData.clientId}
                    onChange={handleClientChange}
                  >
                    <option value="">Seleccione cliente</option>
                    {typeClients.map((client) => (
                      <option key={client.client_id} value={client.client_id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedClientId && (
                  <div className="mb-4">
                    <label htmlFor="campaign" className="block text-lg font-semibold mb-2">Campaña</label>
                    <select
                      id="campaign"
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#682cd8] transition"
                      value={formData.campaignId}
                      onChange={handleCampaignChange}
                    >
                      <option value="">Seleccione campaña</option>
                      {campaigns.map((campaign) => (
                        <option key={campaign.campaign_id} value={campaign.campaign_id}>
                          {campaign.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="mb-4">
                  <label htmlFor="management" className="block text-lg font-semibold mb-2">Tipo de Gestión</label>
                  <select
                    id="management"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#682cd8] transition"
                    value={formData.managementId}
                    onChange={handleManagementChange}
                  >
                    <option value="">Seleccione Tipo de Gestión</option>
                    {typeManagement.map((management) => (
                      <option key={management.management_id} value={management.management_id}>
                        {management.name}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedManagementId && (
                  <div className="mb-4">
                    <label htmlFor="detailManagement" className="block text-lg font-semibold mb-2">Detalle de Gestión</label>
                    <select
                      id="detailManagement"
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#682cd8] transition"

                      value={formData.detailManagementId}
                      onChange={handleDetailManagementChange}
                    >
                      <option value="">Seleccione Detalle</option>
                      {detailManagement.map((detail) => (
                        <option key={detail.det_management_id} value={detail.det_management_id}>
                          {detail.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <button
                  type="button"
                  className="w-full bg-[#682cd8] text-white py-3 px-6 rounded-lg font-semibold hover:bg-gradient-to-l transition duration-300"
                  onClick={handleNextStep}
                >
                  Siguiente
                </button>
              </>
            )}

            {/* Paso 2 */}
            {step === 2 && (
              <>
                <div className="mb-4">
                  <label htmlFor="requestDetails" className="block text-lg font-semibold mb-2">
                    Detalles de la Solicitud
                  </label>
                  <textarea
                    id="requestDetails"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#682cd8] transition"
                    rows={4}
                    placeholder='EXPLIQUE CORRECTAMENTE Y DETALLADAMENTE LA SOLICITUD'
                    value={formData.requestDetails}
                    onChange={handleRequestDetailsChange}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="attachedDocuments" className="block text-lg font-semibold mb-2">
                    Adjuntar Documentos
                  </label>
                  <p className="text-gray-600 text-sm ">
                   ej. Capturas en caso de error , archivos en caso de creación de plantillas de calidad , archivos con las fraseologías en caso de creación de categoría
                  </p>
                  <FileInput onChange={handleFileChange} />
                </div>

                
                <button
                    type="submit"
                    className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition duration-300 ${
                      isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#682cd8] hover:bg-gradient-to-l'
                    }`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Enviando...' : 'Finalizar'}
                  </button>
              </>
            )}
          </form>
           )}

          {/* Ticket generado */}
          {step === 3 && (
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold mb-4">¡Solicitud enviada con éxito!</h2>
              <p className="text-lg mb-6">Número de ticket: <strong>{numberTicket}</strong></p>
              <div className="flex justify-center space-x-4">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                  onClick={handleNewRequest}
                >
                  Nueva Solicitud
                </button>
                <button
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition"
                  onClick={() => setStep(1)}
                >
                  Ver Solicitudes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
