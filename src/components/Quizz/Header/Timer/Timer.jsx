import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { NextQuestions } from "../../../../store/reducers/quizz";
import { useDispatch } from "react-redux";
import styles from './timer.module.scss';

const Timer = ({ currentQuestionsIndex }) => {
    const [time, setTime] = useState(30);
    const [key, setKey] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prevTime => prevTime - 1);
        }, 1000);

        if (time === 0) {
            dispatch(NextQuestions());
            setTime(30);
        }

        return () => clearInterval(interval);
    }, [time, dispatch]);

    useEffect(() => {
        setTime(30);
        setKey(prevKey => prevKey + 1);

    }, [currentQuestionsIndex])

    return (

        <div key={key} className={styles.containerTimer}>
            <div className={styles.container}>
                <div className={time < 10 ? styles.circleLoaderWrapRed : styles.circleLoaderWrapGreen}>
                    <div className={time > 9 ? styles.timer : styles.timer2}>
                        {time}
                    </div>
                    <div className={styles.leftWrap}>
                        <div className={styles.loader}></div>
                    </div>
                    <div className={styles.rightWrap}>
                        <div className={styles.loader}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
Timer.propTypes = {
    currentQuestionsIndex: PropTypes.number,
}

export default Timer;