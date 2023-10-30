import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FetchLandingImage, setIsLoading } from "../store/reducers/dataReducer";

/**
 * @returns {string} Random date formated as YYYY-MM-DD
 */
export const useRandomImage = () => {

    const dispatch = useDispatch();

    function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().slice(0, 10);
    }

    useEffect(() => {
        //dispatch(setIsLoading());
        dispatch(FetchLandingImage({ randomDate: randomDate(new Date(2018, 0, 1), new Date()) }));
    }, []);

    return;
};
