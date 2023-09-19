import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchData } from "../../store/reducers/dataReducer";
import NotFound from "../NotFound/NotFound";
import LandingPage from "../../views/LandingPage/Landing";
import Home from "../../views/Home/Home";

import Header from '../Header/Header';
import Login from '../../views/Login/Login';
import Register from '../../views/Register/Register';
import Lesson from '../../views/Lesson/Lesson';
import styles from './App.module.scss';
import Activity from '../../views/Activity/Activity';
import Quizz from "../../components/Quizz/Quizz"
import User from '../../views/User/User';
import Loading from '../../views/Loading/Loading';
import MatchingGame from '../MatchingGame/MatchingGame';



const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchData());
    }, []);
    
    // const isLogged = useSelector(state => state.userData.isLogged)
    const loadComplete = useSelector(state => state.data.loadComplete)
    const isActivityFullscreen = useSelector((state) => state.activity.isActivityFullscreen);

    return (
        <div className={styles.app}>

            {!isActivityFullscreen && <Header />}

            {!loadComplete ? (
                <Loading />
            ) : (
                <Routes>
                    <Route path='/' element={<LandingPage />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Register />} />
                    <Route path='/playground/:slug' element={<Activity />} />
                    <Route path='/lesson/:slug' element={<Lesson />} />
                    <Route path='/user' element={<User />} />
                    <Route path='*' element={<NotFound />} />
                    <Route path='/activity/quiz' element={<Quizz />} />
                    <Route
                        path='/activity/matching'
                        element={<MatchingGame />}
                    />
                    {/* Route temporaire pour test l'activité */}
                </Routes>
            )}

        </div>
    );
};

export default App;
