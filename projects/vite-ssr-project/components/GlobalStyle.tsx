import 'normalize.css';
import { createGlobalStyle } from 'styled-components';

import './GlobalStyle.scss';

const styled = { createGlobalStyle };
export const GlobalStyle = styled.createGlobalStyle`
    :root {
        --primary-color: ${({ theme }) => theme?.primaryColor};
        --secondary-color: ${({ theme }) => theme?.secondaryColor};
        --error-color: ${({ theme }) => theme?.errorColor};
        --background-color: ${({ theme }) => theme?.backgroundColor};
        --text-color: ${({ theme }) => theme?.textColor};
    }
`;
