import imageSmall from "./../../../assets/Personnage_astronaute_360w.png";
import imageBig from "./../../../assets/Personnage_astronaute_1024w.png";
import styles from "../HeroHeader.module.scss";

const ImageContainer = () => {
    return (
        <div className={styles.imageContainer}>
            <img
                srcSet={`${imageBig} 1024w, ${imageSmall} 360w`}
                src={imageSmall} />
        </div>
    );
};

export default ImageContainer;
