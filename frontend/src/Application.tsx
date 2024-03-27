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
  faEnvelope,
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
  faEnvelope,
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
    <Route path={'/'} element={<PublicLayout />}>
      <Route index element={<HomePage />} />
      <Route path={'contact'} element={<div>PLACEHOLDER</div>} />
    </Route>
    <Route>
      <Route element={<PrivateLayout allowedRoles={[AccountRoleE.STUDENT, AccountRoleE.MENTOR, AccountRoleE.ADMIN]} />}>
        <Route path={'/dashboard'} element={<DashboardPage />} />
        <Route path={'/messages'} element={<div>MESSAGES PLACEHOLDER</div>} />
      </Route>
      <Route element={<PrivateLayout allowedRoles={[AccountRoleE.STUDENT]} />}>
        <Route path={'/new-application'} element={<NewApplicationPage />} />
        <Route path={'/my-applications'}>
          <Route index element={<MyApplicationsPage />} />
          <Route path={':id'} element={<div>APPLICATION PLACEHOLDER</div>} />
        </Route>
      </Route>
      <Route element={<PrivateLayout allowedRoles={[AccountRoleE.MENTOR]} />}>
        <Route path={'/my-students'} element={<div>PLACEHOLDER</div>} />
        <Route path={'/my-student-applications'} element={<div>PLACEHOLDER</div>} />
      </Route>
      <Route element={<PrivateLayout allowedRoles={[AccountRoleE.ADMIN]} />}>
        <Route path={'/all-students'} element={<div>PLACEHOLDER</div>} />
        <Route path={'/all-mentors'} element={<div>PLACEHOLDER</div>} />
        <Route path={'/all-applications'} element={<div>PLACEHOLDER</div>} />
      </Route>
    </Route>
    <Route element={<div>PLACEHOLDER LAYOUT ELEMENT</div>}>
      <Route path={'/unauthorised'} element={<div>PLACEHOLDER</div>} />
      <Route path={'*'} element={<div>PLACEHOLDER</div>} />
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
