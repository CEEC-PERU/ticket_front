export interface ProfileRequest {
    name : string;
    last_name : string;
  }



  export interface ProfileResponse {
    profile_id: number;
    name : string;
    last_name : string;
    user_id: number;
  }

  export interface User{
    user_id : string;
    email: string ;
    is_active : boolean;
    userProfile : {
     profile_id: number;
     name : string;
     last_name : string;
     user_id : number;
    }
  
  }


export interface Profile {
  name: string;    
  lastname: string; 
}

// Interfaz para el usuario
export interface UserProfile {
  user_id: number; 
  email: string;   
  role_id: number; 
  is_active: boolean; 
  profile: Profile;  
}
