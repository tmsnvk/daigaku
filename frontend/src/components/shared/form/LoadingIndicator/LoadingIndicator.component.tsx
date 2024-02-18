import { GeneralIcon } from '@components/shared/icon-styles';
import { ComponentContainer } from './LoadingIndicator.styles.ts';
import { iconLibraryConfig } from '@configuration';

type ComponentPropT = {
  message: string;
}

const LoadingIndicator = ({ message }: ComponentPropT) => {
  return (
    <ComponentContainer>
      <p>{message}</p>
      <GeneralIcon icon={iconLibraryConfig.faSpinner} spin></GeneralIcon>
    </ComponentContainer>
  );
};

export default LoadingIndicator;
