import Forms from "../../components/Form/Form";
import styles from "./register.module.scss";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { emailCondition, passwordCondition, usernameCondition } from "./RegisterCondition";
import { useSelector } from "react-redux";
import { useEffect } from "react";
/**
 * Formulaire de connexion pour se connecter en tant que utilisateur
 * @property {Array: Object} inputs Configure le formulaire
 * @property {string} name Assigne le nom du button du formulaire
 * @property {Object: emailCondition, passwordCondition, usernameCondition } cond Assigne les conditions du formulaire
 * @returns {Login} Composant
 */
const Register = () => {

    const navigate = useNavigate();
    const isLogged = useSelector(state => state.userData.isLogged);

    useEffect(() => {
        isLogged && navigate('/home');
    }, [isLogged]);


    return (
        <div className={styles.containerRegister}>
            <div className={styles.ContainerForm}>
                <h3>Inscription</h3>
                <Forms
                    inputs={[
                        {
                            name: 'email',
                            placeholder: 'Renseignez un e-mail',
                            type: 'text',
                            label: 'E-mail',
                            cond: emailCondition
                        },
                        {
                            name: 'pseudo',
                            placeholder: 'Renseignez votre pseudo',
                            type: 'text',
                            label: 'Pseudo',
                            cond: usernameCondition
                        },
                        {
                            name: 'password',
                            placeholder: 'Renseignez un mot de passe',
                            type: 'password',
                            label: 'Mot de passe',
                            cond: passwordCondition
                        },
                        {
                            name: 'ConfirmPassword',
                            placeholder: 'Confirmez votre mot de passe',
                            type: 'password',
                            label: 'Mot de passe',
                        },

                    ]}
                    formName={'register'}
                    name={"S'inscrire"}
                />
                <div className={styles.containerRedirect}>
                    <span>Vous avez déjà un compte ?</span>
                    <span>
                        <NavLink to="/login" className={styles.linkRegister}>Connectez-vous</NavLink>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Register;