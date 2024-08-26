/**
 * @prettier
 */

import { Article } from './application-details-field.styles';

interface ComponentProps {
  name: string;
  data: string | number;
}

export const ApplicationDetailsField = ({ name, data }: ComponentProps) => {
  return (
    <Article>
      <h2>{name}</h2>
      <p>{data}</p>
    </Article>
  );
};
