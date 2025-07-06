/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { createFileRoute } from '@tanstack/react-router';
import { JSX } from 'react';

/* logic imports */
import { joinTw } from '@daigaku/utilities';

/* component imports */
import { CreateApplicationRecordForm } from '@daigaku/components/applications-create';

/**
 *
 * @returns {JSX.Element}
 */
const CreateApplicationComponent = (): JSX.Element => {
  return (
    <main className={joinTw('flex flex-col items-center', 'mx-auto')}>
      <CreateApplicationRecordForm />
    </main>
  );
};

export const Route = createFileRoute('/applications/create')({
  component: CreateApplicationComponent,
});
