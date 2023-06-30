export { render };
// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ['pageProps', 'urlPathname'];

import ReactDOMServer from 'react-dom/server';
import { dangerouslySkipEscape, escapeInject } from 'vite-plugin-ssr/server';

import type { PageContextServer } from './types';

import { PageShell } from './PageShell';
import logoUrl from './logo.svg';

async function render(pageContext: PageContextServer) {
    const { Page, pageProps } = pageContext;

    let pageHtml;
    if (Page) {
        // For SSR pages
        pageHtml = ReactDOMServer.renderToString(
            <PageShell pageContext={pageContext}>
                <Page {...pageProps} />
            </PageShell>,
        );
    } else {
        // For SPA pages
        pageHtml = '';
    }

    // See https://vite-plugin-ssr.com/head
    const { documentProps } = pageContext.exports;
    const title = (documentProps && documentProps.title) || 'Vite SSR app';
    const desc = (documentProps && documentProps.description) || 'App using Vite + vite-plugin-ssr';

    const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="react-root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;

    return {
        documentHtml,
        pageContext: {
            // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
        },
    };
}
