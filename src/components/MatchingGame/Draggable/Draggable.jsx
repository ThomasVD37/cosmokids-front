import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import PropTypes from "prop-types";
import styles from './draggable.module.scss'

function Draggable(props) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: props.id,
        disabled: props.disabled,

    });
    const style = {
        // Outputs `translate3d(x, y, 0)`
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.6 : 1,
    };

    return (
        <div ref={setNodeRef} className={styles.draggableItem} style={style} {...listeners} {...attributes}>
            {props.children}
        </div>
    );
}

Draggable.propTypes = {
    id: PropTypes.string,
    disabled: PropTypes.bool,
    children: PropTypes.object
}

export default Draggable;