/**
 * @prettier
 */

import { Article } from './input-info-box.styles';

interface ComponentProps {
  readonly content: Array<string>;
}

export const InputInfoBox = ({ content }: ComponentProps) => {
  return (
    <Article>
      {content.map((paragraph: string, index: number) => (
        <p key={index}>{paragraph}</p>
      ))}
    </Article>
  );
};
