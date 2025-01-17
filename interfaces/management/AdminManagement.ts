export interface Profile {
    name: string;
    lastname: string;
  }
  
  export interface User {
    email: string;
    profile: Profile;
  }
  
  export interface State {
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
  
  export interface FileDetails {
    file: string;
  }
  
  export interface DetailRequests {
    detail_name: string;
    fileDetails: FileDetails[];
  }
  
  export interface AdminManagement {
    request_id: number;
    title: string;
    campaign_id: number;
    det_management_id: number;
    client_id: number;
    management_id: number;
    user_id: number;
    active: boolean;
    state_id: number;
    number_ticket: number;
    created_at: string;
    updated_at: string;
    user: User;
    state: State;
    TypeClient: TypeClient;
    campaign: Campaign;
    TypeManagement: TypeManagement;
    detailManagement: { name: string }; // Added to match `detailManagement`
    Detail_Requests: DetailRequests[];
  }
  