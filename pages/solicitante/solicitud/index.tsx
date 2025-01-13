import React, { useState } from 'react';
import { useTypeClients } from '../../../hooks/client/useTypeClient';
import { useCampaings } from '../../../hooks/client/campaigns';
import { useDetailManagement } from '../../../hooks/management/useDetailManagement';
import { useTypeManagement } from '../../../hooks/management/useTypeManagement';
import Navbar from '../../../components/solicitante/Navbar';
import DrawerSolicitante from '../../../components/solicitante/DrawerSolicitante';
import './../../../app/globals.css';

export default function Solicitud() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null); // Estado para almacenar el client_id seleccionado
  const [selectedManagementId, setSelectedManagementId] = useState<number | null>(null); // Estado para almacenar el management_id seleccionado
  const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(null); // Estado para almacenar la campaña seleccionada
  const [step, setStep] = useState(1); // Estado para controlar el paso del formulario

  const { typeClients, loading, error } = useTypeClients();
  const { typeManagement } = useTypeManagement();
  const { campaigns } = useCampaings(selectedClientId as number);
  const { detailManagement } = useDetailManagement(selectedManagementId as number);

  // Estado para el formulario
  const [formData, setFormData] = useState({
    clientId: '',
    campaignId: '',
    managementId: '',
    detailManagementId: '',
    requestDetails: '', // Detalle de la solicitud
    attachedDocuments: [] as File[], // Archivos adjuntos
  });

  // Manejar el cambio de cliente
  const handleClientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const clientId = parseInt(event.target.value, 10);
    setSelectedClientId(clientId); // Actualizar el estado con el client_id seleccionado
    setFormData((prevData) => ({ ...prevData, clientId: event.target.value }));
  };

  const handleManagementChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const managementId = parseInt(event.target.value, 10);
    setSelectedManagementId(managementId); // Actualizar el estado con el management_id seleccionado
    setFormData((prevData) => ({ ...prevData, managementId: event.target.value }));
  };

  const handleCampaignChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const campaignId = parseInt(event.target.value, 10);
    setSelectedCampaignId(campaignId); // Actualizar el estado con el campaign_id seleccionado
    setFormData((prevData) => ({ ...prevData, campaignId: event.target.value }));
  };

  const handleDetailManagementChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const detailManagementId = parseInt(event.target.value, 10);
    setFormData((prevData) => ({ ...prevData, detailManagementId: event.target.value }));
  };

  const handleRequestDetailsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prevData) => ({ ...prevData, requestDetails: event.target.value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFormData((prevData) => ({
        ...prevData,
        attachedDocuments: Array.from(files),
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData); // Aquí puedes enviar los datos al servidor
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50 text-black">
      {/* Sidebar */}
      <DrawerSolicitante showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      {/* Main Content */}
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
          {/* Form Section */}
          <form className="bg-white p-6 rounded-lg shadow-lg space-y-6" onSubmit={handleSubmit}>
            
            {/* Paso 1 */}
            {step === 1 && (
              <>
                {/* Tipo de Cliente */}
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

                {/* Mostrar Campañas */}
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

                {/* Tipo de Gestión */}
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

                {/* Detalle de Gestión */}
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

                {/* Botón para pasar al paso 2 */}
                <button
                  type="button"
                  className="w-full bg-[#682cd8] text-white py-3 px-6 rounded-lg font-semibold hover:bg-gradient-to-l transition duration-300"
                  onClick={() => setStep(2)}
                >
                  Siguiente
                </button>
              </>
            )}

            {/* Paso 2 */}
            {step === 2 && (
              <>
                {/* Detallar Solicitud */}
                <div className="mb-4">
                  <label htmlFor="requestDetails" className="block text-lg font-semibold mb-2">Detallar Solicitud</label>
                  <textarea
                    id="requestDetails"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#682cd8] transition"
                    rows={6}
                    value={formData.requestDetails}
                    onChange={handleRequestDetailsChange}
                    placeholder="Explica detalladamente tu solicitud"
                  />
                </div>

                {/* Adjuntar Documentos */}
                <div className="mb-4">
                  <label htmlFor="attachedDocuments" className="block text-lg font-semibold mb-2">Adjuntar Documentos</label>
                  <p className="text-sm text-gray-500 mb-2">
                    CAPTURAS EN CASO DE ERROR<br />
                    ARCHIVOS EN CASO DE CREACIÓN DE PLANTILLAS DE CALIDAD<br />
                    ARCHIVOS CON LAS FRASEOLOGÍAS EN CASO DE CREACIÓN DE CATEGORÍA
                  </p>
                  <input
                    id="attachedDocuments"
                    type="file"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#682cd8] transition"
                    multiple
                    onChange={handleFileChange}
                  />
                </div>

                {/* Botón de Enviar */}
                <button
                  type="submit"
                  className="w-full bg-[#682cd8] text-white py-3 px-6 rounded-lg font-semibold hover:bg-gradient-to-l transition duration-300"
                >
                  Enviar Solicitud
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
