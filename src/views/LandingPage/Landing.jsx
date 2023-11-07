import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import './landing.scss'
import { useRandomImage } from "../../hooks/useRandomImage";
import useTranslation from "../../hooks/useTranslation";

const LandingPage = () => {

    useRandomImage();

    const landingImage = useSelector(state => state.data.landingImage);
    const isLoaded = useSelector(state => state.data.loadComplete);
    const translatedText = useTranslation(landingImage.explanation);

    console.log(isLoaded);

    return (
        <div className="landing-container">

            <div className="landing-container__box">
                <img src={landingImage.url}></img>
            </div>
            <div className="landing-container__text">
                <h2 className="title">Le saviez-tu vous ?</h2>
                {isLoaded ? <p className="description">{translatedText}</p> : <p className="description">Chargement...</p>}
                <div className="button-box">
                    <Link to={"/home"} className="redirect">Vers les étoiles !</Link>
                </div>
            </div>

        </div>
    )
}

export default LandingPage;