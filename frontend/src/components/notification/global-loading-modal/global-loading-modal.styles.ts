/**
 * @prettier
 */

import styled from 'styled-components';

import { BaseDialog } from '@components/base-styles';

export const Dialog = styled(BaseDialog)`
  width: 45%;
  background-color: ${({ theme }) => theme.color.secondaryLight};
`;
