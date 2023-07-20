import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) return null;
    return (
        <GoogleLogin
            onSuccess={(res) => {
                console.log(res);
                alert('success');
            }}
            type="icon"
        />
    );
};

export default GoogleLoginButton;
