export { render };
// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ['pageProps', 'urlPathname', 'documentProps'];

import { GlobalStyle } from '~components/GlobalStyle';
import { PageShell } from '~components/PageShell';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { dangerouslySkipEscape, escapeInject } from 'vite-plugin-ssr/server';

import type { PageContextServer } from './types';

const sheet = new ServerStyleSheet();

async function render(pageContext: PageContextServer) {
    const { Page, pageProps } = pageContext;

    // Step 3: Extract the styles as <style> tags
    let pageHtml;
    if (Page) {
        // For SSR pages
        pageHtml = ReactDOMServer.renderToString(
            <StyleSheetManager sheet={sheet.instance}>
                <GlobalStyle />
                <PageShell pageContext={pageContext}>
                    <Page {...pageProps} />
                </PageShell>
            </StyleSheetManager>,
        );
    } else {
        // For SPA pages
        pageHtml = '';
    }

    // Extract styles
    const styles = sheet.getStyleTags();

    // See https://vite-plugin-ssr.com/head
    const { documentProps, getDocumentProps } = pageContext.exports;

    const title = getDocumentProps?.(pageProps).title || documentProps?.title || 'Vite SSR app';
    const desc =
        getDocumentProps?.(pageProps).description ||
        documentProps?.description ||
        'App using Vite + vite-plugin-ssr';

    const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="/svg/logo.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
        <style>${styles}</style>
        <script src="https://giscus.app/client.js"
            data-repo="lainer77/readyfront-monorepo"
            data-repo-id="R_kgDOJ1cAlQ"
            data-category="Announcements"
            data-category-id="DIC_kwDOJ1cAlc4CYCUD"
            data-mapping="pathname"
            data-strict="0"
            data-reactions-enabled="1"
            data-emit-metadata="0"
            data-input-position="bottom"
            data-theme="preferred_color_scheme"
            data-lang="ko"
            crossorigin="anonymous"
            async>
        </script>
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
