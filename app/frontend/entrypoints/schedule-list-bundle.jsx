import 'vite/modulepreload-polyfill';

import { createRoot } from 'react-dom/client';

import ScheduleList from '../components/ScheduleList';

document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('schedule-root');

  if (rootElement) {
    const root = createRoot(rootElement);

    root.render(<ScheduleList />);
  }
});
