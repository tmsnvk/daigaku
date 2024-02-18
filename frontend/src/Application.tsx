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
import { AuthProvider } from '@context/AuthContext.tsx';
import {
  ErrorPage,
  HomePage,
} from '@pages/index.ts';
import {
  NoAuthNavbar,
  PrivateRoutes,
} from '@components/layout';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@theme/GlobalStyle.ts';
import theme from '@theme/theme.ts';
import './index.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCircleExclamation,
  faCircleNotch,
  faEye, faEyeSlash,
  faFileCirclePlus,
  faGraduationCap,
  faPaperPlane,
  faScroll,
  faSpinner,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
library.add(
  faCircleExclamation,
  faCircleNotch,
  faEye,
  faEyeSlash,
  faFileCirclePlus,
  faGraduationCap,
  faPaperPlane,
  faScroll,
  faSpinner,
  faUserGroup,
);

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
    <Route element={<NoAuthNavbar />} path={'/'}>
      <Route index element={<HomePage />} />
      <Route element={<div>CONTACT PAGE PLACEHOLDER</div>} path={'/contact'} />
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
