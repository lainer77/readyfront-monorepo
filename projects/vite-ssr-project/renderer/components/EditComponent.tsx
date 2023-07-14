import prettier from 'prettier';
import parserBabel from 'prettier/parser-babel';
import { useEffect, useState } from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';

export function EditComponent({
    defaultCode,
    noInline = true,
    scope,
}: {
    defaultCode: string;
    noInline?: boolean;
    scope?: Record<string, unknown>;
}) {
    const [code, setCode] = useState(defaultCode);
    const [mode, setMode] = useState<'edit' | 'show'>('show');
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
            <div style={{ position: 'relative' }}>
                <button
                    onClick={() => setMode(mode === 'show' ? 'edit' : 'show')}
                    style={{ position: 'absolute', right: '0.5rem', top: '0.5rem' }}
                    type="button"
                >
                    수정
                </button>
                {mode === 'edit' && <LiveEditor />}
                {mode === 'show' && <LivePreview />}
                <LiveError
                    style={{
                        backgroundColor: '#FED7D7', // Red-100
                        color: '#DC2626', // Red-800
                        marginTop: '0.5rem',
                    }}
                />
            </div>
        </LiveProvider>
    );
}
