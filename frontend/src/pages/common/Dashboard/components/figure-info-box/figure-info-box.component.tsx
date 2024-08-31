/**
 * @prettier
 */

/* component, style imports */
import { DescriptionList } from './figure-info-box.styles.ts';

/* interfaces, types, enums */
interface ComponentProps {
  readonly title: string;
  readonly content: string | number;
}

/*
 * component - TODO - add functionality description
 */
export const FigureInfoBox = ({ title, content }: ComponentProps) => {
  return (
    <DescriptionList>
      <dt>{content}</dt>
      <dd>{title}</dd>
    </DescriptionList>
  );
};
