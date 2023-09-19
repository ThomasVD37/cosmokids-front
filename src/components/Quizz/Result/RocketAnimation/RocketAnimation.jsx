import styles from "./rocket.module.scss"

const RocketAnimation = () => {
    return (
        <div className={styles.containerRocket}>
            <div className={styles.wrapper}>
                <div className={styles.rocket}>
                    <div className={styles.rocketBody}>
                        <div className={styles.body}></div>
                        <div>
                            <div className={`${styles.fin}  ${styles.finleft}`}></div>
                            <div className={`${styles.fin}  ${styles.finRight}`}></div>
                        </div>
                        <div className={styles.window}></div>
                    </div >
                    <div className={styles.exhaustFlame}></div>
                    <ul className={styles.exhaustFumes}>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>

                    <ul className={styles.star}>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div >
            </div>
        </div>
    )
}

export default RocketAnimation;