import React from 'react';

export type IconName = 'scale' | 'chat' | 'prediction' | 'research' | 'upload' | 'bias' | 'send' | 'user' | 'back';

interface IconProps {
  name: IconName;
  className?: string;
}

// FIX: Replaced JSX.Element with React.ReactElement to resolve TypeScript error.
const ICONS: Record<IconName, React.ReactElement> = {
  scale: <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-19.5 0c.99-.203 1.99-.377 3-.52M6.75 7.5h10.5M6.75 7.5a2.25 2.25 0 01-2.25-2.25V4.5a2.25 2.25 0 012.25-2.25h10.5a2.25 2.25 0 012.25 2.25v.75a2.25 2.25 0 01-2.25 2.25h-10.5z" />,
  chat: <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.72 3.72a1.125 1.125 0 01-1.59 0l-3.72-3.72A1.125 1.125 0 013.75 16.5V6.25c0-1.136.847-2.1 1.98-2.193l3.72-3.72a1.125 1.125 0 011.59 0l3.72 3.72c.884.284 1.5 1.128 1.5 2.097zM14.25 8.25c0-.621.504-1.125 1.125-1.125H15a1.125 1.125 0 011.125 1.125v.188c0 .621-.504 1.125-1.125 1.125h-.625a1.125 1.125 0 01-1.125-1.125v-.188zM8.25 8.25c0-.621.504-1.125 1.125-1.125H9a1.125 1.125 0 011.125 1.125v.188c0 .621-.504 1.125-1.125 1.125H9a1.125 1.125 0 01-1.125-1.125v-.188z" />,
  prediction: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h12A2.25 2.25 0 0020.25 14.25V3M3.75 3l-1.5-1.5M20.25 3l1.5-1.5M3.75 3H7.5m12.75 0H16.5m0 0V.75M10.5 6a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM10.5 18a1.5 1.5 0 00-1.5 1.5v.75a1.5 1.5 0 001.5 1.5h3a1.5 1.5 0 001.5-1.5v-.75a1.5 1.5 0 00-1.5-1.5h-3z" />,
  research: <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />,
  upload: <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.49-8.755 4.5 4.5 0 018.255-2.31A4.5 4.5 0 0118.75 14.25" />,
  bias: <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />,
  send: <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />,
  user: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />,
  back: <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />,
};

export const Icon: React.FC<IconProps> = ({ name, className = 'w-6 h-6' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      {ICONS[name]}
    </svg>
  );
};