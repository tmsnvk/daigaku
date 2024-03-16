import { BoxContainer } from './TextInfoBox.styles.ts';

type ComponentPropT = {
  title: string;
  country: string;
  university: string;
  courseName: string;
}

const TextInfoBoxInfoBox = ({ title, country, university, courseName }: ComponentPropT) => {
  return (
    <BoxContainer>
      <p>{country}</p>
      <p>{university}</p>
      <p>{courseName}</p>
      <p>{title}</p>
    </BoxContainer>
  );
};

export default TextInfoBoxInfoBox;
