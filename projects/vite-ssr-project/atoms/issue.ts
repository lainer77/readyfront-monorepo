import { generateAtoms, generateSelector } from './supplier';

const boardList = [
    {
        draggable: true,
        list: [
            {
                body: [
                    'styled-components 라이브러리에서 createGlobalStyle에 font-face를 정의시 리렌더링이 발생하면, 폰트가 잠시 깜빡거리는 이슈',
                    '<b>해결:</b> ',
                    '- font-face정의 css 파일로 따로 만들어 index.ts 파일에 임포트',
                    '- cdn에 font-face정의 css 파일 올려두고, index.html에서 로드',
                ],
                header: 'FOUT(Flash Of Unstyled Font)',
                id: 0,
            },
            {
                body: [
                    '- 웹: 리다이렉트 → 새창',
                    '- 네이티브: 리다이렉트',
                    '- 타사 인앱 브라우저(페북, 인스타그램): 리다이렉트 (새창이 열리지 않음. window.open → window.history.push로 전환되는 것 같음)',
                    '- 타사 인앱 브라우저(카카오, 네이버): 리다이렉트 → 새창',
                ],
                header: '인앱 브라우저 별 이슈',
                id: 1,
            },
            {
                body: [
                    'resize 이벤트로 변환 감지 로직 추가',
                    `\`\`\` 
                    const [vHeight, setVHeight] = useState<number | undefined>();
                    useEffect(() => {
                        const setVh = () => {
                            setVHeight(window.innerHeight);
                        };
                        window.addEventListener('resize', setVh);
                    
                        setVh();
                    
                        return () => {
                            window.removeEventListener('resize', setVh);
                        };
                    }, []);
                    \`\`\``,
                ],
                header: '인스타 인앱브라우저 viewport 변환 감지 못하는 이슈',
                id: 2,
            },
            { body: '', header: 'useQuery Interceptors 사용시 error 핸들링 안되는 이슈', id: 3 },
            {
                body: [
                    '원인: 결제 모듈, 카드등록모듈 사용시 보이지 않는 history 시 2~3회 push 되어 있는 이슈',
                    '상세: 웹에서 뒤로가기를 막는 기능은 존재하지 않고, 뒤로가기 후에 popState 이벤트가 호출되고, 조건에 따라 다시 앞으로 이동하고도록 하는 식으로 구현해야 하기 때문에,',
                    '결제 완료 후 뒤로가기를 시도하면 다시 토스결제창으로 이동하여 에러페이지 표시',
                    '<b>해결:</b> 결제 시도 시 window.open으로 결제전용 페이지를 띄우고, 토스모듈을 실행 후 결제 완료 후 새창 종료',
                ],
                header: '토스페이먼츠 결제 window.history 빈 푸쉬되는 이슈',
                id: 4,
            },
            {
                body: [
                    '이미지를 사전 로드하려면 JavaScript를 사용하여 다음과 같이 작성할 수 있습니다.',
                    `\`\`\` 
                    var image = new Image();
                    image.src = "이미지 URL";
                    \`\`\``,
                    '이미지 URL을 적절한 URL로 바꾸면 됩니다. 이 코드는 이미지를 생성하고 URL을 설정하여 이미지를 사전 로드합니다. 이렇게하면 이미지가 브라우저 캐시에 저장되어 페이지가 로드될 때 빠르게 로드됩니다.하지만, Safari에서는 이러한 방식의 이미지 사전 로드를 지원하지 않습니다. Safari에서는 이미지를 사전 로드하는 대신, HTTP 헤더를 사용하여 이미지를 사전에 다운로드 할 수 있습니다. 이를 위해서는 이미지가 포함된 웹 페이지의 서버 측 코드를 수정해야 합니다.',
                    '',
                    '사파리에서 preload 하는 코드',
                    `\`\`\` 
                    const link = document.createElement('link');
                    link.rel = 'preload';
                    link.href = 'your-resource-url';
                    link.as = 'your-resource-type';
                    document.head.appendChild(link);
                    \`\`\``,
                ],
                header: 'Safari에서는 이미지 사전 로드 image.src로 처리 안되는 이슈',
                id: 5,
            },
            {
                body: [
                    'GPU 가속 사용',
                    `\`\`\` css
                    # 구
                    -webkit-transform: translate3d(0, 0, 0);
                    transform: translate3d(0, 0, 0);
                    # 신
                    will-change: transform;
                    \`\`\``,
                    '하드웨어 가속 사용',
                    `\`\`\` css
                    # 구
                    -webkit-transform: translate3d(0, 0, 0);
                    transform: translate3d(0, 0, 0);
                    # 신
                    will-change: transform;
                    \`\`\``,
                    '애니메이션 속성 최적화',
                    `\`\`\` css
                    # 구
                    -webkit-transform: translate3d(0, 0, 0);
                    transform: translate3d(0, 0, 0);
                    # 신
                    will-change: transform;
                    \`\`\``,
                ],
                header: 'safari transform css 버벅거림 현상',
                id: 6,
            },
        ],
        sort: 'asc',
    },
];

type tBoardList = typeof boardList;
type tBoardItem = tBoardList[number];
type tCardList = tBoardItem['list'];
type tCardItem = tCardList[number];
interface IIssueState {
    boardList: typeof boardList;
    selectedBoardIndex: number | undefined;
    selectedCardIndex: number | undefined;
}
const issueState: IIssueState = {
    boardList,
    selectedBoardIndex: undefined,
    selectedCardIndex: undefined,
};

const issueAtoms = generateAtoms('issueState', issueState);
const issueAtom = generateSelector<IIssueState, typeof issueAtoms>('issueState', issueAtoms);

export {
    IIssueState,
    issueAtom,
    issueAtoms,
    issueState,
    tBoardItem,
    tBoardList,
    tCardItem,
    tCardList,
};
