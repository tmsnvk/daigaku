/**
 * @prettier
 */

import styled from 'styled-components';

import { BaseDialog } from '@components/base-styles';

export const Dialog = styled(BaseDialog)`
  text-align: center;

  & p {
    padding: 0 0 2.5rem 0;
    font-size: ${({ theme }) => theme.fontSize.large};
  }
`;
