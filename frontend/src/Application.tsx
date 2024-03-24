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
  AccountRoleE,
  AuthProvider,
} from '@context/AuthContext.tsx';
import {
  DashboardPage,
  ErrorPage,
  HomePage,
  MyApplicationsPage,
  NewApplicationPage,
} from '@pages/index.ts';
import {
  PrivateLayout,
  PublicLayout,
} from '@components/layout';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@theme/GlobalStyle.ts';
import theme from '@theme/theme.ts';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faCircleExclamation,
  faCircleNotch,
  faEye,
  faEyeSlash,
  faFileCirclePlus,
  faGraduationCap,
  faHouseUser,
  faPaperPlane,
  faRightFromBracket,
  faScroll,
  faSpinner,
  faUserGroup,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faBars,
  faCircleExclamation,
  faCircleNotch,
  faEye,
  faEyeSlash,
  faFileCirclePlus,
  faGraduationCap,
  faHouseUser,
  faPaperPlane,
  faRightFromBracket,
  faScroll,
  faSpinner,
  faUserGroup,
  faXmark,
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
    <Route element={<PublicLayout />} path={'/'}>
      <Route index element={<HomePage />} />
      <Route element={<div>PLACEHOLDER</div>} path={'/contact-guest'} />
    </Route>
    <Route>
      <Route element={<PrivateLayout allowedRoles={[AccountRoleE.STUDENT, AccountRoleE.MENTOR, AccountRoleE.ADMIN]} />}>
        <Route element={<DashboardPage />} path={'/dashboard'} />
      </Route>
      <Route element={<PrivateLayout allowedRoles={[AccountRoleE.STUDENT, AccountRoleE.MENTOR]} />}>
        <Route element={<div>PLACEHOLDER</div>} path={'/contact'} />
      </Route>
      <Route element={<PrivateLayout allowedRoles={[AccountRoleE.STUDENT]} />}>
        <Route element={<NewApplicationPage />} path={'/new-application'} />
        <Route element={<MyApplicationsPage />} path={'/my-applications'} />
      </Route>
      <Route element={<PrivateLayout allowedRoles={[AccountRoleE.MENTOR]} />}>
        <Route element={<div>PLACEHOLDER</div>} path={'/my-students'} />
        <Route element={<div>PLACEHOLDER</div>} path={'/my-student-applications'} />
      </Route>
      <Route element={<PrivateLayout allowedRoles={[AccountRoleE.ADMIN]} />}>
        <Route element={<div>PLACEHOLDER</div>} path={'/all-students'} />
        <Route element={<div>PLACEHOLDER</div>} path={'/all-mentors'} />
        <Route element={<div>PLACEHOLDER</div>} path={'/all-applications'} />
      </Route>
    </Route>
    <Route element={<div>PLACEHOLDER LAYOUT ELEMENT</div>}>
      <Route element={<div>PLACEHOLDER</div>} path={'/unauthorised'} />
      <Route element={<div>PLACEHOLDER</div>} path={'*'} />
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
