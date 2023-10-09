import { StaticComponentEdit } from '@common/components';

import { useHome } from '../_hooks';

export function CVContent() {
    const { handleHomeElementUpdate, home } = useHome.supply().handler();

    return (
        <>
            {home.introduction && (
                <StaticComponentEdit
                    defaultCode={`render(${home.introduction})`}
                    onEdit={handleHomeElementUpdate('introduction')}
                />
            )}
            {home.experience && (
                <StaticComponentEdit
                    defaultCode={`render(${home.experience})`}
                    onEdit={handleHomeElementUpdate('experience')}
                />
            )}
            {home.skills && (
                <StaticComponentEdit
                    defaultCode={`render(${home.skills})`}
                    onEdit={handleHomeElementUpdate('skills')}
                />
            )}
        </>
    );
}
