import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import { useEffect, useState } from 'react';

export function usePrettierFormat(defaultCode: string) {
    const [code, setCode] = useState(defaultCode);
    useEffect(() => {
        const func = async () => {
            const text = prettier.format(defaultCode, {
                parser: 'babel-flow',
                plugins: [parser],
                printWidth: 100,
                semi: true,
                singleQuote: true,
                tabWidth: 4,
                trailingComma: 'all',
            });
            if (text) setCode(text);
        };
        func();
    }, [defaultCode]);

    return code;
}
