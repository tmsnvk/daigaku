/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { useNavigate } from '@tanstack/react-router';
import { JSX, useEffect } from 'react';

/* logic imports */
import { useAuthenticationProvider } from '@daigaku/providers';
import { joinTw } from '@daigaku/utilities';
import { useFormSelector } from './home-page.hooks';

/* interface, type imports */
import { UserLoginStates } from '@daigaku/common-types';

/**
 *
 * @returns {JSX.Element}
 */
export const HomeIndex = (): JSX.Element => {
  const navigate = useNavigate();

  const { state } = useAuthenticationProvider();
  const { selectedFormType, selectedFormComponent } = useFormSelector();

  useEffect(() => {
    if (state.authenticationStatus === UserLoginStates.LOGGED_IN) {
      navigate({ to: '/dashboard' });
    }
  }, [state.authenticationStatus, navigate]);

  return (
    <main className={'mx-auto flex flex-col items-center'}>
      <section
        key={selectedFormType}
        className={joinTw(
          'core-tertiary-border animate-fade-in-from-left my-[5%] flex w-[90%] flex-col px-10 py-20 text-center',
          'sm:w-200',
        )}
      >
        {selectedFormComponent}
      </section>
    </main>
  );
};
