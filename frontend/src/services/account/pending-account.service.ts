import { axiosConfig } from '@configuration';

import { RegisterFormFields } from '@pages/common/home/components/RegistrationForm/registration-form.hooks';

const pendingAccountService = {
  register: async (data: RegisterFormFields): Promise<void> => {
    await axiosConfig.request({
      method: 'POST',
      url: '/api/v1/pending-accounts/register',
      data,
    });
  },
};

export default pendingAccountService;
