import { styled } from 'styled-components';
export type tRenderMarkType = 'CSR' | 'ISR' | 'SSG' | 'SSR';
const MarkStyled = styled.div<{ type: tRenderMarkType }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background-color: ${(props) =>
        ({ CSR: 'red', ISR: 'yellow', SSG: 'green', SSR: 'blue' }[props.type])};
    color: ${(props) => ({ CSR: 'white', ISR: 'blue', SSG: 'yellow', SSR: 'white' }[props.type])};
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    z-index: 1;
    opacity: 0.4;
`;
export default function RenderMark({ type }: { type: tRenderMarkType }) {
    return <MarkStyled type={type}>{type}</MarkStyled>;
}
