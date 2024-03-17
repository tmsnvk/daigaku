import { FooterContainer } from './Footer.styles.ts';

const Footer = () => {
  return (
    <>
      <div></div>
      <FooterContainer>
        <p>{'\u00A9'} 2024 - {new Date().getFullYear().toString()}</p>
        <p>built with reactJS and ❤️</p>
      </FooterContainer>
    </>
  );
};

export default Footer;
