import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { sendCompleteActivity } from "../store/reducers/activityReducer";
import { useEffect } from "react";

export const useCompleteActivity = (isGameOver) => {

    const isLogged = useSelector(state => state.userData.isLogged);
    const { slug } = useParams();
    const dispatch = useDispatch();
    const activityList = useSelector(state => state.data.activitiesList);
    const alreadyCompleted = useSelector(state => state.userData.user.completed_activities);

    useEffect(() => {
        if (isLogged && isGameOver) {
            const { id } = activityList.find(activity => activity.slug === slug)

            if (alreadyCompleted.find(activity => activity.id === id) === undefined) {
                dispatch(sendCompleteActivity(id))
            }

        }
    }, [isGameOver])

    return
};