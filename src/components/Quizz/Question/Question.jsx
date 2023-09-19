import PropTypes from "prop-types";
import styles from './question.module.scss'


const Question = ({ currentQuestion }) => {
    return (
        <div className={styles.currentQuestion}>
            <h3>{currentQuestion}</h3>
        </div>

    )
}

Question.propTypes = {
    currentQuestion: PropTypes.string,
}

export default Question;