import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LabelIcon = styled(FontAwesomeIcon)`
  display: inline-block;
  color: ${({ theme }) => theme.color.primaryDark};
  font-size: ${({ theme }) => theme.fontSize.xxLarge};
  margin: 1rem 1rem 1rem 1rem;
`;

export default LabelIcon;
