import api from '../services/api';

export interface BeneficiarioRequest {
  beneficiario: string; 
  cuenta_destino: string; 
}

export interface BeneficiarioResponse {
  id: string;
  beneficiario: string;
  cuenta_destino: string;
  usuario: string;
}

// Obtener todos los beneficiarios
export const getBeneficiarios = async (): Promise<BeneficiarioResponse[]> => {
  try {
    const response = await api.get<BeneficiarioResponse[]>('beneficiarios/');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los beneficiarios:', error);
    throw new Error('Hubo un error al obtener los beneficiarios');
  }
};

// Crear un nuevo beneficiario
export const createBeneficiario = async (
  beneficiarioData: BeneficiarioRequest
): Promise<BeneficiarioResponse> => {
  try {
    const response = await api.post<BeneficiarioResponse>('beneficiarios/', beneficiarioData);
    return response.data;
  } catch (error) {
    console.error('Error al crear beneficiario:', error);
    throw new Error('Hubo un error al crear el beneficiario');
  }
};

// Actualizar un beneficiario
export const updateBeneficiario = async (
  id: string,
  data: BeneficiarioRequest
): Promise<BeneficiarioResponse> => {
  try {
    const response = await api.put<BeneficiarioResponse>(`beneficiarios/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar beneficiario:', error);
    throw new Error('Hubo un error al actualizar el beneficiario');
  }
};

// Eliminar un beneficiario
export const deleteBeneficiario = async (id: string): Promise<void> => {
  try {
    await api.delete(`beneficiarios/${id}/`);
  } catch (error) {
    console.error('Error al eliminar beneficiario:', error);
    throw new Error('Hubo un error al eliminar el beneficiario');
  }
};
