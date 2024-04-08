import { Section } from './Toast.styles.ts';

type ComponentPropsT = {
  isVisible: boolean;
  content: string;
}

const Toast = ({ isVisible, content }: ComponentPropsT) => {
  return (
    isVisible &&
    <Section>
      {content}
    </Section>
  );
};

export default Toast;
