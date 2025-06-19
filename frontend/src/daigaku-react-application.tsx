/* eslint-disable max-len */
/* eslint-disable react/jsx-max-props-per-line */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { QueryClientProvider } from '@tanstack/react-query';
import { JSX } from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

/* logic imports */
import { AuthProvider, ToastProvider } from '@daigaku/context';
import { useCoreQueryClient } from '@daigaku/hooks';
import { TranslationProvider } from '@daigaku/providers';

/* component imports */
import { PrivateLayout, PublicLayout } from '@daigaku/components/layout';
import { ApplicationEdit, ApplicationView, Applications, Dashboard, Error, Home } from '@daigaku/pages/common';
import { NewApplication } from '@daigaku/pages/student';

/* interface, type imports */
import { UserRoles } from '@daigaku/common-types';

const router = createBrowserRouter(createRoutesFromElements(
  <Route errorElement={<Error />}>
    <Route path={'/'} element={<PublicLayout />}>
      <Route index element={<Home />} />
      <Route path={'contact'} element={<div>PLACEHOLDER</div>} />
    </Route>
    <Route>
      <Route
        element={
          <PrivateLayout allowedRoles={[UserRoles.ROLE_STUDENT, UserRoles.ROLE_MENTOR, UserRoles.ROLE_INSTITUTION_ADMIN, UserRoles.ROLE_SYSTEM_ADMIN]} />}
      >
        <Route path={'/dashboard'} element={<Dashboard />} />
        <Route path={'/applications'}>
          <Route index element={<Applications />} />
          <Route path={'edit/:uuid'} element={<ApplicationEdit />} />
          <Route path={'view/:uuid'} element={<ApplicationView />} />
        </Route>
        <Route path={'/account'} element={<div>ACCOUNT PLACEHOLDER</div>} />
        <Route path={'/messages'} element={<div>MESSAGES PLACEHOLDER</div>} />
      </Route>
      <Route
        element={
          <PrivateLayout allowedRoles={[UserRoles.ROLE_MENTOR, UserRoles.ROLE_STUDENT, UserRoles.ROLE_INSTITUTION_ADMIN]} />}
      >
        <Route path={'/feedback'} element={<div>FEEDBACK FORM PLACEHOLDER</div>} />
      </Route>
      <Route element={<PrivateLayout allowedRoles={[UserRoles.ROLE_STUDENT]} />}>
        <Route path={'/new-application'} element={<NewApplication />} />
      </Route>
      <Route element={<PrivateLayout allowedRoles={[UserRoles.ROLE_MENTOR]} />}>
        <Route path={'/my-students'} element={<div>MY STUDENTS PLACEHOLDER</div>} />
      </Route>
      <Route element={<PrivateLayout allowedRoles={[UserRoles.ROLE_INSTITUTION_ADMIN]} />}>
        <Route path={'/institution-students'} element={<div>INSTITUTION STUDENTS PLACEHOLDER</div>} />
        <Route path={'/institution-mentors'} element={<div>INSTITUTION MENTORS PLACEHOLDER</div>} />
        <Route path={'/my-institution'} element={<div>MY INSTITUTION PLACEHOLDER</div>} />
      </Route>
      <Route element={<PrivateLayout allowedRoles={[UserRoles.ROLE_SYSTEM_ADMIN]} />}>
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

const DaigakuApplicationWithQueryClient = (): JSX.Element => {
  const queryClient = useCoreQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export const DaigakuReactApplication = (): JSX.Element => {
  return (
    <TranslationProvider>
      <ToastProvider>
        <DaigakuApplicationWithQueryClient />
      </ToastProvider>
    </TranslationProvider>
  );
};
