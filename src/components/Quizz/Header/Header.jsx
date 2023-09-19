import PropTypes from "prop-types";
import Timer from "./Timer/Timer";
import styles from './header.module.scss'

const Header = ({ currentQuestionsIndex, questionLength }) => {
    return (
        <div className={styles.Header}>
            <div className={styles.currentQuestionLenght}>
                <span>{currentQuestionsIndex} / {questionLength}</span>
            </div>
            <Timer
                currentQuestionsIndex={currentQuestionsIndex}
            />
        </div>
    )
}

Header.propTypes = {
    currentQuestionsIndex: PropTypes.number,
    questionLength: PropTypes.number,
}

export default Header;