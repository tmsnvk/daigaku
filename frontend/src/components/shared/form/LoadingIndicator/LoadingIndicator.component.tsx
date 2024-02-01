import { LoadingSpinnerIcon } from '@components/shared/icon-styles';
import { ComponentContainer } from './LoadingIndicator.styles.ts';
import { iconLibraryConfig } from '@configuration';

type ComponentPropT = {
  message: string;
}

const LoadingIndicator = ({ message }: ComponentPropT) => {
  return (
    <ComponentContainer>
      <p>{message}</p>
      <LoadingSpinnerIcon icon={iconLibraryConfig.faSpinner} spin></LoadingSpinnerIcon>
    </ComponentContainer>
  );
};

export default LoadingIndicator;
