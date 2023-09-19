import { Link } from "react-router-dom";
import { useFetchPictureOfDay } from "../../hooks/FetchPictureOfDay";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nasaApiFetch } from "../../store/reducers/dataReducer";
import Loading from "../Loading/Loading";
import './landing.scss'

const LandingPage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(nasaApiFetch())
    }, []);

    const nasaData = useSelector(state => state.data.nasaQuery);
    const loadComplete = useSelector(state => state.data.nasaLoadComplete);

    let picture = "";
    let title = "";
    let description = "";

    if (loadComplete) {
        const itemsCount = nasaData.items.length;
        const randomItemIndex = Math.floor(Math.random() * itemsCount);
        // const randomItemIndex = 20;
        picture = nasaData.items[randomItemIndex].links[0].href;
        title = nasaData.items[randomItemIndex].data[0].title;
        description = nasaData.items[randomItemIndex].data[0].description;
    }

    return (
        <div className="landing-container">
            {/* Nécessaire le loader ? */}
            {!loadComplete ? (
                <Loading />
            ) : (
                <div className="landing-box">
                    <div className="picture-box">
                        <img src={picture}></img>
                    </div>
                    <div className="text-box">
                        <h1 className="title">Le saviez-tu vous ?</h1>
                        <p className="description">{description}</p>
                    </div>
                    <div className="button-box">
                        <Link to={"/home"} className="redirect">Vers les étoiles!</Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default LandingPage;