import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NextQuestions, Restart, Start } from '../../store/reducers/quizz';
import { useParams } from 'react-router-dom';
import Result from './Result/Result';
import Question from './Question/Question';
import Answer from './Answer/Answer';
import Header from './Header/Header';
import styles from './quizz.module.scss'
import { ButtonMain } from '../../components/Button/Button';
import StartQuiz from './StartQuiz/StartQuiz';


const Quizz = () => {

    const { slug } = useParams();
    
    const dispatch = useDispatch();
    const QuizzState = useSelector(state => state.quizz)
    const activities = useSelector(state => state.data.activitiesList);
    const {id} = activities.find((activity) => activity.slug === slug && activity)
    const { questions, showResult, currentQuestionsIndex, answers, correctAnswerCount, currentAnswer, isStarted, image } = QuizzState;
    useEffect(() => {
        dispatch(Start(false))
        
        return () => {
            dispatch(Restart())
        }
    }, [])

    const currentQuestions = questions[currentQuestionsIndex];
   
    return (

        <div className={styles.container}>
            {showResult && (
                <Result
                    correctAnswerCount={correctAnswerCount}
                    questionLength={questions.length}
                />
            )}
            {!isStarted && (
                <StartQuiz />
            )}
            {isStarted && !showResult && (
                <div className={styles.containerQuizz}>
                    <Header
                        questionLength={questions.length}
                        currentQuestionsIndex={currentQuestionsIndex}
                    />
                    <Question
                        questionLength={questions.length}
                        currentQuestion={currentQuestions.questions}
                        currentQuestionsIndex={currentQuestionsIndex + 1}
                    />
                    <div className={styles.wrapper}>
                        <div className={styles.containerButton}>
                            {answers.map((answer, index) => {
                                return (
                                    <Answer key={index} value={answer} currentAnswer={currentAnswer} />
                                )
                            })}
                        </div>
                        <img src={image} />
                    </div>
                    <div className={styles.Footer}>
                        <ButtonMain onClick={() => dispatch(NextQuestions())}>
                            Prochaine question
                        </ButtonMain>
                    </div>
                </div>
            )}
        </div>
    )
}


export default Quizz;