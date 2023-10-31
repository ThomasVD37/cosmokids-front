import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import './landing.scss'
import { useRandomImage } from "../../hooks/useRandomImage";

const LandingPage = () => {

    useRandomImage();

    const landingImage = useSelector(state => state.data.landingImage);

    return (
        <div className="landing-container">

            <div className="landing-container__box">
                <img src={landingImage.url}></img>
            </div>
            <div className="landing-container__text">
                <h2 className="title">Le saviez-tu vous ?</h2>
                <p className="description">{landingImage.explanation}</p>
                <div className="button-box">
                    <Link to={"/home"} className="redirect">Vers les étoiles !</Link>
                </div>
            </div>

        </div>
    )
}

export default LandingPage;