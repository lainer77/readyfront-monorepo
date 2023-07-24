export type tRenderMarkType = 'CSR' | 'ISR' | 'SSG' | 'SSR';

export default function RenderMark({ type }: { type: tRenderMarkType }) {
    return (
        <div
            style={{
                backgroundColor: { CSR: 'red', ISR: 'yellow', SSG: 'green', SSR: 'blue' }[type],
                color: { CSR: 'white', ISR: 'blue', SSG: 'yellow', SSR: 'white' }[type],
            }}
            className="render-mark"
        >
            {type}
        </div>
    );
}
