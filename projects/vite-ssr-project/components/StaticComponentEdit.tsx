import { useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';

import { usePrettierFormat } from '../hooks/usePrettierFormat';

export function StaticComponentEdit({
    children,
    defaultCode = '',
    noInline = true,
    scope,
}: {
    children?: JSX.Element;
    defaultCode?: string;
    noInline?: boolean;
    scope?: Record<string, unknown>;
}) {
    let childrenText = children && ReactDOMServer.renderToString(children);
    if (children && noInline && !childrenText?.match(/render\(/))
        childrenText = `render(${childrenText})`;
    childrenText = childrenText?.replace(/class=/g, 'className=');
    const code = usePrettierFormat(childrenText || defaultCode);
    const [mode, setMode] = useState<'edit' | 'show'>('show');
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
                <LiveEditor style={{ display: mode === 'edit' ? 'block' : 'none' }} />
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
