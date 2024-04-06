import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ComponentContainer } from './LoadingIndicator.styles.ts';
import { iconLibraryConfig } from '@configuration';

type ComponentPropsT = {
  content: string;
}

const LoadingIndicator = ({ content }: ComponentPropsT) => {
  return (
    <ComponentContainer>
      <p>{content}</p>
      <FontAwesomeIcon icon={iconLibraryConfig.faSpinner} spin></FontAwesomeIcon>
    </ComponentContainer>
  );
};

export default LoadingIndicator;
