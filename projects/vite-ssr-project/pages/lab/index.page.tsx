import RenderMark from '#components/RenderMark';
import { usePrettierFormat } from '#hooks/usePrettierFormat';
import { Editor, StaticComponentEdit } from '@common/components';
import { IoIosFlask } from 'react-icons/Io';

export { Page };
const defaultCode = `
type Props = {
    label: string,
};
const Counter = (props: Props) => {
    const [count, setCount] = React.useState<number>(0);
    return (
        <div>
            <h3
                style={{
                    background: 'darkslateblue',
                    color: 'white',
                    padding: 8,
                    borderRadius: 4,
                }}>
                {props.label}: {count} 🧮
            </h3>
            <button onClick={() => setCount((c) => c + 1)}>Increment</button>
        </div>
    );
};
render(<Counter label='Counter' />);`;

function Page() {
    return (
        <>
            <RenderMark type="SSR" />
            <h1
                style={{
                    alignItems: 'center',
                    display: 'flex',
                    marginBottom: '5rem',
                }}
            >
                <IoIosFlask fontSize="2.5rem" />
                실험실
            </h1>
            <h3>에디터 테스트</h3>
            <Editor
                scope={{
                    headerProps: { text: 'test' },
                }}
                defaultCode={defaultCode}
                noInline={!defaultCode.match(/rednder\(/)}
                plugins={[usePrettierFormat]}
            />
            <h3>수정 가능 컴포넌트 테스트</h3>
            <StaticComponentEdit
                scope={{
                    headerProps: { text: 'test' },
                }}
                defaultCode={defaultCode}
                noInline={!defaultCode.match(/rednder\(/)}
                plugins={[usePrettierFormat]}
            />
        </>
    );
}

export const documentProps = {
    description: '언제나 준비된 개발자가되기 위해',
    title: '실험실',
};
