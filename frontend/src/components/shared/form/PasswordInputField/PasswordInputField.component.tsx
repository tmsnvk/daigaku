import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRevealPassword } from './PasswordInputField.hooks.tsx';
import { PasswordInputFieldContainer } from './PasswordInputField.styles.tsx';
import { iconLibraryConfig } from '@configuration/index.ts';

type ComponentProps = {
  id: string;
  labelContent: string;
  defaultValue?: string;
  placeholder?: string;
}

const PasswordInputField = ({ id, labelContent, defaultValue, placeholder }: ComponentProps) => {
  const { isRevealed, handleRevealClick } = useRevealPassword();

  return (
    <PasswordInputFieldContainer>
      <label htmlFor={id}>{labelContent}</label>
      <div>
        <input
          className={'default-input-field-style'}
          type={isRevealed ? 'text' : 'password'}
          id={id}
          name={id}
          defaultValue={defaultValue ?? ''}
          placeholder={placeholder ?? ''}
        />
        <div>
          <FontAwesomeIcon
            className={'reveal-icon'}
            onClick={handleRevealClick}
            icon={isRevealed ? iconLibraryConfig.faEyeSlash : iconLibraryConfig.faEye}
          />
        </div>
      </div>
    </PasswordInputFieldContainer>
  );
};

export default PasswordInputField;
