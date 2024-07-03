import { FormTypeE } from './Home.types.ts';

const confirmationModalMessages = {
  [FormTypeE.LOGIN]: '',
  [FormTypeE.REGISTER]: 'Thank you for registering your account. You will soon receive an email with further details.',
  [FormTypeE.RESET]: 'Your password has been reset. You will soon receive an email with further instructions.',
};

export {
  confirmationModalMessages,
};
