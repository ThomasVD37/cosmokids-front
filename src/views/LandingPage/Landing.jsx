import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import './landing.scss'
import { useRandomImage } from "../../hooks/useRandomImage";

const LandingPage = () => {

    useRandomImage();

    const landingImage = useSelector(state => state.data.landingImage);

    return (
        <div className="landing-container">
            {/* Nécessaire le loader ? */}

            <div className="landing-box">
                <div className="picture-box">
                    <img src={landingImage.url}></img>
                </div>
                <div className="text-box">
                    <h1 className="title">Le saviez-tu vous ?</h1>
                    <p className="description">{landingImage.explanation}</p>
                </div>
                <div className="button-box">
                    <Link to={"/home"} className="redirect">Vers les étoiles!</Link>
                </div>
            </div>

        </div>
    )
}

export default LandingPage;