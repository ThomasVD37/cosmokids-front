import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './landing.scss'
import { useRandomImage } from "../../hooks/useRandomImage";
import { useEffect } from "react";
import { TranslateText } from "../../store/reducers/dataReducer";

const LandingPage = () => {

    useRandomImage();

    const dispatch = useDispatch();

    const landingImage = useSelector(state => state.data.landingImage);
    const isLoaded = useSelector(state => state.data.loadComplete);

    useEffect(() => {
        if (landingImage.explanation !== "") {
            dispatch(TranslateText({ text: landingImage.explanation }));
        }
    }, []);

    const cleanedText = landingImage.explanation.replaceAll("&#39;", "'");

    return (
        <div className="landing-container">

            <div className="landing-container__box">
                <img src={landingImage.url}></img>
            </div>
            <div className="landing-container__text">
                <h2 className="title">Le saviez vous ?</h2>
                {isLoaded ? <p className="description">{cleanedText}</p> : <p className="description">Chargement...</p>}
                <div className="button-box">
                    <Link to={"/home"} className="redirect">Vers les étoiles !</Link>
                </div>
            </div>

        </div>
    )
}

export default LandingPage;