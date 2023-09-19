import './index.scss';
import Forms from '../../components/Form/Form';
import { emailCondition, passwordCondition, usernameCondition } from '../Register/RegisterCondition';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import * as Separator from '@radix-ui/react-separator';
import * as Progress from '@radix-ui/react-progress';


const User = () => {

    const navigate = useNavigate();

    const [showDeleteForm, setShowDeleteForm] = useState(true);

    const userName = useSelector(state => state.userData.user.pseudo);
    const userEmail = useSelector(state => state.userData.user.email);
    const isLogged = useSelector(state => state.userData.isLogged);

    const completedActivities = useSelector(state => state.userData.user.completed_activities);
    const activities = useSelector(state => state.data.activitiesList);
    const completedLessons = useSelector(state => state.userData.user.completed_lessons);
    const lessons = useSelector(state => state.data.lessonsList);

    // Fonction pour trier les cours et activités par ordre alphabétique en fonction du titre
    const sortedLessons = lessons.slice().sort((a, b) => a.title.localeCompare(b.title));
    const sortedActivities = activities.slice().sort((a, b) => a.title.localeCompare(b.title));

    const [fullProgress, setFullProgress] = useState(0);
    const [lowProgress, setLowProgress] = useState(0);

    useEffect(() => {
        const timer1 = setTimeout(() => setFullProgress(100), 2000);
        const timer2 = setTimeout(() => setLowProgress(13), 2000);
        return () => clearTimeout(timer1, timer2);
    }, []);

    // Redirection si non-connecté
    useEffect(() => {
        !isLogged && navigate('/login');
    }, [isLogged]);

    return (
        <div id="profile-container">
            <div id='box'>
                <div id="forms-container">
                    <h1>Tes informations!</h1>
                    <Forms
                        inputs={[
                            {
                                name: 'usernamePatch',
                                type: 'text',
                                label: 'Pseudo',
                                cond: usernameCondition,
                            },
                            {
                                name: 'emailPatch',
                                type: 'text',
                                label: 'Email',
                                cond: emailCondition,
                            }
                        ]}
                        formName={"usernameInfoPatch"}
                        name={"Modifier informations"}
                        values={{
                            usernamePatch: userName,
                            emailPatch: userEmail
                        }}
                    ></Forms>

                    <Forms
                        inputs={[
                            {
                                name: 'oldPassword',
                                placeholder: 'Ancien mot de passe',
                                type: 'password',
                            },
                            {
                                name: 'password',
                                placeholder: 'Nouveau mot de passe',
                                type: 'password',
                                cond: passwordCondition,
                            },
                            {
                                name: 'ConfirmPassword',
                                placeholder: 'Confirmez le nouveau mot de passe',
                                type: 'password',
                                cond: passwordCondition,
                            }
                        ]}
                        formName={"passwordPatch"}
                        name={"Changer le mot de passe"}
                    ></Forms>

                    {showDeleteForm ? (
                        <Forms
                            setShowDeleteForm={setShowDeleteForm}
                            inputs={[]}
                            formName={"conditionnalDeleteAccount"}
                            name={"Supprimer le compte"}
                        />
                    ) : (
                        <Forms
                            inputs={[
                                {
                                    label: 'Etes-vous sûrs ?',
                                    name: 'passwordDeleteAccount',
                                    placeholder: 'Entrez votre mot de passe',
                                    type: 'password',
                                },
                            ]}
                            formName={"deleteAccount"}
                            name={"Validez"}
                        />
                    )}

                </div>
                <Separator.Root className="SeparatorRoot" />
                <div id='progress-container'>
                    <h1>Ta progression!</h1>
                    <div className='completed-activities'>
                        <h3>Activités</h3>
                        <ul>
                            {sortedActivities.map(({ id, title, slug }) => (
                                <React.Fragment key={id}>
                                    <li className='list' key={id}>
                                        <Link
                                            className='list-item'
                                            to={`/playground/${slug}`}
                                        >{title}</Link>
                                        {completedActivities.some(activity => activity.title === title) ?
                                            <Progress.Root className="ProgressRoot" value={fullProgress}>
                                                <Progress.Indicator
                                                    className="ProgressIndicator"
                                                    style={{ transform: `translateX(-${100 - fullProgress}%)` }}
                                                />
                                            </Progress.Root>
                                            :
                                            <Progress.Root className="ProgressRoot" value={lowProgress}>
                                                <Progress.Indicator
                                                    className="ProgressIndicator"
                                                    style={{ transform: `translateX(-${100 - lowProgress}%)` }}
                                                />
                                            </Progress.Root>
                                        }
                                    </li>
                                    <Separator.Root className="SeparatorRoot sub-separator" />
                                </React.Fragment>
                            ))}
                        </ul>
                    </div>
                    <div className='completed-lessons'>
                        <h3>Cours</h3>
                        <ul className='top-list'>
                            {sortedLessons.map(({ id, title, slug }) => (
                                <React.Fragment key={id}>
                                    <li className='list'>
                                        <Link
                                            className='list-item'
                                            to={`/lesson/${slug}`}>{title}</Link>
                                        {completedLessons.some(lesson => lesson.title === title) ?
                                            <i style={{ color: "green" }} className="fa-solid fa-check"></i>
                                            :
                                            <i style={{ color: "red" }} className="fa-solid fa-x"></i>
                                        }
                                    </li>
                                    <Separator.Root className="SeparatorRoot sub-separator" />
                                </React.Fragment>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User;