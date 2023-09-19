import PropTypes from "prop-types";
import ButtonQuizz from "../Button/Button";

const Answer = ({ value, currentAnswer }) => {
    return (
        <ButtonQuizz answer={value} currentAnswer={currentAnswer} />
    )
}
Answer.propTypes = {
    value: PropTypes.string,
    currentAnswer: PropTypes.string,
}


export default Answer;