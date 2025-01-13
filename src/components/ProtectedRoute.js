import styles from '../styles/components/ProtectedRoute.module.css';
import { useAuthenticationStatus } from '@nhost/react';
import { Navigate } from 'react-router-dom';
import Spinner from './Spinner';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuthenticationStatus();

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace={true} />;
  }

  return <>{children}</>;
}