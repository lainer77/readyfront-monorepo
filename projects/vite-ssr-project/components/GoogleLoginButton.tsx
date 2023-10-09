import { FcGoogle } from 'react-icons/fc';
import { styled } from 'styled-components';

const StyleIcon = styled(FcGoogle)`
    width: 3rem;
    height: 3rem;
    margin-bottom: 0.4rem;
`;

const GoogleLoginButton = () => {
    return (
        <StyleIcon
            onClick={() => {
                location.href = '/auth/google';
            }}
            className="clickable"
            height="30px"
            width="30px"
        />
    );
};

export default GoogleLoginButton;
