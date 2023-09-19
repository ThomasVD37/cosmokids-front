import * as ScrollArea from "@radix-ui/react-scroll-area";
import PropTypes from 'prop-types';
import './Left_panel.scss'



const Left_panel = ({ rules, description }) => {

    return (

        <section className="left_panel">
            <div className="left_panel__rules">
                <div className="title">
                    <i className="fa-solid fa-ruler"></i><h3>Règles</h3>
                </div>
                <ScrollArea.Root className="ScrollAreaRoot">
                    <ScrollArea.Viewport className="ScrollAreaViewport">
                        {rules}
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
                        <ScrollArea.Thumb className="ScrollAreaThumb" />
                    </ScrollArea.Scrollbar>
                </ScrollArea.Root>
            </div>
            <div className="left_panel__description">
                <div className="title">
                    <i className="fa-solid fa-pencil"></i><h3>Description</h3>
                </div>
                <ScrollArea.Root className="ScrollAreaRoot">
                    <ScrollArea.Viewport className="ScrollAreaViewport">
                        {description}
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
                        <ScrollArea.Thumb className="ScrollAreaThumb" />
                    </ScrollArea.Scrollbar>
                </ScrollArea.Root>
            </div>
        </section>
    )
}

Left_panel.propTypes = {
    rules: PropTypes.string,
    description: PropTypes.string,
};


export default Left_panel;