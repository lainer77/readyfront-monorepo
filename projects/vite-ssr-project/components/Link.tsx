import { usePageContext } from '../hooks/usePageContext';

export { Link };

function Link(props: { children: React.ReactNode; className?: string; href?: string }) {
    const pageContext = usePageContext();
    const className = [props.className, pageContext.urlPathname === props.href && 'is-active']
        .filter(Boolean)
        .join(' ');
    return <a {...props} className={className} />;
}
