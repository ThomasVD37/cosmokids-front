import PropTypes from 'prop-types';
import Quizz from '../../../components/Quizz/Quizz';
import SolarSystemDnd from '../../../components/SolarSystemDnd/SolarSystemDnd';
import MatchingGame from '../../../components/MatchingGame/MatchingGame';
import Left_panel from '../Left_panel/Left_panel';
import Left_panel_mobile from '../Left_panel_mobile/Left_panel_mobile';
import Right_panel from '../Right_panel/Right_panel';
import Right_panel_mobile from '../Right_panel_mobile/Right_panel_mobile';
import { exitFullscreen, toggleFullscreen } from '../../../store/reducers/activityReducer';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useWindowWidth } from '@react-hook/window-size';
import './Activity_content.scss'
import { useParams } from 'react-router-dom';


const ActivityHeader = ({ title, type, duration }) => {
    return (
        <div className="activity__content__header">
            <h2>{title}</h2>
            <h4>{type}</h4>
            <div className='duration'>
                <i className="fa-solid fa-clock"></i><p>{duration}</p>
            </div>
        </div>
    )
}

const Activity_content = ({ title, duration, type, rules, description, isActivityFullscreen, associated_lessons }) => {

    const dispatch = useDispatch();
    let { slug } = useParams();
    const windowWidth = useWindowWidth();

    useEffect(() => {
        isActivityFullscreen && windowWidth > 768 && dispatch(exitFullscreen())
    }, [windowWidth])

    return (

        <main className={isActivityFullscreen ? "activity__content no_border" : "activity__content"}>

            {!isActivityFullscreen && <ActivityHeader
                title={title}
                type={type}
                duration={duration}
            />}

            <div className="activity__content__display">
                {!isActivityFullscreen ?
                    <Left_panel rules={rules} description={description} /> :
                    <Left_panel_mobile
                        rules={rules}
                        description={description}
                        title={title}
                        type={type}
                        duration={duration}
                    />
                }

                <div className="playground">
                    <div className={isActivityFullscreen ? "playground__container active" : "playground__container"}>

                        {isActivityFullscreen && <button className='exit' onClick={() => dispatch(exitFullscreen())}>

                            Quitter le plein écran<i className="fa-solid fa-xmark"></i>
                        </button>}
                        {slug === "quizz-de-l-espace" && <Quizz />}
                        {slug === "frise-systeme-solaire" && <SolarSystemDnd />}
                        {slug === "matching-game" && <MatchingGame />}
                    </div>
                    <div className={isActivityFullscreen ? "playground__starter" : "playground__starter active"}>
                        <p>Appuie sur le bouton ci dessous pour lancer cette activité, tu devras tourner ton téléphone pour en profiter !</p>
                        <button onClick={() => dispatch(toggleFullscreen())}><i className="fa-solid fa-rocket"></i>Let&#39;s go</button>
                    </div>

                </div>



                {!isActivityFullscreen ?
                    <Right_panel associated_lessons={associated_lessons} /> : <Right_panel_mobile associated_lessons={associated_lessons} />
                }
            </div>
        </main>
    )
}

ActivityHeader.propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
    duration: PropTypes.string,
};

Activity_content.propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
    duration: PropTypes.string,
    isActivityFullscreen: PropTypes.bool,
    rules: PropTypes.string,
    description: PropTypes.string,
    associated_lessons: PropTypes.array,
};

export default Activity_content;


// const [currentSlug, setCurrentSlug] = useState(slug)   

//     const availableActivities = [
//         "quizz-de-l-espace",
//         "frise-systeme-solaire",
//         "matching-game"
//     ];

//     // Randomisation sur les activités placeholder
//     useEffect(() => {
//         if (!availableActivities.includes(slug)) {
//             const random = Math.floor(Math.random() * availableActivities.length)
//             setCurrentSlug(availableActivities[random])
//         }
//     }, [slug])