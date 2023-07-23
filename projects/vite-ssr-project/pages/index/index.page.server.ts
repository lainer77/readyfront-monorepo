import axios from 'axios';

export { onBeforeRender };

async function onBeforeRender() {
    // `.page.server.js` files always run in Node.js; we could use SQL/ORM queries here.
    const response = await axios.get('http://localhost:3000/@api/cdn/html/home.html');

    // We make `movies` available as `pageContext.pageProps.movies`
    const pageProps = { data: response.data };
    return {
        pageContext: {
            pageProps,
        },
    };
}
