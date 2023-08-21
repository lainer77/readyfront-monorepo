/* eslint-disable no-unused-vars */
import React from 'react';
import { useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';

export function StaticComponentEdit({
    children,
    defaultCode = '',
    noInline = true,
    onEdit,
    plugins,
    scope,
}: {
    children?: React.JSX.Element;
    defaultCode?: string;
    noInline?: boolean;
    onEdit?: (value: string) => void;
    plugins?: ((code: string) => string)[];
    scope?: Record<string, unknown>;
}) {
    let childrenText = children && ReactDOMServer.renderToString(children);
    if (children && noInline && !childrenText?.match(/render\(/))
        childrenText = `render(${childrenText})`;
    childrenText = childrenText?.replace(/class=/g, 'className=');
    const prettierCode = plugins?.reduce((acc, plugin) => plugin(acc), defaultCode) || defaultCode;
    const [mode, setMode] = useState<'edit' | 'show'>('show');
    const [code, setCode] = useState(prettierCode);

    const handleModeChange = () => {
        if (mode === 'edit') onEdit?.(code);
        setMode(mode === 'show' ? 'edit' : 'show');
    };

    return (
        <LiveProvider code={prettierCode} enableTypeScript noInline={noInline} scope={scope}>
            <div style={{ position: 'relative' }}>
                <button
                    onClick={handleModeChange}
                    style={{ position: 'absolute', right: '0.5rem', top: '0.5rem' }}
                    type="button"
                >
                    수정
                </button>
                <LiveEditor
                    onChange={(code) => setCode(code)}
                    style={{ display: mode === 'edit' ? 'block' : 'none' }}
                />
                <LivePreview style={{ display: mode === 'show' ? 'block' : 'none' }} />
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
