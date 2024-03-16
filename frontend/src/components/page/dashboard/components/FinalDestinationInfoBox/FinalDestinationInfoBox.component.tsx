import { BoxContainer } from './FinalDestinationInfoBox.styles.ts';

type ComponentPropT = {
  title: string;
  country: string;
  university: string;
  courseName: string;
}

const FinalDestinationInfoBox = ({ title, country, university, courseName }: ComponentPropT) => {
  return (
    <BoxContainer>
      <p>{country}</p>
      <p>{university}</p>
      <p>{courseName}</p>
      <p>{title}</p>
    </BoxContainer>
  );
};

export default FinalDestinationInfoBox;
