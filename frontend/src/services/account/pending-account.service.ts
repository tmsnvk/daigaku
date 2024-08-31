/**
 * @prettier
 */

/* configuration imports */
import { axiosConfig } from '@configuration';

/* interface, type, enum imports */
import { RegisterFormFields } from '@pages/common/home/components/registration-form/registration-form.hooks';

export const pendingAccountService = {
    /*
   * TODO - comment
   */
  register: async (data: RegisterFormFields): Promise<void> => {
    await axiosConfig.request({
      method: 'POST',
      url: '/api/v1/pending-accounts/register',
      data,
    });
  },
};
