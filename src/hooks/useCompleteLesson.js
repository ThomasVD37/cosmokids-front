import { useDispatch, useSelector } from "react-redux";
import { sendCompleteLesson } from "../store/reducers/activityReducer";
import { useEffect } from "react";


/**
 * Hook to send request to complete activity
 * @param {number} lesson_id 
 */

export const useCompleteLesson = (lesson_id) => {

    const isLogged = useSelector(state => state.userData.isLogged);
    const dispatch = useDispatch();
    const alreadyCompleted = useSelector(state => state.userData.user.completed_lessons);

    const sendComplete = setTimeout(() => {
        if (isLogged) {

            if (alreadyCompleted.find(lesson => lesson.id === lesson_id) === undefined) {
                dispatch(sendCompleteLesson(lesson_id))
            }
        }
    }, 15000)

    useEffect(() => {
        return () => {
            clearTimeout(sendComplete)
        }
    }, [])


    return
};