import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import { queryClient } from '@configuration';
import {
  AccountRoleE,
  AuthProvider,
} from '@context/AuthContext.tsx';
import {
  Application,
  Applications,
  Dashboard,
  Error,
  Home,
  NewApplication,
} from '@pages/index.ts';
import {
  PrivateLayout,
  PublicLayout,
} from '@components/layout';
import GlobalStyle from '@theme/GlobalStyle.ts';
import theme from '@theme/theme.ts';

const router = createBrowserRouter(createRoutesFromElements(
  <Route errorElement={<Error />}>
    <Route path={'/'} element={<PublicLayout />}>
      <Route index element={<Home />} />
      <Route path={'contact'} element={<div>PLACEHOLDER</div>} />
    </Route>
    <Route>
      <Route element={<PrivateLayout allowedRoles={[AccountRoleE.STUDENT, AccountRoleE.MENTOR, AccountRoleE.INSTITUTION_ADMIN, AccountRoleE.SYSTEM_ADMIN]} />}>
        <Route path={'/dashboard'} element={<Dashboard />} />
        <Route path={'/applications'}>
          <Route index element={<Applications />} />
          <Route path={':uuid'} element={<Application />} />
        </Route>
        <Route path={'/account'} element={<div>ACCOUNT PLACEHOLDER</div>} />
        <Route path={'/messages'} element={<div>MESSAGES PLACEHOLDER</div>} />
      </Route>
      <Route element={<PrivateLayout allowedRoles={[AccountRoleE.MENTOR, AccountRoleE.STUDENT, AccountRoleE.INSTITUTION_ADMIN]} />}>
        <Route path={'/feedback'} element={<div>FEEDBACK FORM PLACEHOLDER</div>} />
      </Route>
      <Route element={<PrivateLayout allowedRoles={[AccountRoleE.STUDENT]} />}>
        <Route path={'/new-application'} element={<NewApplication />} />
      </Route>
      <Route element={<PrivateLayout allowedRoles={[AccountRoleE.MENTOR]} />}>
        <Route path={'/my-students'} element={<div>MY STUDENTS PLACEHOLDER</div>} />
      </Route>
      <Route element={<PrivateLayout allowedRoles={[AccountRoleE.INSTITUTION_ADMIN]} />}>
        <Route path={'/institution-students'} element={<div>INSTITUTION STUDENTS PLACEHOLDER</div>} />
        <Route path={'/institution-mentors'} element={<div>INSTITUTION MENTORS PLACEHOLDER</div>} />
        <Route path={'/my-institution'} element={<div>MY INSTITUTION PLACEHOLDER</div>} />
      </Route>
      <Route element={<PrivateLayout allowedRoles={[AccountRoleE.SYSTEM_ADMIN]} />}>
        <Route path={'/all-students'} element={<div>ALL STUDENTS PLACEHOLDER</div>} />
        <Route path={'/all-mentors'} element={<div>ALL MENTORS PLACEHOLDER</div>} />
        <Route path={'/system'} element={<div>SYSTEM PLACEHOLDER</div>} />
      </Route>
    </Route>
    <Route element={<div>PLACEHOLDER LAYOUT ELEMENT</div>}>
      <Route path={'/unauthorised'} element={<div>NO AUTH PLACEHOLDER</div>} />
      <Route path={'*'} element={<div>404 PLACEHOLDER</div>} />
    </Route>
  </Route>,
));

const DaigakuReactApplication = () => {
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

export default DaigakuReactApplication;
