/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { createFileRoute } from '@tanstack/react-router';
import { JSX } from 'react';

const ContactRouteComponent = (): JSX.Element => {
  return <div>Hello contact page!</div>;
};

export const Route = createFileRoute('/contact/')({
  component: ContactRouteComponent,
});
