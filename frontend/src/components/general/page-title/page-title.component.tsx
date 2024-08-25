/**
 * @prettier
 */

import { TitleHeading } from './page-title.styles.ts';

interface ComponentProps {
  readonly content: string;
}

export const PageTitle = ({ content }: ComponentProps) => {
  return <TitleHeading>{content}</TitleHeading>;
};
