/* eslint-disable max-len */
/* eslint-disable react/jsx-max-props-per-line */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* external imports */
import { QueryClientProvider } from '@tanstack/react-query';
import { JSX } from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

/* logic imports */
import { AccountRoleValues, AuthProvider } from '@context/auth';

/* component, style imports */
import { PrivateLayout, PublicLayout } from '@components/layout';
import { ApplicationEdit, ApplicationView, Applications, Dashboard, Error, Home } from '@pages/common/index';
import { NewApplication } from '@pages/student/index';
import { GlobalStyle } from '@theme/global-style';
import { theme } from '@theme/theme';

/* configuration, utilities, constants imports */
import { queryClient } from '@configuration';

const router = createBrowserRouter(createRoutesFromElements(
  <Route errorElement={<Error />}>
    <Route path={'/'} element={<PublicLayout />}>
      <Route index element={<Home />} />
      <Route path={'contact'} element={<div>PLACEHOLDER</div>} />
    </Route>
    <Route>
      <Route element={<PrivateLayout allowedRoles={[AccountRoleValues.STUDENT, AccountRoleValues.MENTOR, AccountRoleValues.INSTITUTION_ADMIN, AccountRoleValues.SYSTEM_ADMIN]} />}>
        <Route path={'/dashboard'} element={<Dashboard />} />
        <Route path={'/applications'}>
          <Route index element={<Applications />} />
          <Route path={'edit/:uuid'} element={<ApplicationEdit />} />
          <Route path={'view/:uuid'} element={<ApplicationView />} />
        </Route>
        <Route path={'/account'} element={<div>ACCOUNT PLACEHOLDER</div>} />
        <Route path={'/messages'} element={<div>MESSAGES PLACEHOLDER</div>} />
      </Route>
      <Route element={<PrivateLayout allowedRoles={[AccountRoleValues.MENTOR, AccountRoleValues.STUDENT, AccountRoleValues.INSTITUTION_ADMIN]} />}>
        <Route path={'/feedback'} element={<div>FEEDBACK FORM PLACEHOLDER</div>} />
      </Route>
      <Route element={<PrivateLayout allowedRoles={[AccountRoleValues.STUDENT]} />}>
        <Route path={'/new-application'} element={<NewApplication />} />
      </Route>
      <Route element={<PrivateLayout allowedRoles={[AccountRoleValues.MENTOR]} />}>
        <Route path={'/my-students'} element={<div>MY STUDENTS PLACEHOLDER</div>} />
      </Route>
      <Route element={<PrivateLayout allowedRoles={[AccountRoleValues.INSTITUTION_ADMIN]} />}>
        <Route path={'/institution-students'} element={<div>INSTITUTION STUDENTS PLACEHOLDER</div>} />
        <Route path={'/institution-mentors'} element={<div>INSTITUTION MENTORS PLACEHOLDER</div>} />
        <Route path={'/my-institution'} element={<div>MY INSTITUTION PLACEHOLDER</div>} />
      </Route>
      <Route element={<PrivateLayout allowedRoles={[AccountRoleValues.SYSTEM_ADMIN]} />}>
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

export const DaigakuReactApplication = (): JSX.Element => {
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
