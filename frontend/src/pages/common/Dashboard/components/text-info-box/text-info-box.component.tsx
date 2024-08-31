/**
 * @prettier
 */

/* component, style imports */
import { Article } from './text-info-box.styles';

/* interfaces, types, enums */
interface ComponentProps {
  readonly title: string;
  readonly country: string;
  readonly university: string;
  readonly courseName: string;
}

/*
 * component - TODO - add functionality description
 */
export const TextInfoBox = ({ title, country, university, courseName }: ComponentProps) => {
  return (
    <Article>
      <p>{country}</p>
      <p>{university}</p>
      <p>{courseName}</p>
      <p>{title}</p>
    </Article>
  );
};
