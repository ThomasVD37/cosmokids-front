import { useDroppable } from '@dnd-kit/core';
import PropTypes from "prop-types";
import styles from './droppable.module.scss';
function Droppable(props) {
    const { isOver, setNodeRef } = useDroppable({
        id: props.id,
    });
    const style = {
        opacity: isOver ? 1 : 0.7,
        border: props.filled ? "none" : (isOver ? '5px #FFB703 dashed' : '5px black dashed'),
        color: props.filled ? " none" : (isOver ? '#FFB703' : "black"),
        transform: props.filled ? "none" : (isOver ? 'scale(1.1)' : "none"),
    };

    return (
        <div ref={setNodeRef} className={styles.droppableZone} style={style}>
            {props.children}
        </div>
    );
}

Droppable.propTypes = {
    id: PropTypes.string,
    children: PropTypes.object,
    filled: PropTypes.bool
}


export default Droppable
