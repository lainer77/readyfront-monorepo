import Popup from '#components/Popup';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export { PopupCotainer };
function PopupCotainer() {
    const location = useLocation();
    const [isIssueCardOpen, setIssueCard] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname.match(/issue/))
            if (location.pathname.match(/\/issue\//)) setIssueCard(true);
            else setIssueCard(false);
    }, [location]);

    return (
        <>
            <Popup isOpen={isIssueCardOpen} onClose={() => navigate('/issue', { replace: true })}>
                <div>isIssueCardOpen</div>
            </Popup>
        </>
    );
}
