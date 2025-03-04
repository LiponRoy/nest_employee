'use server';

import { signIn, signOut } from '@/auth';

export async function doSocialLogin(formData: any) {
	const action = formData.get('action');
	// after login redirect to profile
	await signIn(action, { redirectTo: '/profile' });
}

export async function doLogout() {
	// after logout redirect to profile
	await signOut({ redirectTo: '/' });
}
