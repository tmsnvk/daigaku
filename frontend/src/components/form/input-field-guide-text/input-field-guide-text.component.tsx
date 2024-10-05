/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* component, style imports */
import { Article } from './input-field-guide-text.styles';

/**
 * ===============
 * Component {@link InputFieldGuideText}
 * ===============
 */

/* interfaces, types, enums */
interface ComponentProps {
  readonly paragraphs: Array<string>;
}

/**
 * @description
 * The component renders a list of paragraphs for a given input field.
 *
 * @param {ComponentProps} props
 * @param props.paragraphs A list of paragraphs.
 *
 * @returns {JSX.Element}
 *
 * @since 0.0.1
 */
export const InputFieldGuideText = ({ paragraphs }: ComponentProps): JSX.Element => {
  return (
    <Article>
      {paragraphs.map((paragraph: string, index: number) => (
        <p key={index}>{paragraph}</p>
      ))}
    </Article>
  );
};
