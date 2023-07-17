import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';

import { usePrettierFormat } from '../../renderer/hooks/usePrettierFormat';

export function Editor({
    defaultCode,
    noInline = true,
    scope,
}: {
    defaultCode: string;
    noInline?: boolean;
    scope?: Record<string, unknown>;
}) {
    const code = usePrettierFormat(defaultCode);

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
