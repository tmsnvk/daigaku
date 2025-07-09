/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { createFileRoute } from '@tanstack/react-router';
import { JSX } from 'react';

/* component imports */
import { HomeIndex } from '@daigaku/components/home';

const PATH = '/';

/**
 *
 * @returns {JSX.Element}
 */
const HomePageComponent = (): JSX.Element => {
  return <HomeIndex />;
};

export const Route = createFileRoute(PATH)({
  component: HomePageComponent,
});
