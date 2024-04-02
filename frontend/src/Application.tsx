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
  ApplicationPage,
  ApplicationsPage,
  DashboardPage,
  ErrorPage,
  HomePage,
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
  faGears,
  faGraduationCap,
  faHouseUser,
  faPaperPlane,
  faRightFromBracket,
  faRotateRight,
  faScroll,
  faSort,
  faSpinner,
  faTable,
  faUserGroup,
  faWrench,
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
  faGears,
  faGraduationCap,
  faHouseUser,
  faPaperPlane,
  faRightFromBracket,
  faRotateRight,
  faScroll,
  faSort,
  faSpinner,
  faTable,
  faUserGroup,
  faWrench,
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
        <Route path={'/applications'}>
          <Route index element={<ApplicationsPage />} />
          <Route path={':id'} element={<ApplicationPage />} />
        </Route>
        <Route path={'/messages'} element={<div>PLACEHOLDER</div>} />
      </Route>
      <Route element={<PrivateLayout allowedRoles={[AccountRoleE.MENTOR, AccountRoleE.STUDENT]} />}>
        <Route path={'/feedback'} element={<div>PLACEHOLDER</div>} />
      </Route>
      <Route element={<PrivateLayout allowedRoles={[AccountRoleE.STUDENT]} />}>
        <Route path={'/new-application'} element={<NewApplicationPage />} />
      </Route>
      <Route element={<PrivateLayout allowedRoles={[AccountRoleE.MENTOR]} />}>
        <Route path={'/my-students'} element={<div>PLACEHOLDER</div>} />
      </Route>
      <Route element={<PrivateLayout allowedRoles={[AccountRoleE.ADMIN]} />}>
        <Route path={'/all-students'} element={<div>PLACEHOLDER</div>} />
        <Route path={'/all-mentors'} element={<div>PLACEHOLDER</div>} />
        <Route path={'/system'} element={<div>PLACEHOLDER</div>} />
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
