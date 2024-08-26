/**
 * @prettier
 */

export interface FormFieldValidation {
  required?: {
    value: boolean;
    message: string;
  };
  pattern?: {
    value: RegExp;
    message: string;
  };
}
