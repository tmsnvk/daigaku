import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import {
  ErrorPage,
  HomePage,
} from '@pages/index.ts';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@theme/GlobalStyle.ts';
import theme from '@theme/theme.ts';
import './index.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircleExclamation, faCircleNotch, faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { PrivateRoutes } from '@components/layout';
import { AuthProvider } from '@context/AuthContext.tsx';
library.add(faCircleExclamation, faCircleNotch, faEye, faEyeSlash, faSpinner);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      enabled: true,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  },
});

const router = createBrowserRouter(createRoutesFromElements(

  <Route errorElement={<ErrorPage />}>
    <Route path={'/'}>
      <Route index element={<HomePage />} />
    </Route>
    <Route>
      <Route element={<PrivateRoutes />}>
        <Route element={<div>DUMMY DASHBOARD</div>} path={'/dashboard'} />
      </Route>
    </Route>
  </Route>,
));

const Application = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Application;
