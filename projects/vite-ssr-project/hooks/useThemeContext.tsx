import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

export { ThemeProvider, darkTheme, lightTheme, useThemeContext };

// 디폴트 테마 정의
const lightTheme = {
    activeColor: '#eee',
    backgroundColor: '#fff', // 다크 배경색
    errorColor: '#DC3545',
    primaryColor: '#007BFF',
    secondaryColor: '#28A745',
    textColor: '#222', // 다크 텍스트 색상
};
// 다크 테마 정의
const darkTheme = {
    activeColor: '#686969',
    backgroundColor: '#343a40', // 다크 배경색
    errorColor: '#DC3545',
    primaryColor: '#007BFF',
    secondaryColor: '#28A745',
    textColor: '#f8f9fa', // 다크 텍스트 색상
};
type tTheme = 'dark' | 'light';

interface ThemeContextProps {
    theme: tTheme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
    theme: 'light',
    toggleTheme: () => console.log('default theme'),
});

interface ThemeProviderProps {
    children: ReactNode;
}

function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState<tTheme>('light');

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            sessionStorage.setItem(
                'prefers-color-scheme',
                prevTheme === 'light' ? 'dark' : 'light',
            );
            return prevTheme === 'light' ? 'dark' : 'light';
        });
    };

    const currentTheme = theme === 'light' ? lightTheme : darkTheme;

    useEffect(() => {
        const sessionDark = sessionStorage.getItem('prefers-color-scheme');
        const isDarkMode = sessionDark
            ? sessionDark === 'dark'
            : window.matchMedia?.('(prefers-color-scheme: dark)').matches;
        if (!sessionDark)
            sessionStorage.setItem('prefers-color-scheme', isDarkMode ? 'dark' : 'light');
        setTheme(isDarkMode ? 'dark' : 'light');
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <StyledThemeProvider theme={currentTheme}>{children}</StyledThemeProvider>
        </ThemeContext.Provider>
    );
}

const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
