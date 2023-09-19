import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./lesson.module.scss";
import ActivityBlock from "../../components/ActivityBlock/ActivityBlock";
import { useCompleteLesson } from "../../hooks/useCompleteLesson";

const Lesson = () => {
    const { slug } = useParams();
    const naviguate = useNavigate();
    const lessons = useSelector(state => state.data.lessonsList);
    const activities = useSelector(state => state.data.activitiesList);

    const { id, title, content, image, associated_activities } = lessons.find((lesson) => lesson.slug === slug && lesson)
    const numberOfStars = 600;
    const starsArray = Array.from({ length: numberOfStars }, (_, i) => i);
    useCompleteLesson(id);
    const activity = associated_activities.map(({ id: associate_id }) => {
        return activities.find(({ id }) => id === associate_id)
    })
    return (

        <div className={styles.container}>
            <div className={styles.starsWrapper}>
                {starsArray.map((i) => (
                    <div key={i} className={`${styles.stars} ${styles["s" + i]}`} />
                ))}
            </div>
            <h3>{title}</h3>
            <div className={styles.containerLesson}>
                <img src={image} />
                <div>
                    <p>{content}</p>
                </div>
            </div>
            {associated_activities.length === 0 ? (
                <div className={styles.containerActivityBinded} key={id} >
                    <div className={styles.containerTitleExercice}>
                        <h4>Il n&#39;y a pas encore d&#39;activité liée à cette leçon&thinsp;!</h4>
                    </div>
                </div>
            ) :
                <div className={styles.containerActivityBinded} key={id} >
                    <div className={styles.containerTitleExercice}>
                        <h4>Exercice pour aller plus loin&thinsp;!</h4>
                    </div>
                    {activity.map(activity => {
                        return (
                            <div key={activity.slug} className={styles.containerExercice} onClick={() => naviguate(`/playground/${activity.slug}`)}>
                                <ActivityBlock
                                    title={activity.title}
                                    image={activity.image}
                                    duration={activity.duration}
                                    type={activity.type}
                                    className={"ActivityBlockMin"}
                                    excerptSize={null}
                                />
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
};

export default Lesson;