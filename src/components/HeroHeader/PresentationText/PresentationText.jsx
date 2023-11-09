import styles from "../HeroHeader.module.scss";
import { ButtonLink } from "../../Button/Button";
import { useSelector } from "react-redux";
const PresentationText = () => {
    const isLogged = useSelector((state) => state.userData.isLogged);
    return (
        <div className={styles.presentationText}>
            <p>
                Bienvenue sur CosmoKids, la plateforme éducative dédiée à
                l&apos;espace pour les 8-10 ans. Tu y trouveras des activités et
                des fiches thématiques qui te permettront d&apos;apprendre tout
                en t&apos;amusant.
            </p>
            <p>
                En t&apos;inscrivant, tu pourras garder une trace de ta
                progression en trouvant sur ton profil les activités que tu
                auras terminées et les cours que tu auras consulté.
            </p>
            <div className={styles.buttonContainer}>
                {isLogged &&
                    <ButtonLink
                        name={"Mon profil"}
                        path={"/user"}
                        className={styles.inscriptionButton}
                    />
                }
                {!isLogged &&
                    <>
                        <ButtonLink
                            name={"S'inscrire"}
                            path={"/signup"}
                            className={styles.inscriptionButton}
                        />

                        <ButtonLink
                            name={"Se connecter"}
                            path={"/login"}
                            className={styles.connexionButton}
                        />
                    </>
                }

            </div>
        </div>
    );
};

export default PresentationText;
