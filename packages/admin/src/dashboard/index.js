import * as React from 'react';
import AdminDashboard from './AdminDashboard';
import { useUserState } from '@approbado/lib/hooks/useUserState'

export default function Dashboard() {
    const { isAuth } = useUserState();

    return isAuth ? <AdminDashboard /> : null;
}
