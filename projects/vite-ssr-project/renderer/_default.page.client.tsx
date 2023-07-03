export { render };

import { hydrateRoot, createRoot } from 'react-dom/client';

import type { PageContextClient } from './types';

import { PageShell } from './PageShell';

// This render() hook only supports SSR, see https://vite-plugin-ssr.com/render-modes for how to modify render() to support SPA
async function render(pageContext: PageContextClient) {
    const { Page, pageProps } = pageContext;
    if (!Page) throw new Error('Client-side render() hook expects pageContext.Page to be defined');
    const root = document.getElementById('react-root');
    if (!root) throw new Error('DOM element #react-root not found');
    if (root.innerHTML === '' || !pageContext.isHydration) {
        // - SPA pages don't have any hydration steps: they need to be fully rendered.
        // - Page navigation of SSR pages also need to be fully rendered (if we use Client Routing)
        await createRoot(root).render(
            <PageShell pageContext={pageContext}>
                <Page {...pageProps} />
            </PageShell>,
        );
    } else {
        // The first render of SSR pages is merely a hydration (instead of a full render)
        await hydrateRoot(
            root,
            <PageShell pageContext={pageContext}>
                <Page {...pageProps} />
            </PageShell>,
        );
    }
}

/* To enable Client-side Routing:
export const clientRouting = true
// !! WARNING !! Before doing so, read https://vite-plugin-ssr.com/clientRouting */
