/**
 * @prettier
 */

/* component, style imports */
import { Label } from './input-label.styles';

/* interfaces, types, enums */
interface ComponentProps {
  readonly fieldId: string;
  readonly content: string;
}

/*
 * component - TODO - add functionality description
 */
export const InputLabel = ({ fieldId, content }: ComponentProps) => {
  return <Label htmlFor={fieldId}>{content}</Label>;
};
