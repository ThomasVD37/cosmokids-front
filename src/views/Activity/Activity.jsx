
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import './activity.scss'
import Activity_content from "./Activity_content/Activity_content";
import { exitFullscreen } from "../../store/reducers/activityReducer";

const RemindBanner = () => {
    const [visible, setVisible] = useState(true)
    const dispatch = useDispatch();

    return (
        <div className={!visible ? "hidden" : "login_reminder"}>
            <div className="login_reminder__container">
                <p>Pense à <Link onClick={() => dispatch(exitFullscreen())} to={'/login'}>te connecter</Link> pour sauvegarder ta progression</p>
                <i onClick={() => setVisible(false)} className="fa-solid fa-xmark"></i>
            </div>
        </div>
    )
}


const Activity = () => {

    // TODO réparer le slug si 404
    const { slug } = useParams()
    const activitiesList = useSelector(state => state.data.activitiesList)
    const lessonsList = useSelector(state => state.data.lessonsList)
    const currentActivity = activitiesList.find(activity => activity.slug === slug)
    
    const associated = currentActivity.associated_lessons.map(associated => {
        return lessonsList.find(lesson => lesson.id === associated.id)
    })
    const duration = Math.ceil(currentActivity.duration / 60) + " Min"

    const isActivityFullscreen = useSelector(state => state.activity.isActivityFullscreen)
    const isLogged = useSelector(state => state.userData.isLogged)

    /* Components Radix
        Accordion pour mobile
        popover pour menus sur mobile

        TODO
        Virer les textes en activité mobile pour tout mettre dans les popovers
        Ajouter un bouton de fermeture du fullscreen
        Revoir le positionnement, notamment les marges
    */

    return (
        <div className={isActivityFullscreen ? "activity_container fullscreen" : "activity_container"}>
            <div className="activity">
                {!isLogged && <RemindBanner />}

                <Activity_content
                    title={currentActivity.title}
                    type={currentActivity.type.name}
                    duration={duration}
                    rules={currentActivity.rules}
                    description={currentActivity.description}
                    associated_lessons={associated}
                    isActivityFullscreen={isActivityFullscreen}
                />

            </div>
        </div>
    );
};



export default Activity;
