import { FormTypeE } from './Home.types.ts';

const confirmationModalMessages = {
  [FormTypeE.Login]: '',
  [FormTypeE.Register]: 'Thank you for registering your account. You will soon receive an email with further details.',
  [FormTypeE.Reset]: 'Your password has been reset. You will soon receive an email with further instructions.',
};

export {
  confirmationModalMessages,
};
