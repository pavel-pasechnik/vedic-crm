import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'normalize.css/normalize.css';
import '../stylesheets/application.scss';

import 'vite/modulepreload-polyfill';

import * as Sentry from '@sentry/react';
import { hydrateRoot } from 'react-dom/client';

import HelloReact from '../components/HelloReact';

Sentry.init({
  // eslint-disable-next-line n/prefer-global/process
  dsn: process.env.VITE_SENTRY_DSN_REACT,
  sendDefaultPii: true,
});

const rootElement = document.getElementById('root');

if (rootElement) {
  hydrateRoot(rootElement, <HelloReact />);
}
