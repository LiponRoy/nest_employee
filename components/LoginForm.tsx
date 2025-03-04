import { doSocialLogin } from '@/app/actions';
import { Button } from './ui/button';

const LoginForm = () => {
	return (
		<form action={doSocialLogin}>


			<Button
				variant="ghost"
				className="border border-slate-500  bg-white text-black hover:bg-none p-4 rounded-md m-1 text-lg"
				type="submit"
				name="action"
				value="google"
			>
				Sign In With Google
			</Button>
		</form>
	);
};

export default LoginForm;
