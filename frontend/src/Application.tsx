import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import {
  ErrorPage,
  HomePage
} from '@pages/index.ts';
import './index.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircleExclamation, faCircleNotch, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
library.add(faCircleExclamation, faCircleNotch, faEye, faEyeSlash);

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
  </Route>,
));

const Application = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default Application;
