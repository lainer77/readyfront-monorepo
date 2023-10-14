import express from 'express';

import { cdnRoute as cdn } from './cdn';

const getRoute = (endpoint: string) => {
    const path = endpoint.replace('/api/', '');
    const routes = { cdn };
    const deps = path.split('/') as (keyof typeof routes)[];

    return routes[deps[0]];
};

export const setupApiRoutes = (app: express.Application) => {
    app.all('/api/*', async (req, res) => {
        if (req.path.startsWith('/api/')) {
            const apiEndpoint = req.path;
            const route = getRoute(apiEndpoint);
            if (!route) {
                res.status(404).send('Not Found');
                return;
            }
            route(req, res);
        }
    });
};
