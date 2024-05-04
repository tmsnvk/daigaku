import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Article } from './LoadingIndicator.styles.ts';
import { iconLibraryConfig } from '@configuration';

type ComponentPropsT = {
  content: string;
}

const LoadingIndicator = ({ content }: ComponentPropsT) => {
  return (
    <Article>
      <p>{content}</p>
      <FontAwesomeIcon icon={iconLibraryConfig.faSpinner} spin />
    </Article>
  );
};

export default LoadingIndicator;
