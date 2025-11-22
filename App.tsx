import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Routes, Navigate, useLocation, Link } from 'react-router-dom';
import { BOOK_CONTENT, SIDEBAR_ITEMS } from './constants';
import { Menu, X, Moon, Sun, Search, Github, MessageSquare, ChevronRight, ChevronDown, ExternalLink, Cpu } from 'lucide-react';
import { SidebarItem } from './types';
import { ChatWidget } from './src/components/ChatWidget';

const SidebarLink: React.FC<{ item: any, isActive: boolean, depth?: number }> = ({ item, isActive, depth = 0 }) => {
    const [isOpen, setIsOpen] = useState(true);
    const hasChildren = item.items && item.items.length > 0;

    if (hasChildren) {
        return (
            <div className="mb-1">
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className={`flex items-center w-full px-3 py-1.5 text-sm font-medium transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-white/5 ${depth === 0 ? 'text-gray-900 dark:text-gray-100 mt-4 mb-2 font-bold' : 'text-gray-600 dark:text-gray-400'}`}
                >
                    <span className="flex-1 text-left">{item.label}</span>
                    {depth === 0 && (
                        isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                    )}
                </button>
                {isOpen && (
                    <div className="ml-0 space-y-0.5">
                        {item.items.map((sub: any) => (
                            <SidebarLink key={sub.path || sub.label} item={sub} isActive={isActive} depth={depth + 1} />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    const activeClass = isActive 
        ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/10 font-medium border-r-2 border-primary-500' 
        : 'text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-300 hover:bg-gray-100 dark:hover:bg-white/5';

    return (
        <Link 
            to={item.path} 
            className={`block px-4 py-2 text-sm transition-colors rounded-l-md ${activeClass}`}
        >
            {item.label}
        </Link>
    );
};

const Navbar = ({ toggleSidebar, isDark, toggleTheme }: any) => {
    return (
        <nav className="fixed top-0 w-full z-40 bg-white/90 dark:bg-[#1b1b1d]/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 h-16 flex items-center px-4 lg:px-6 justify-between">
            <div className="flex items-center gap-4">
                <button onClick={toggleSidebar} className="lg:hidden p-2 text-gray-600 dark:text-gray-300">
                    <Menu size={20} />
                </button>
                <Link to="/" className="flex items-center gap-2 font-bold text-xl text-gray-900 dark:text-white">
                    <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-transparent bg-clip-text">Panaversity</span>
                    <span className="hidden sm:inline font-normal text-gray-500 dark:text-gray-400">| AI-Driven Education</span>
                </Link>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
                <div className="hidden md:flex items-center gap-4 text-sm font-medium text-gray-600 dark:text-gray-300">
                    <a href="#" className="hover:text-primary-500">Docs</a>
                    <a href="#" className="hover:text-primary-500">Blog</a>
                    <a href="#" className="hover:text-primary-500">Community</a>
                </div>
                <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2 hidden md:block"></div>
                <button className="p-2 text-gray-500 hover:text-primary-500 transition-colors">
                    <Github size={20} />
                </button>
                <button onClick={toggleTheme} className="p-2 text-yellow-500 hover:text-yellow-400 transition-colors">
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button className="p-2 text-gray-500 md:hidden">
                    <Search size={20} />
                </button>
                <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg text-sm text-gray-500 dark:text-gray-400 border border-transparent hover:border-primary-500 cursor-pointer transition-all">
                   <Search size={14} className="mr-2" /> Search (⌘K)
                </div>
            </div>
        </nav>
    );
};

const TableOfContents = ({ toc }: { toc?: { id: string, text: string, level: number }[] }) => {
    if (!toc || toc.length === 0) return null;
    
    return (
        <div className="hidden xl:block w-64 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto pr-4">
            <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4 pl-3">On this page</h4>
            <ul className="space-y-1 border-l border-gray-200 dark:border-gray-800">
                {toc.map((item) => (
                    <li key={item.id}>
                        <a 
                            href={`#${item.id}`} 
                            className={`block pl-3 py-1 text-xs leading-5 border-l-2 border-transparent hover:border-primary-500 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${item.level > 2 ? 'ml-2' : ''}`}
                        >
                            {item.text}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const AskPage = () => (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-8">
        <div className="w-full max-w-4xl bg-white dark:bg-[#242526] rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden h-[600px] flex flex-col">
            <div className="bg-gradient-to-r from-primary-600 to-blue-700 p-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    <h2 className="font-bold">Panaversity AI Assistant</h2>
                </div>
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Beta</span>
            </div>
            <div className="flex-1 bg-gray-50 dark:bg-[#1b1b1d] flex flex-col items-center justify-center text-gray-500 gap-4">
                <div className="p-4 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-600">
                    <Cpu size={48} />
                </div>
                <p className="text-lg font-medium">How can I help you learn today?</p>
                <div className="flex gap-2">
                    <button className="px-4 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 transition-colors">Explain Spec-Kit Plus</button>
                    <button className="px-4 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 transition-colors">What is Co-Learning?</button>
                </div>
                <p className="text-xs mt-8 opacity-50">(Use the floating widget on the right)</p>
            </div>
        </div>
    </div>
);

const DocPage = ({ content }: { content: any }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [content.id]);

    return (
        <div className="flex w-full max-w-7xl mx-auto">
            <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-8">
                <div className="prose dark:prose-dark max-w-3xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">{content.title}</h1>
                    {content.description && <p className="text-xl text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">{content.description}</p>}
                    <hr className="border-gray-200 dark:border-gray-800 my-8" />
                    <div className="text-gray-700 dark:text-gray-300 leading-7">
                        {content.content}
                    </div>
                    <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex justify-between text-sm font-medium text-primary-600 dark:text-primary-400">
                         <a href="#" className="flex items-center hover:underline"><ExternalLink size={14} className="mr-1"/> Edit this page on GitHub</a>
                         <span className="text-gray-400">Last updated by Panaversity Bot</span>
                    </div>
                </div>
            </main>
            <TableOfContents toc={content.toc} />
        </div>
    );
};

export default function App() {
    const [isDark, setIsDark] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    // Custom location hook wrapper to handle route matching
    const RouteHandler = () => {
        const location = useLocation();
        const currentPath = location.pathname;
        
        // Find content based on path
        const pageContent = BOOK_CONTENT.find(c => c.path === currentPath);

        return (
            <div className="pt-16 flex min-h-screen">
                 {/* Sidebar */}
                <aside className={`fixed inset-y-0 left-0 z-30 w-72 bg-white dark:bg-[#161618] border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out pt-16 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                    <div className="h-full overflow-y-auto p-4">
                        <div className="space-y-1">
                            {SIDEBAR_ITEMS.map((item, idx) => (
                                <SidebarLink key={idx} item={item} isActive={false /* Logic simplified for brevity */} />
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <div className={`flex-1 flex flex-col min-h-0 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-72' : ''} ml-0`}>
                     {currentPath === '/ask' ? (
                         <AskPage />
                     ) : pageContent ? (
                         <DocPage content={pageContent} />
                     ) : (
                         <div className="p-12 text-center">
                             <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">404 - Page Not Found</h2>
                             <Link to="/docs/preface" className="text-primary-500 hover:underline">Go to Preface</Link>
                         </div>
                     )}
                     
                     <footer className="bg-gray-50 dark:bg-[#161618] border-t border-gray-200 dark:border-gray-800 py-12 px-6 mt-auto">
                         <div className="max-w-7xl mx-auto text-center">
                             <div className="mb-4 font-bold text-lg text-gray-900 dark:text-white">Panaversity</div>
                             <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                 Copyright © {new Date().getFullYear()} Panaversity. Built with Docusaurus (Simulated) & Spec-Kit Plus.
                             </p>
                             <div className="flex justify-center gap-4 text-gray-400">
                                 <Github size={20} className="hover:text-white cursor-pointer"/>
                                 <ExternalLink size={20} className="hover:text-white cursor-pointer"/>
                             </div>
                         </div>
                     </footer>
                </div>
                <ChatWidget />
            </div>
        );
    }

    return (
        <HashRouter>
            <Navbar toggleSidebar={toggleSidebar} isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
            <Routes>
                <Route path="/" element={<Navigate to="/docs/preface" replace />} />
                <Route path="*" element={<RouteHandler />} />
            </Routes>
        </HashRouter>
    );
}
