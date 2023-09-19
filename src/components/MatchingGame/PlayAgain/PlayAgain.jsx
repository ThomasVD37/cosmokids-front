// import { useCompleteActivity } from "../../../hooks/useCompleteActivity";
import styles from './playAgain.module.scss'
const PlayAgain = (resetGame) => {

    // useCompleteActivity();

    return <button className={styles.resetGameButton} onClick={resetGame}>Rejouer</button>;
}

export default PlayAgain