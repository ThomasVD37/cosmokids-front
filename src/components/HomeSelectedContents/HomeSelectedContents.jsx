import { useSelector } from "react-redux";
import { useWindowWidth } from "@react-hook/window-size";
import { useArrayRandomiser } from "../../hooks/useArrayRandomiser";
import { useNavigate } from "react-router-dom";
import ActivityBlock from "../ActivityBlock/ActivityBlock";
import LessonBlock from "../LessonBlock/LessonBlock";
import styles from "./HomeSelectedContents.module.scss";

const SelectedContents = () => {
    const navigate = useNavigate();
    const activitiesList = useSelector((state) => state.data.dataList.activities);
    const lessonsList = useSelector((state) => state.data.dataList.lessons);

    const filteredActivities = useArrayRandomiser(activitiesList, 3);
    const filteredLessons = useArrayRandomiser(lessonsList, 3);
    const WindowWidth = useWindowWidth();


    const handleClick = (kind, slug) => {
        navigate(`/${kind}/${slug}`);
    };

    return (
        <div className={styles.contentList}>
            {filteredLessons.length === 0 ? (

                <div className={styles.homepageErrorMessage}>Il n&apos;y a pas de cours disponibles</div>
            ) : (
                <div className={styles.containerLessonBlock}>
                    {WindowWidth <= 1024 ? <h3 className={styles.title}>Notre séléction de cours&thinsp;:</h3> : ''}
                    {filteredLessons.map(({ id, slug, ...rest }) => (
                        <LessonBlock
                            key={id + slug}
                            {...rest}
                            excerptSize={130}
                            className={WindowWidth <= 524 ? "LessonBlockMin" : "lessonBlock"}
                            onClick={() => handleClick("lesson", slug)}
                        />
                    ))}
                </div>
            )}


            {filteredActivities.length === 0 ? (

                <div className={styles.homepageErrorMessage}>Il n&apos;y a pas d&apos;activités disponibles</div>
            ) : (
                <div className={styles.containerActivityBlock}>
                    <h3 className={styles.title}>Notre séléction d&apos;activités&thinsp;:</h3>
                    {filteredActivities.map(({ id, slug, ...rest }) => (
                        <ActivityBlock
                            key={id + slug}
                            {...rest}
                            excerptSize={130}
                            display={"list"}
                            className={WindowWidth <= 524 ? "ActivityBlockMin" : "activityBlock"}
                            onClick={() => handleClick("playground", slug)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectedContents;
