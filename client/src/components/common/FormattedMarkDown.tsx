import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type FormattedMarkDownProps = {
  text: string | undefined;
};
const FormattedMarkDown = ({ text }: FormattedMarkDownProps) => {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      className="break-words text-base leading-relaxed"
      components={{
        pre: ({ children }) => (
          <pre className="overflow-x-auto p-4 bg-muted rounded-md my-4">
            {children}
          </pre>
        ),
        code: ({ children }) => (
          <code className="overflow-x-auto whitespace-pre-wrap bg-muted px-1.5 py-0.5 rounded">
            {children}
          </code>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto my-4 border rounded-md">
            <table className="w-full">{children}</table>
          </div>
        ),
        p: ({ children }) => <p className="my-4 leading-7">{children}</p>,
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-semibold mt-6 mb-3">{children}</h2>
        ),
        ul: ({ children }) => (
          <ul className="list-disc pl-6 my-4 space-y-2">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal pl-6 my-4 space-y-2">{children}</ol>
        ),
      }}
    >
      {text}
    </Markdown>
  );
};

export default FormattedMarkDown;
