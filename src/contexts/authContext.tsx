import { createContext, ReactNode, useState, useEffect } from "react";
import* as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface authContextDataProps {
  user: UserProps;
  isUserLoading: boolean;
  singIn: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as authContextDataProps);

export function AuthContextProvider({children}: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '651167065055-3793k9hk2ik0aofaj5h7a68p68srba9f.apps.googleusercontent.com',
    redirectUri: AuthSession.makeRedirectUri({useProxy: true}),
    scopes: ['profile', 'email']
  })


  async function singIn(){
    try{
      setIsUserLoading(true);
      await promptAsync();
    } catch(error) {
      console.log(error);
      throw error;

    }finally {
      setIsUserLoading(false)
    }
  }

  async function singInWithGoogle(access_token: string) {
    console.log("token de autenticação ==>", access_token)
  }

  useEffect(() => {
    if(response?.type === 'success' && response.authentication?.accessToken){
      singInWithGoogle(response.authentication.accessToken);
    }
  }, [response]);

  return(
    <AuthContext.Provider value={{
      singIn,
      isUserLoading,
      user,
    }}>
      {children}
    </AuthContext.Provider>
  )
}  