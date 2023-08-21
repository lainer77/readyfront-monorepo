import { PageContext } from 'renderer/types';
import { resolveRoute } from 'vite-plugin-ssr/routing';

export default (pageContext: PageContext) => {
    const result = resolveRoute(
        '/setting',
        pageContext.urlPathname.match(/\/setting/) ? '/setting' : pageContext.urlPathname,
    );

    return result;
};
