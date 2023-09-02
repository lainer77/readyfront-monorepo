import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';

export function Editor({
    defaultCode,
    noInline = true,
    plugins,
    scope,
}: {
    defaultCode: string;
    noInline?: boolean;
    // eslint-disable-next-line no-unused-vars
    plugins?: ((code: string) => string)[];
    scope?: Record<string, unknown>;
}) {
    const code = plugins?.reduce((acc, plugin) => plugin(acc), defaultCode) || defaultCode;

    return (
        <LiveProvider code={code} noInline={noInline} scope={scope}>
            <div
                style={{
                    display: 'grid',
                    gap: '0.4rem',
                    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                    lineHeight: 1.4,
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
