import * as Accordion from "@radix-ui/react-accordion";
import * as Popover from "@radix-ui/react-popover";
import './Left_panel_mobile.scss'
import PropTypes from 'prop-types';
import { forwardRef } from "react";


const AccordionTrigger = forwardRef(({ children, ...props }, forwardedRef) => (
    <Accordion.Header className="AccordionHeader">
        <Accordion.Trigger
            className="AccordionTrigger"
            {...props}
            ref={forwardedRef}
        >
            {children}
        </Accordion.Trigger>
    </Accordion.Header>
));


const Left_panel_mobile = ({ rules, description, title }) => {

    return (

        <section className="left_panel_mobile">
            <Popover.Root>
                <Popover.Trigger className="left_menu_button" asChild>
                    <i className="fa-solid fa-ruler"></i>
                </Popover.Trigger>
                <Popover.Portal>
                    <Popover.Content className="LeftPopoverContent" alignOffset={10} side="bottom" sideOffset={10} avoidCollisions={false} align="end">
                        <div className="left_panel__description">
                            <h4>{title}</h4>
                            <Accordion.Root className="LeftAccordionRoot" type="single" defaultValue="item-1" orientation="vertical" collapsible>
                                <Accordion.Item className="AccordionItem" value="item-1">
                                    <AccordionTrigger>
                                        <i className="fa-solid fa-ruler"></i>Règles
                                    </AccordionTrigger>
                                    <Accordion.Content className="AccordionContent">
                                        {rules}
                                    </Accordion.Content>
                                </Accordion.Item>

                                <Accordion.Item className="AccordionItem" value="item-2">
                                    <AccordionTrigger>
                                        <i className="fa-solid fa-pencil"></i>Description
                                    </AccordionTrigger>
                                    <Accordion.Content className="AccordionContent">
                                        {description}
                                    </Accordion.Content>
                                </Accordion.Item>
                            </Accordion.Root>
                        </div>
    
                        <Popover.Close className="PopoverClose" aria-label="Close">
                            <i className="fa-solid fa-xmark"></i>
                        </Popover.Close>
                    </Popover.Content>
                </Popover.Portal>
            </Popover.Root>

        </section>

    )
}

AccordionTrigger.propTypes = {
    children: PropTypes.node,
};

Left_panel_mobile.propTypes = {
    rules: PropTypes.string,
    description: PropTypes.string,
    title: PropTypes.string,
    // type: PropTypes.string,
    // duration: PropTypes.number,
};


export default Left_panel_mobile;