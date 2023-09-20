import { useDispatch } from 'react-redux';
import { ButtonMain } from '../../../components/Button/Button';
import { Start } from '../../../store/reducers/quizz';
import styles from './startQuiz.module.scss'
import img from '/images/astronauteXplanet.png'
const StartQuiz = () => {
    const dispatch = useDispatch();

    return (
        <div className={styles.StartingWrapper}>
            <img src={img} alt="astronaute" />
            <div className={styles.containerButton}>
                <ButtonMain onClick={() => dispatch(Start(true))}>
                    Commencer le Quiz
                </ButtonMain>
            </div>
        </div>
    )
}

export default StartQuiz;