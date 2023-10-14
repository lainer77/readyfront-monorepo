import { BoardsContainer } from './_containers/BoardsContainer';
import { PopupCotainer } from './_containers/PopupCotainer';
import { useIssue } from './_hooks';

export { IssuePage };

function IssuePage() {
    useIssue.init();
    return (
        <>
            <div style={{ display: 'flex', overflow: 'auto' }}>
                <BoardsContainer />
            </div>
            <PopupCotainer />
        </>
    );
}
