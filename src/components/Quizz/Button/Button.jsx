import PropTypes from "prop-types";
import { SelectAnswer } from "../../../store/reducers/quizz";
import { useDispatch } from "react-redux";
import styles from './button.module.scss';

const ButtonQuizz = ({ answer, currentAnswer }) => {
    const dispatch = useDispatch()
    return (
        <button className={styles.buttonPushable} onClick={() => dispatch(SelectAnswer(answer))}>
            <span className={styles.buttonShadow}></span>
            <span className={currentAnswer === answer ? styles.buttonEdgeIsCurrent : styles.buttonEdge}></span>
            <span className={currentAnswer === answer ? styles.buttonFrontIsCurrent : styles.buttonFront}>
                {answer}
            </span>
        </button>
    )
}
ButtonQuizz.propTypes = {
    answer: PropTypes.string,
    currentAnswer: PropTypes.string,
}

export default ButtonQuizz;
