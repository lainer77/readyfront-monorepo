import Popup from '#components/Popup';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { IssuePopup } from '../_components/IssuePopup';

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
                <IssuePopup />
            </Popup>
        </>
    );
}
