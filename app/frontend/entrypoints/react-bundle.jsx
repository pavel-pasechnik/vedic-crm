import 'vite/modulepreload-polyfill';

import { createRoot } from 'react-dom/client';

import HelloReact from '../components/HelloReact';

document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('react-root');

  if (rootElement) {
    const root = createRoot(rootElement);

    root.render(<HelloReact />);
  }
});
