// `usePageContext` allows us to access `pageContext` in any React component.
// See https://vite-plugin-ssr.com/pageContext-anywhere

import React, { useContext } from 'react';

import type { PageContext } from './types';

export { PageContextProvider };
// eslint-disable-next-line react-refresh/only-export-components
export { usePageContext };

const Context = React.createContext<PageContext>(undefined as unknown as PageContext);

function PageContextProvider({
    children,
    pageContext,
}: {
    children: React.ReactNode;
    pageContext: PageContext;
}) {
    return <Context.Provider value={pageContext}>{children}</Context.Provider>;
}

function usePageContext() {
    const pageContext = useContext(Context);
    return pageContext;
}
