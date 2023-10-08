// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ['pageProps', 'urlPathname', 'documentProps'];

import { GlobalStyle } from '#components/GlobalStyle';
import { PageShell } from '#components/PageShell';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { dangerouslySkipEscape, escapeInject } from 'vite-plugin-ssr/server';

import type { PageContextServer } from './types';

export async function render(pageContext: PageContextServer) {
    const { Page, pageProps } = pageContext;
    const sheet = new ServerStyleSheet();

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

    const title = getDocumentProps?.(pageProps).title || documentProps?.title || '';
    const desc = getDocumentProps?.(pageProps).description || documentProps?.description || '';

    const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="/svg/RF.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
        <style>${dangerouslySkipEscape(styles)}</style>
      </head>
      <body>
        <div id="react-root">${dangerouslySkipEscape(pageHtml)}</div>
        <div id="react-portal-wrapper"></div>
        
      </body>
    </html>`;

    return {
        documentHtml,
        pageContext: {
            // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
        },
    };
}
