import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchLandingImage } from "../store/reducers/dataReducer";

/**
 * @returns {string} Random date formated as YYYY-MM-DD
 */
export const useRandomImage = () => {

    const dispatch = useDispatch();
    const url = useSelector((state) => state.data.landingImage.url);

    function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().slice(0, 10);
    }

    useEffect(() => {
        if (url === "") {
            dispatch(FetchLandingImage({ randomDate: randomDate(new Date(2018, 0, 1), new Date()) }));
        }
    }, []);

    return;
};
