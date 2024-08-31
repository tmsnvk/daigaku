/**
 * @prettier
 */

/* component, style imports */
import { TitleHeading } from './page-title.styles.ts';

/* interfaces, types, enums */
interface ComponentProps {
  readonly content: string;
}

/*
 * component - TODO - add functionality description
 */
export const PageTitle = ({ content }: ComponentProps) => {
  return <TitleHeading>{content}</TitleHeading>;
};
