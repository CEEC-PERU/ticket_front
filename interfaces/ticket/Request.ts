export interface Request {
    det_management_id: number;
    management_id: number;
    campaign_id: number;
    title : string;
    request_det : string;
    created_at: string;
    updated_at: string;
}
   
export interface UpdateRequest {
    is_aproved?: boolean;
    attention_time?: string;
}
  
  export interface UpdateStateRequest {
    state_id: number;
}
  
/////////////////////////////////////////////////////////////////

export interface UserProfile {
  name: string;
  lastname: string;
}

export interface User {
  email: string;
  profile: UserProfile;
}

export interface State {
  name: string;
}

export interface Level {
  name: string;
}

export interface TypeClient {
  name: string;
}

export interface Campaign {
  name: string;
}

export interface TypeManagement {
  name: string;
}

export interface DetailManagement {
  name: string;
}

export interface FileDetail {
  file: string;
}

export interface DetailRequest {
  detail_name: string;
  fileDetails: FileDetail[];
}

export interface AdminUser {
  email: string;
  profile: UserProfile;
}

export interface AdminTicket {
  user_id: number;
  adminUser: AdminUser;
}

export interface Rejection {
  reason: string;
}

export interface RequestClient {
  request_id: number;
  title: string;
  campaign_id: number;
  det_management_id: number;
  client_id: number;
  management_id: number;
  user_id: number;
  active: boolean;
  state_id: number;
  level_id: number;
  number_ticket: number;
  is_aproved: boolean;
  attention_time: string | null;
  created_at: string;
  updated_at: string;
  user: User;
  state: State;
  Level: Level;
  TypeClient: TypeClient;
  campaign: Campaign;
  TypeManagement: TypeManagement;
  detailManagement: DetailManagement;
  Detail_Requests: DetailRequest[];
  adminTickets: AdminTicket[];
  Rejections: Rejection[];
}
