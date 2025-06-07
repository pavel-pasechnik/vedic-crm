import process from 'process';

import * as Sentry from '@sentry/react';
import { createRoot } from 'react-dom/client';

import HelloReact from '../components/HelloReact';
import '../stylesheets/application.scss';

Sentry.init({
  dsn: process.env.SENTRY_DSN_REACT,
  sendDefaultPii: true,
});

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(<HelloReact />);
