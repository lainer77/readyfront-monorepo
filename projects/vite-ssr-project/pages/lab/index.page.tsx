import { Editor } from '../../renderer/components/Editor';

export { Page };

function Page() {
    return (
        <>
            <h3>에디터 테스트</h3>
            <Editor
                defaultCode="
                () => {
                    const [likes, increaseLikes] = React.useState(0);
                  
                    return (
                      <>
                        <p>{`${likes} likes`}</p>
                        <button onClick={() => increaseLikes(likes + 1)}>Like</button>
                      </>
                    );
                  };"
                scope={{
                    headerProps: { text: 'test' },
                }}
                noInline={false}
            />
        </>
    );
}

export const documentProps = {
    description: '언제나 준비된 개발자가되기 위해',
    title: '실험실',
};
