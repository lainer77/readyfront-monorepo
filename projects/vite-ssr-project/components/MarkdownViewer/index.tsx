import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

export { MarkdownViewer };

function MarkdownViewer({ children }: { children: null | string | undefined }) {
    return (
        <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
            {children}
        </ReactMarkdown>
    );
}
