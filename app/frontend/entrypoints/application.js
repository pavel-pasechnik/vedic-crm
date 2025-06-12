import process from 'process';

import * as Sentry from '@sentry/react';
import { hydrateRoot } from 'react-dom/client';

import HelloReact from '../components/HelloReact';
import '../stylesheets/application.scss';

Sentry.init({
  dsn: process.env.SENTRY_DSN_REACT,
  sendDefaultPii: true,
});

const rootElement = document.getElementById('root');

if (rootElement) {
  hydrateRoot(rootElement, <HelloReact />);
}
