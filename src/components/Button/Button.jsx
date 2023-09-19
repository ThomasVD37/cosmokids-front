import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./button.module.scss"
/**
 * reusable button for page redirection
 * @param {string} name visible text to user
 * @param {string} path path for the new page
 * @returns
 */
export const ButtonLink = ({ name, path, className }) => {
    return (
        <Link to={path} className={className}>
            {name}
        </Link>
    );
};

ButtonLink.propTypes = {
    name: PropTypes.string,
    path: PropTypes.string,
    className: PropTypes.string,
};

export const ButtonMain = ({children, onClick}) => {
    return (
        <button className={styles.Button} onClick={onClick}>
            {children}
        </button>
    )
};

ButtonMain.propTypes = {
    children: PropTypes.string,
    onClick: PropTypes.func,
};