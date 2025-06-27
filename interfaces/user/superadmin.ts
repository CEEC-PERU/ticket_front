export interface SuperAdmin {
  user_id: number;
  nombre_completo: string;
  email: string;
  pendientes: number;
  en_proceso: number;
  finalizados: number;
}

export interface AdminDetails {
  adminticket_id: number;
  user_id: number;
  request_id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  attention_time: string;
  state_id: number;
  number_ticket: number;
  created_at_request: Date;
  state: string;
  email: string;
  name: string;
  lastname: string;
}
