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