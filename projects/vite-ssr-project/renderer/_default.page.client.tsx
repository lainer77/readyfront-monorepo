export { render };

import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import type { PageContextClient } from './types';

import { PageShell } from '../components/PageShell';

// This render() hook only supports SSR, see https://vite-plugin-ssr.com/render-modes for how to modify render() to support SPA
async function render(pageContext: PageContextClient) {
    const { Page, pageProps } = pageContext;
    if (!Page) throw new Error('Client-side render() hook expects pageContext.Page to be defined');
    const root = document.getElementById('react-root');
    if (!root) throw new Error('DOM element #react-root not found');

    const pageRender = (
        <PageShell pageContext={pageContext}>
            <BrowserRouter>
                <Page {...pageProps} />
            </BrowserRouter>
        </PageShell>
    );
    if (root.innerHTML === '' || !pageContext.isHydration) {
        // - SPA pages don't have any hydration steps: they need to be fully rendered.
        // - Page navigation of SSR pages also need to be fully rendered (if we use Client Routing)
        await createRoot(root).render(pageRender);
    } else {
        // The first render of SSR pages is merely a hydration (instead of a full render)
        await hydrateRoot(root, pageRender);
    }
}

/* To enable Client-side Routing:
export const clientRouting = true
// !! WARNING !! Before doing so, read https://vite-plugin-ssr.com/clientRouting */
