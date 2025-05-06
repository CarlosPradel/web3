import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';

import { BrowserRouter } from 'react-router-dom';
import RouterConfig from './navigation/RouterConfig.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <RouterConfig />
    </BrowserRouter>
  </StrictMode>
);
