import {useContext} from 'react';
import {AuthContext, authContextDataProps} from '../contexts/authContext'

export function useAuth(): authContextDataProps {
  const context = useContext(AuthContext);

  return context
}