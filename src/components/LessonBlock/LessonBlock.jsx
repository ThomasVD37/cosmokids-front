import PropTypes from "prop-types";
import "./LessonBlock.scss"
import { useWindowWidth } from '@react-hook/window-size'

const LessonBlock = ({
    title,
    image,
    content,
    excerptSize,
    className,
    onClick,
}) => {
    
    const WindowWidth = useWindowWidth();
    WindowWidth <= 1724? excerptSize = 100 : ''
    WindowWidth <= 1248 ? excerptSize = 70 : ''
    
    let excerpt = '';
    content ? excerpt = content.substring(0, excerptSize) + "..." : '';
    WindowWidth <= 524 ? excerpt = '' : excerpt;

    return (
        <div className={className} onClick={onClick}>
            <p>{excerpt}</p>
            <img src={image} alt={title} className="image"/>
            <h2>{title}</h2>
            {WindowWidth <= 524 && <span className="type">Cours</span>}
        </div>
    );
};

LessonBlock.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    excerptSize: PropTypes.number,
    className: PropTypes.string,
    onClick: PropTypes.func,
};
export default LessonBlock;
