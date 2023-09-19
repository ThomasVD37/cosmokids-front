import PropTypes from "prop-types";
import { useWindowWidth } from '@react-hook/window-size'
import './ActivityBlock.scss'

const ActivityBlock = ({
    title,
    description,
    excerptSize,
    rules,
    image,
    duration,
    type,
    className,
    display,
    onClick,
}) => {

    const WindowWidth = useWindowWidth();
    const durationTime = Math.ceil(duration / 60) + " Min"
    
    WindowWidth <= 1724 ? excerptSize = 100 : ''
    WindowWidth <= 1248 ? excerptSize = 45 : ''

    let excerpt = '';
    description ? excerpt = description.substring(0, excerptSize) + "..." : '';
    WindowWidth <= 524 ? excerpt = '' : excerpt;

    return (
        <div className={className} onClick={onClick}>
            <p>{excerpt}</p>
            <h2>{title}</h2>
            {!display === "list" ? <p>{rules}</p> : null}

            <img src={image} alt={title} className='image'/>
            <span className="duration"><i className="fa-solid fa-clock fa-sm"></i>&emsp;{durationTime}</span>
            <span className="type">{type.name}</span>
        </div>
    );
};

ActivityBlock.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    rules: PropTypes.string,
    image: PropTypes.string,
    duration: PropTypes.number,
    excerptSize: PropTypes.number,
    type: PropTypes.object,
    display: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default ActivityBlock;
