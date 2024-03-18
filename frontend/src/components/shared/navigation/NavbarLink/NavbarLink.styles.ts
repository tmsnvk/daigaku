import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const LinkContainer = styled(NavLink)`
  font-size: ${(props) => props.theme.fontSize.large};
  font-weight: 600;
  letter-spacing: 0.2rem;

  &:hover:not(.active) {
    text-decoration: underline;
    cursor: pointer;
  }
}
`;

export {
  LinkContainer,
};
