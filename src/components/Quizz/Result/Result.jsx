import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Restart } from "../../../store/reducers/quizz";
import RockAnimation from "./RocketAnimation/RocketAnimation";
import BackgroundResult from './BackgroundResult/BackgroundResult'
import emptyStars from '../../../assets/icon/quizz/emptyStars.png'
import stars from '../../../assets/icon/quizz/stars.png'
import styles from './result.module.scss'
import { useCompleteActivity } from "../../../hooks/useCompleteActivity";
import { ButtonMain } from "../../../components/Button/Button";

const Result = ({ correctAnswerCount, questionLength }) => {
    const dispatch = useDispatch();
    const [displayedResult, setDisplayedResult] = useState(0);
    const showResult = useSelector(state => state.quizz.showResult)

    const PoucentageCalc = (correctAnswerCount, questionLength) => {
        const result = (correctAnswerCount / questionLength) * 100;
        const roundedResult = Math.round(result * 100) / 100;
        return roundedResult;
    }

    useCompleteActivity(showResult);

    const result = PoucentageCalc(correctAnswerCount, questionLength)

    useEffect(() => {
        let animationInterval;
        const step = result / 100;
        setDisplayedResult(0);

        const animateScore = () => {
            setTimeout(() => {
                setDisplayedResult(prevResult => {
                    const newResult = prevResult + step;
                    return newResult >= result ? result : Math.ceil(newResult);
                });
            }, 2000)
        };

        animationInterval = setInterval(animateScore, 10);

        return () => {
            clearInterval(animationInterval);
        };
    }, [result]);

    const textReveal =
        result >= 0 && result < 30
            ? "Pensez à réviser la prochaine fois !"
            : result >= 30 && result < 60
                ? "Vous pouvez faire mieux !"
                : result >= 60 && result < 100
                    ? "Pas mal, mais encore des efforts à faire !"
                    : result === 100
                        ? "Félicitations ! Excellent travail !"
                        : "Résultat invalide";
    return (
        <div className={styles.containerResult}>
            <BackgroundResult />
            <div className={styles.containerStars}>
                <div className={styles.ResultStars}>
                    <img src={result >= 30 ? stars : emptyStars} className={styles.stars1} />
                    <img src={result >= 60 ? stars : emptyStars} className={styles.stars2} />
                    <img src={result >= 100 ? stars : emptyStars} className={styles.stars3} />
                </div>
                <div className={styles.ResultPourcentage}>
                    <span className={displayedResult === 0 ? styles.displayResult : ''}>{displayedResult}%</span>
                </div>
            </div>
            <div className={styles.containerText}>
                <p>{textReveal}</p>
                <span>{`Tu as obtenu ${correctAnswerCount} bonne réponse sur ${questionLength}.`}</span>
            </div>
            <div className={styles.Footer}>
                <ButtonMain onClick={() => dispatch(Restart())}>
                    Recommencer
                </ButtonMain>
            </div>
        </div>
    )
}

Result.propTypes = {
    correctAnswerCount: PropTypes.number,
    questionLength: PropTypes.number,
}

export default Result;