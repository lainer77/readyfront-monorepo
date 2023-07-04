import { PageContext } from 'renderer/types';
import { resolveRoute } from 'vite-plugin-ssr/routing';

export default (pageContext: PageContext) => {
    const result = resolveRoute(
        '/my',
        pageContext.urlPathname.match(/\/my/) ? '/my' : pageContext.urlPathname,
    );
    if (pageContext.urlPathname.match(/\/my/)) return result;

    return result;
};
