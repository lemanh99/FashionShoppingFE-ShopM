import { DefaultFooter, FooterWithPettren } from "./FooterStyle";

const Footer = ({ footerWhite, footerWithPettren }) => {
  return !footerWithPettren ? (
    <DefaultFooter footerWhite={footerWhite} />
  ) : (
    <FooterWithPettren />
  );
};

export default Footer;
