import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";


const MarkdownRenderer = ({ content }) => (
  <div className="prose prose-invert prose-lg max-w-full text-indigo-100">
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({node, children, ...props}) => {
          if (!children || children.length === 0 || (children.length === 1 && children[0] === '')) return null;
          return <h1 className="text-4xl font-extrabold mt-8 mb-4 leading-tight" {...props}>{children}</h1>;
        },
        h2: ({node, children, ...props}) => {
          if (!children || children.length === 0 || (children.length === 1 && children[0] === '')) return null;
          return <h2 className="text-3xl font-bold mt-7 mb-3 leading-snug" {...props}>{children}</h2>;
        },
        h3: ({node, children, ...props}) => {
          if (!children || children.length === 0 || (children.length === 1 && children[0] === '')) return null;
          return <h3 className="text-2xl font-semibold mt-6 mb-2 leading-snug" {...props}>{children}</h3>;
        },
        ul: ({node, ...props}) => <ul className="list-disc ml-8 mb-4 space-y-1" {...props} />,
        ol: ({node, ...props}) => <ol className="list-decimal ml-8 mb-4 space-y-1" {...props} />,
        li: ({node, ...props}) => <li className="mb-1 pl-1" {...props} />,
        p: ({node, ...props}) => <p className="mb-4 leading-relaxed" {...props} />,
        strong: ({node, ...props}) => <strong className="font-bold text-indigo-200" {...props} />,
        em: ({node, ...props}) => <em className="italic text-indigo-300" {...props} />,
        table: ({node, ...props}) => (
          <div className="overflow-x-auto my-6">
            <table className="min-w-full border border-indigo-400 bg-gray-900 text-indigo-100 rounded-lg">
              {props.children}
            </table>
          </div>
        ),
        thead: ({node, ...props}) => <thead className="bg-indigo-800 text-indigo-100" {...props} />,
        tbody: ({node, ...props}) => <tbody {...props} />,
        tr: ({node, ...props}) => <tr className="border-b border-indigo-400" {...props} />,
        th: ({node, ...props}) => <th className="px-4 py-2 font-bold text-left border-r border-indigo-400" {...props} />,
        td: ({node, ...props}) => <td className="px-4 py-2 border-r border-indigo-400" {...props} />,
        code({node, inline, className, children, ...props}) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline ? (
            <SyntaxHighlighter
              style={oneDark}
              language={match ? match[1] : ""}
              PreTag="div"
              className="rounded-lg my-4"
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className="bg-gray-800 px-1 py-0.5 rounded text-pink-400" {...props}>{children}</code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  </div>
);

export default MarkdownRenderer;
