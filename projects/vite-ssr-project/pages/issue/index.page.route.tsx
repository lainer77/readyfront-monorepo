import { PageContext } from 'renderer/types';
import { resolveRoute } from 'vite-plugin-ssr/routing';

export default (pageContext: PageContext) => {
    const result = resolveRoute(
        '/issue',
        pageContext.urlPathname.match(/\/issue/) ? '/issue' : pageContext.urlPathname,
    );

    return result;
};
