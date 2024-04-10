import { Article } from './TextInfoBox.styles.ts';

type ComponentPropsT = {
  title: string;
  country: string;
  university: string;
  courseName: string;
}

const TextInfoBox = ({ title, country, university, courseName }: ComponentPropsT) => {
  return (
    <Article>
      <p>{country}</p>
      <p>{university}</p>
      <p>{courseName}</p>
      <p>{title}</p>
    </Article>
  );
};

export default TextInfoBox;
