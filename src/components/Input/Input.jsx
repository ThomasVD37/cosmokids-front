import PropTypes from "prop-types";
import { useState, forwardRef } from 'react';
import Hide from '/images/icon/input/hide.png'
import Show from '/images/icon/input/show.png'
import styles from './input.module.scss'


/**
 * Permet de changer le type en 'text' lors du click lors du click de l'îcon
 * @param {function} setType Attribue le type de l'input soit en 'password' ou 'text'
 * @param {string} types State qui change d'état
 * @returns {ShowPassword} Composant
 */
const ShowPassword = ({ types, setType }) => {
    return (
        <img src={types === "password" ? Hide : Show} className={styles.show} onClick={() => { types == "password" ? setType('text') : setType('password') }} />
    )
};

ShowPassword.propTypes = {
    types: PropTypes.string,
    setType: PropTypes.func,
}
/**
 * Champ de formulaire
 * @param {string} placeholder Assigne une indication sur le champ  du formulaire
 * @param {string} type Assigne le type de champ de l'input
 * @param {string} register Envoie les données du champs au formulaire
 * @param {function} forwardRef méthode pour obtenir le ref qui lui a été transmis et définit le refprop sur un inputélément. Prends 2 argument: (props, ref)
 * @returns {Input} Composant
 */
const Input = forwardRef(({ placeholder, type, register }, ref) => {
    const [types, setType] = useState(type);

    return (
        <div className={type === 'password' ? styles.containerPassword : styles.container}>
            <input
                className={styles.inputElement}
                ref={ref}
                placeholder={placeholder}
                type={types}
                {...register}
            />
            {(type == 'password' && <ShowPassword types={types} setType={setType} />)}
        </div>
    )
})
Input.propTypes = {
    placeholder: PropTypes.string,
    type: PropTypes.string,
    register: PropTypes.object,
}

export default Input;


