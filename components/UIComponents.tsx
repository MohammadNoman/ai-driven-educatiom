import React from 'react';
import { CodeSnippet, MaturityLevel } from '../types';
import { Terminal, Copy, Check, BookOpen, Info, LayoutTemplate, Cpu, Network, Users, GitBranch } from 'lucide-react';

export const Badge: React.FC<{ children: React.ReactNode; color?: 'blue' | 'green' | 'yellow' | 'red' }> = ({ children, color = 'blue' }) => {
  const colors = {
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    green: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800',
    yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800',
    red: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[color]} mx-1`}>
      {children}
    </span>
  );
};

export const CodeBlock: React.FC<{ snippet: CodeSnippet }> = ({ snippet }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-[#282a36] shadow-sm group">
      {snippet.filename && (
        <div className="flex items-center justify-between px-4 py-2 bg-[#21222c] border-b border-gray-700">
          <span className="text-xs text-gray-400 font-mono">{snippet.filename}</span>
          <span className="text-xs text-gray-500 uppercase">{snippet.language}</span>
        </div>
      )}
      <div className="relative">
        <button
          onClick={handleCopy}
          className="absolute right-2 top-2 p-2 rounded-md text-gray-400 hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Copy code"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
        </button>
        <pre className="p-4 overflow-x-auto text-sm font-mono text-gray-200 leading-relaxed">
          <code>{snippet.code}</code>
        </pre>
      </div>
    </div>
  );
};

export const MaturityTable: React.FC<{ levels: MaturityLevel[] }> = ({ levels }) => {
  return (
    <div className="my-8 overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Level</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stage</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Criteria</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-[#1b1b1d] divide-y divide-gray-200 dark:divide-gray-700">
          {levels.map((level) => (
            <tr key={level.level} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-primary-600 dark:text-primary-400">
                Level {level.level}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                {level.name}
                <p className="text-xs text-gray-500 dark:text-gray-400 font-normal mt-1 whitespace-normal max-w-xs">{level.description}</p>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                <ul className="list-disc list-inside space-y-1">
                  {level.criteria.map((c, i) => (
                    <li key={i} className="text-xs md:text-sm">{c}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const Admonition: React.FC<{ type: 'note' | 'tip' | 'info' | 'warning' | 'danger'; title?: string; children: React.ReactNode }> = ({ type, title, children }) => {
  const styles = {
    note: 'border-gray-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100',
    tip: 'border-green-500 bg-green-50 dark:bg-green-900/20 text-gray-900 dark:text-gray-100',
    info: 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-gray-900 dark:text-gray-100',
    warning: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 text-gray-900 dark:text-gray-100',
    danger: 'border-red-500 bg-red-50 dark:bg-red-900/20 text-gray-900 dark:text-gray-100',
  };

  const icons = {
    note: <BookOpen size={18} className="text-gray-600 dark:text-gray-300" />,
    tip: <Check size={18} className="text-green-600 dark:text-green-300" />,
    info: <Info size={18} className="text-blue-600 dark:text-blue-300" />,
    warning: <Info size={18} className="text-yellow-600 dark:text-yellow-300" />,
    danger: <Info size={18} className="text-red-600 dark:text-red-300" />,
  };

  return (
    <div className={`my-6 p-4 border-l-4 rounded-r-md ${styles[type]}`}>
      <div className="flex items-center mb-2 font-bold uppercase text-xs opacity-80">
        <span className="mr-2">{icons[type]}</span>
        {title || type}
      </div>
      <div className="text-sm leading-relaxed opacity-90">
        {children}
      </div>
    </div>
  );
};

export const MermaidDiagram: React.FC<{ definition: string; caption?: string }> = ({ definition, caption }) => {
  // In a real Docusaurus app this would render the diagram.
  // Here we simulate it with a styled block.
  return (
    <div className="my-8 text-center">
      <div className="inline-block p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md max-w-full overflow-x-auto">
        <div className="font-mono text-xs text-left text-gray-400 mb-2 border-b border-gray-200 dark:border-gray-700 pb-2">Mermaid Diagram Preview</div>
        <pre className="text-left text-xs text-blue-600 dark:text-blue-400 whitespace-pre font-mono">
          {definition}
        </pre>
        <div className="mt-4 flex justify-center items-center text-gray-400">
           <span className="text-sm italic flex items-center gap-2">
             <LayoutTemplate size={16}/> Diagram Visualization
           </span>
        </div>
      </div>
      {caption && <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 italic">{caption}</p>}
    </div>
  );
};
