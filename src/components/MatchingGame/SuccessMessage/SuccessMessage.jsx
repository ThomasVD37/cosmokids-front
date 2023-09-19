import PropTypes from "prop-types";


const SuccessMessage = ({ itemsCount, attempts, className }) => {

    const errorCount = attempts - itemsCount;
    const messageGenerator = () => {
        let message = ''
        if (errorCount === 0) {
            return message = 'Félicitations! tu as tout trouvé du premier coup!'
        }
        if (errorCount <= 2) {
            return message = `Bravo! tu y étais presque! Tu n'as fait que ${errorCount} ${errorCount === 1 ? 'erreur' : 'erreurs'}!`
        }
        if (errorCount > 2) {
            return message = `Attention! Tu as fait ${errorCount} erreurs, tu devrais peut-être réviser!`
        }

        return message
    }

    return <div className={className}>
        {messageGenerator()}
    </div>;
}

SuccessMessage.propTypes = {
    itemsCount: PropTypes.number,
    attempts: PropTypes.number,
    className: PropTypes.string
}

export default SuccessMessage;
