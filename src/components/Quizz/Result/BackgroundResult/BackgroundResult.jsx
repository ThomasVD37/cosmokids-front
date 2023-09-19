import styles from './background.module.scss'
import RocketAnimation from '../RocketAnimation/RocketAnimation';
const BackgroundResult = () => {
    const numberOfStars = 200;
    const starsArray = Array.from({ length: numberOfStars }, (_, i) => i);
    return (
        <div className={styles.planetsWrapper}>
            <RocketAnimation />
            <div className={styles.starsWrapper}>
                {starsArray.map((i) => (
                    <div key={i} className={`${styles.stars} ${styles["s" + i]}`} />
                ))}
            </div>
            <div className={styles.earth}> </div>
            <div className={styles.mars}> </div>
            <div className={styles.pluto}> </div>
            <div className={styles.mercury}> </div>
            <div className={styles.neptune}> </div>
            <div className={styles.uranus}> </div>
            <div className={styles.venus}> </div>

        </div>

    )
}
export default BackgroundResult;