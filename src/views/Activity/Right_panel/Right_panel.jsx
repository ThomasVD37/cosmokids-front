import * as ScrollArea from "@radix-ui/react-scroll-area";
import './Right_panel.scss'
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";



const Right_panel = ({ associated_lessons }) => {

    return (

        <section className="right_panel">
            <div className="right_panel__help">
                <div className="title">
                    <i className="fa-solid fa-circle-question"></i><h3>Un peu d&#39;aide ?</h3>
                </div>
                <ScrollArea.Root className="ScrollAreaRoot">
                    <ScrollArea.Viewport className="ScrollAreaViewport">
                        <div className="associated_lessons">
                            {associated_lessons.length === 0 ?
                                <p>Il n&#39;y a pas encore de leçons associées avec cette activité :/</p> :
                                associated_lessons.map(lesson => {
                                    return (
                                        <Link to={`/lesson/${lesson.slug}`} className="associated_lessons__block" key={lesson.id}>
                                            <h4>{lesson.title}</h4>
                                            <p>Cours</p>
                                            <img src={lesson.image} />
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
                        <ScrollArea.Thumb className="ScrollAreaThumb" />
                    </ScrollArea.Scrollbar>
                    <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="horizontal">
                        <ScrollArea.Thumb className="ScrollAreaThumb" />
                    </ScrollArea.Scrollbar>
                </ScrollArea.Root>
            </div>
        </section>

    )
}

Right_panel.propTypes = {
    associated_lessons: PropTypes.array,
};

export default Right_panel;