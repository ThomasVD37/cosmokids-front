import { Link } from 'react-router-dom';
import image404 from '/images/image404_2.png'
import './NotFound.scss'

const NotFound = () => {

    return (
        <div className="notFoundContainer">
            <img src={image404} alt='page non trouvée' />
            <p>Il semblerait que la page demandée se soit perdue dans le cosmos ...</p>
            <button><Link to={'/home'}>Retour vers l&#39;accueil</Link></button>
        </div>
    )
}

export default NotFound;