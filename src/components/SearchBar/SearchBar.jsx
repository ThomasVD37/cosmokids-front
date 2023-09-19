import { useRef } from "react";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";
import Turnstone from "turnstone";

import styles from "./searchbar.module.scss";

const Searchbar = ({ lessonData, activityData }) => {
    const navigate = useNavigate();
    const turnstoneRef = useRef();
    const listbox = [
        {
            name: "Cours",
            data: lessonData.map((lesson) => ({ ...lesson, kind: "lesson" })),
            searchType: "contains",
        },
        {
            name: "Activités",
            data: activityData.map((activity) => ({
                ...activity,
                kind: "playground",
            })),
            searchType: "contains",
        },
    ];
    return (
        /**
         * composant de la librairie Turnstone
         * ref : necessary to clear the onSelect
         * listbox : serve to import the data
         * matchText : If true any text in listbox items that matches the user's current search query is wrapped in a <strong> element.
         * onSelect : select the item with a click
         * onEnter : select the item with keyboard
         *
         * doc : https://github.com/tomsouthall/turnstone
         */
        <Turnstone
            ref={turnstoneRef}
            id="search"
            name=""
            listbox={listbox}
            matchText={true}
            placeholder="Rechercher"
            styles={styles}
            onSelect={(selectedItem) => {
                if (selectedItem === null || selectedItem === undefined) {
                    return;
                }
                turnstoneRef.current?.clear();

                navigate(`/${selectedItem.kind}/${selectedItem.slug}`);
            }}
            onEnter={(query, selectedItem) => {
                if (selectedItem === null || selectedItem === undefined) {
                    return;
                }
                turnstoneRef.current?.clear();

                navigate(
                    `/${selectedItem.value.kind}/${selectedItem.value.slug}`
                );
            }}
            noItemsMessage="Nous n'avons pas trouvé de réponse à votre recherche"
        />
    );
};

Searchbar.propTypes = {
    lessonData: PropTypes.array,
    activityData: PropTypes.array,
};

export default Searchbar;
