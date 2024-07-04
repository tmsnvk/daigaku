import { axiosConfig } from '@configuration';

import { RegisterFormFieldsT } from '@pages/common/Home/components/RegistrationForm/RegistrationForm.hooks.tsx';

const pendingAccountService = {
  register: async (data: RegisterFormFieldsT): Promise<void> => {
    await axiosConfig.request({
      method: 'POST',
      url: '/api/pending-accounts/register',
      data,
    });
  },
};

export default pendingAccountService;
