import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <a
        href="https://github.com/Arcturus91/"
        target="_blank"
        rel="noopener noreferrer"
        className="icon"
      >
        <FontAwesomeIcon icon={faGithub} />
      </a>
      <a
        href="https://www.linkedin.com/in/arturobarrantesv/"
        target="_blank"
        rel="noopener noreferrer"
        className="icon"
      >
        <FontAwesomeIcon icon={faLinkedin} />
      </a>
      <a
        href="https://www.instagram.com/iamarturobarrantes/"
        target="_blank"
        rel="noopener noreferrer"
        className="icon"
      >
        <FontAwesomeIcon icon={faInstagram} />
      </a>
    </div>
  );
};

export default Footer;
