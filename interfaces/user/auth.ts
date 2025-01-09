import { Profile, UserInfo } from "./login";

  export interface AuthContextData {
    user?: {
      id: number;
      role: number;
      email: string;
      is_active: boolean;
    }| string |  null ;
    token?: string | null;
    login: (email: string, password: string) => any;
    logout: () => void;
    isLoading?: boolean;
    error?: string | null;
    profileInfo?: Profile | null | UserInfo;
}
  
  export interface AuthProviderProps {
    children: React.ReactNode;
  }
  