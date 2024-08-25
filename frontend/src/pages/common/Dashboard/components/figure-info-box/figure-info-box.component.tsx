/**
 * @prettier
 */

import { DescriptionList } from './figure-info-box.styles.ts';

interface ComponentProps {
  readonly title: string;
  readonly content: string | number;
}

export const FigureInfoBox = ({ title, content }: ComponentProps) => {
  return (
    <DescriptionList>
      <dt>{content}</dt>
      <dd>{title}</dd>
    </DescriptionList>
  );
};
