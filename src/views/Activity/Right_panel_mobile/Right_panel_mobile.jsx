import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as Popover from "@radix-ui/react-popover";
import './Right_panel_mobile.scss'

import PropTypes from 'prop-types';


const Right_panel_mobile = ({ associated_lessons }) => {

    return (

        <section className="right_panel_mobile">
            <Popover.Root>
                <Popover.Trigger className="right_menu_button" asChild>
                    <i className="fa-solid fa-pencil"></i>
                </Popover.Trigger>
                <Popover.Portal>
                    <Popover.Content className="rightPopoverContent" alignOffset={10} side="top" sideOffset={10} avoidCollisions={false} align="end">
                        <div className="right_panel__help">
                            <h3>Aide</h3>
                            <ScrollArea.Root className="rightScrollAreaRoot">
                                <ScrollArea.Viewport className="mobileScrollAreaViewport">
                                    <div className="associated_lessons">
                                        {associated_lessons.length === 0 ?
                                            <p>Il n&#39;a pas encore de leçons associées avec cette activité :/</p> :
                                            associated_lessons.map(lesson => {
                                                return (
                                                    <div className="associated_lessons__block" key={lesson.id}>
                                                        <h4>{lesson.title}</h4>
                                                        <p>Cours</p>
                                                        <img src={lesson.image} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </ScrollArea.Viewport>
                                <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="horizontal">
                                    <ScrollArea.Thumb className="ScrollAreaThumb" />
                                </ScrollArea.Scrollbar>
                            </ScrollArea.Root>
                        </div>
                        <Popover.Close className="rightPopoverClose" aria-label="Close">
                            <i className="fa-solid fa-xmark"></i>
                        </Popover.Close>
                    </Popover.Content>
                </Popover.Portal>
            </Popover.Root>

        </section >

    )
}

Right_panel_mobile.propTypes = {
    associated_lessons: PropTypes.array,
};


export default Right_panel_mobile;