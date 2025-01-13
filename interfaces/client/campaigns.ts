
export interface Client{
   name: string;
}
  
export interface Camapign {
    campaign_id: number;
    name: string;
    client_id: number;
    created_at: string;
    updated_at: string;
    client: Client;
}
  