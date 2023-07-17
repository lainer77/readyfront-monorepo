import { useState } from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';

import { usePrettierFormat } from '../../renderer/hooks/usePrettierFormat';

export function EditComponent({
    defaultCode,
    noInline = true,
    scope,
}: {
    defaultCode: string;
    noInline?: boolean;
    scope?: Record<string, unknown>;
}) {
    const code = usePrettierFormat(defaultCode);
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
