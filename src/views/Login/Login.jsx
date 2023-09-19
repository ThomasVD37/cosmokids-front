import Forms from "../../components/Form/Form";
import styles from "./login.module.scss"
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { emailCondition } from "../Register/RegisterCondition";
import { useEffect } from "react";
import { useSelector } from "react-redux";
/**
 * Formulaire de connexion pour se connecter en tant que utilisateur
 * @property {Array: Object} inputs Configure le formulaire
 * @property {string} name Assigne le nom du button du formulaire
 * @returns {Login} Composant
 */
const Login = () => {

    const navigate = useNavigate();
    const isLogged = useSelector(state => state.userData.isLogged);

    useEffect(() => {
        isLogged && navigate('/home');
    }, [isLogged]);

    return (
        <div className={styles.containerLogin}>
            <div className={styles.ContainerForm}>
                <h3>Connexion</h3>
                <Forms
                    inputs={[
                        {
                            name: 'email',
                            placeholder: 'Entrez votre e-mail',
                            type: 'text',
                            label: 'E-mail',
                            cond: emailCondition
                        },
                        {
                            name: 'password',
                            placeholder: 'Entrez votre mot de passe',
                            type: 'password',
                            label: 'Mot de passe',
                        }
                    ]}
                    formName={"login"}
                    name={"Se connecter"}
                />
                <div className={styles.containerRedirect}>
                    <span>Vous n&#39;avez pas  de compte ?</span>
                    <span>
                        <NavLink to="/signup" className={styles.linkRegister}>Inscrivez-vous </NavLink>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Login;