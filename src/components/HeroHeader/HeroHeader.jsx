//import { ButtonLink } from "../Button/Button";
import ImageContainer from "./ImageContainer/ImageContainer";
import PresentationText from "./PresentationText/PresentationText";

import styles from "./HeroHeader.module.scss";
const HeroHeader = () => {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.container}>
                <ImageContainer />
                <PresentationText />
            </div>

        </div>
    );
};

export default HeroHeader;
