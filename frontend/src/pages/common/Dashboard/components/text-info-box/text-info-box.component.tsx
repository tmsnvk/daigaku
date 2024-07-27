import { Article } from './text-info-box.styles';

interface ComponentProps {
  readonly title: string;
  readonly country: string;
  readonly university: string;
  readonly courseName: string;
}

const TextInfoBox = ({ title, country, university, courseName }: ComponentProps) => {
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
