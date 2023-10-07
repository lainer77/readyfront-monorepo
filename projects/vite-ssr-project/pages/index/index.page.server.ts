import axios from 'axios';

export { onBeforeRender };
const apiUrl = process.env.VITE_API_GATEWAY_URL || process.env.VITE_HOST;
async function onBeforeRender() {
    // `.page.server.js` files always run in Node.js; we could use SQL/ORM queries here.
    const experience = await axios.get(`${apiUrl}/@api/cdn/html/experience.html`);
    const introduction = await axios.get(`${apiUrl}/@api/cdn/html/introduction.html`);
    const skills = await axios.get(`${apiUrl}/@api/cdn/html/skills.html`);
    // We make `movies` available as `pageContext.pageProps.movies`
    const pageProps = {
        experience: experience.data,
        introduction: introduction.data,
        skills: skills.data,
    };
    return {
        pageContext: {
            pageProps,
        },
    };
}
