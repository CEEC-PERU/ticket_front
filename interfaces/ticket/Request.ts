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
  