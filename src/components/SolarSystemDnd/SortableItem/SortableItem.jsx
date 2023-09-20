import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import PropTypes from "prop-types";

export const SortableItem = ({ id }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const currentImage = '/images/planets/' + id + '.jpg';

    return (
        <div className='sortableItem' ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <div className="itemContainer" style={{
                backgroundImage: `url(${currentImage})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                width: '100%',
                height: '100%'
            }}>
                <p>{id}</p>

            </div>
        </div>
    );
}

SortableItem.propTypes = {
    id: PropTypes.string,
}