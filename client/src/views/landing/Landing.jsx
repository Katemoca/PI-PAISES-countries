import { Link } from "react-router-dom";
import github from "../../assets/logos/icons8-github-50.png";
import linkedin from "../../assets/logos/linkedinIcon.png";

import styles from "./Landing.module.css";

export default function Landing() {
  return (
    <div className={styles.landingcont}>
      <div className={styles.blurbackground}>
        <div className={styles.landing}>
          <h1 className={styles.welcome}>WELCOME</h1>
        </div>
        <div className={styles.presentationcont}>
          <p
            className={
              styles.paragraph
            }>{`Here you're going to find information about different countries and their activities`}</p>
        </div>
        <Link to="/home">
          <button className={styles.btn}>Get started</button>
        </Link>
        <div className={styles.socialMediacontainer}>
          <a
            className={styles.logo1}
            href="https://github.com/Katemoca"
            target="_blank"
            rel="noopener noreferrer">
            <img src={github} alt="MyGitHub" />
          </a>
          <a
            className={styles.logo2}
            href="https://www.linkedin.com/in/katerincastromongua"
            target="_blank"
            rel="noopener noreferrer">
            <img src={linkedin} alt="MyLinkedin" />
          </a>
        </div>
      </div>
    </div>
  );
}
