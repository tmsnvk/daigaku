import { GeneralIcon } from '@components/shared/icon-styles';
import { ComponentContainer } from './LoadingIndicator.styles.ts';
import { iconLibraryConfig } from '@configuration';

type ComponentPropsT = {
  content: string;
}

const LoadingIndicator = ({ content }: ComponentPropsT) => {
  return (
    <ComponentContainer>
      <p>{content}</p>
      <GeneralIcon icon={iconLibraryConfig.faSpinner} spin></GeneralIcon>
    </ComponentContainer>
  );
};

export default LoadingIndicator;
