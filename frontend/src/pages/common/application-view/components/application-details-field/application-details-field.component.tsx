/**
 * @prettier
 */

/* component, style imports */
import { Article } from './application-details-field.styles';

/* interfaces, types, enums */
interface ComponentProps {
  name: string;
  applicationDetail: string | number;
}

/*
 * component - TODO - add functionality description
 */
export const ApplicationDetailsField = ({ name, applicationDetail }: ComponentProps) => {
  return (
    <Article>
      <h2>{name}</h2>
      <p>{applicationDetail}</p>
    </Article>
  );
};
