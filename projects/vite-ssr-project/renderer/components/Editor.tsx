import prettier from 'prettier';
import parserBabel from 'prettier/parser-babel';
import { useEffect, useState } from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';

export function Editor({
    defaultCode,
    noInline = true,
    scope,
}: {
    defaultCode: string;
    noInline?: boolean;
    scope?: Record<string, unknown>;
}) {
    const [code, setCode] = useState(defaultCode);
    useEffect(() => {
        const func = () => {
            const text = prettier?.format(defaultCode, {
                parser: 'babel',
                plugins: [parserBabel],
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

    return (
        <LiveProvider code={code} noInline={noInline} scope={scope}>
            <div
                style={{
                    display: 'grid',
                    gap: '0.4rem',
                    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                }}
            >
                <LiveEditor />
                <LivePreview
                    style={{
                        backgroundColor: '#d5e6eb',
                        padding: '1rem',
                    }}
                />
            </div>
            <LiveError
                style={{
                    backgroundColor: '#FED7D7', // Red-100
                    color: '#DC2626', // Red-800
                    marginTop: '0.5rem',
                }}
            />
        </LiveProvider>
    );
}
