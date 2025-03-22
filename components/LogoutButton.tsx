'use client';

import { useAppDispatch } from '@/redux/hooks';
import { authApi, useLogoutMutation } from '@/redux/rtk/auth';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
    const dispatch = useAppDispatch();

    const router = useRouter();
    const [logout] = useLogoutMutation();

    const handleLogout = async () => {
        await logout({});
        // Reset Redux store (clear cache)
        dispatch(authApi.util.resetApiState());

        router.push('/');
    };

    return <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2">Logout</button>;
}
