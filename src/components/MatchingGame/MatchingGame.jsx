import { useEffect, useState } from 'react'
import { DndContext } from '@dnd-kit/core';
import PropTypes from "prop-types";


import Draggable from './Draggable/Draggable';
import Droppable from './Droppable/Droppable';
import PlayAgain from './PlayAgain/PlayAgain';


import images from './../../assets/icon/matchingGame';
import spaceItems from './../../assets/matchingDatas';
import styles from './matchingGame.module.scss'
import SuccessMessage from './SuccessMessage/SuccessMessage';
import { useCompleteActivity } from '../../hooks/useCompleteActivity';

//import { handleDragEnd } from './Test/functions/functions';

/**
 * Array shuffle function
 * @param {array} array 
 * @returns {array}
 */
const randomizeArray = (ary) => {
    let array = [...ary];
    for (let index = array.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
    }

    return array
}
/**
 * gives the boolean false to each element of the array.
 * @returns {array}
 */
const getDefaultItems = (spaceItemsSession) => spaceItemsSession.reduce((acc, item) => {
    acc[item.iconName] = false;
    return acc;
}, {});

const MatchingGame = () => {
    const [attempts, setAttempts] = useState(0);
    const [items, setItems] = useState({});
    const [setup, setSetup] = useState(false)

    const [spaceItemsSession, setSpaceItemsSession] = useState([])
    const [spaceItemsSessionRandomized, setSpaceItemsSessionRandomized] = useState([])


    useEffect(() => {
        if (setup === false) {
            // limit the size of the array to 4
            const tmp = randomizeArray(spaceItems).splice(0, 4)
            setSpaceItemsSession(tmp)
            setItems(getDefaultItems(tmp))
            setSpaceItemsSessionRandomized(randomizeArray(tmp))
            setSetup(true)
        }
    }, [setup])


    const draggableItems = spaceItemsSession.map(({ iconName, itemName }) => {
        if (items[iconName] === true)
            return null

        return (
            <Draggable key={iconName} id={iconName} disabled={items[iconName]}>
                <img src={images[iconName]} alt={itemName} />
            </Draggable>
        )
    }
    );


    const droppableItems = spaceItemsSessionRandomized.map(({ iconName, itemName }) => {

        return (

            <Droppable key={iconName} id={`${iconName}-container`} filled={items[iconName] === true}>
                <div className={styles.droppable}>

                    {items[iconName] === true ? <img src={images[iconName]} style={{ padding: 20 }} /> : <span style={{}}>{itemName}</span>}
                </div>
            </Droppable>
        )
    })


    function handleDragEnd(props) {
        const { over, active } = props

        if (over && active) {
            setAttempts((prev) => prev + 1)

            if (over.id.includes(active.id)) {
                setItems({ ...items, [active.id]: true })
            }
        }
    }
    const resetGame = () => {
        setSetup(false)
        setAttempts(0)
    }



    let itemsCount = Object.keys(items).length
    const matchItemsCount = Object.keys(items).filter((key) => items[key] === true).length;
    let isGameOver = false
    isGameOver = itemsCount === matchItemsCount

    //console.log(isGameOver, itemsCount, matchItemsCount)
    //useCompleteActivity(isGameOver);

    return (
        <div className={styles.matchingContainer} >
            <DndContext onDragEnd={handleDragEnd}>
                <div className={styles.gameItemsContainers}>
                    <div className={styles.draggableItemsContainer} >
                        {draggableItems}
                    </div>
                    <div className={styles.droppableZoneContainer} >
                        {droppableItems}
                    </div>
                </div>
            </DndContext>
            <div className={styles.score}>
                {matchItemsCount} / {itemsCount}
            </div>

            {isGameOver ? <div className={styles.messageContainer}>
                <SuccessMessage className={styles.successMessage} attempts={attempts} itemsCount={itemsCount} />
                {PlayAgain(resetGame)}
            </div> : null}
        </div>
    );
};

MatchingGame.propTypes = {
    id: PropTypes.string,
    children: PropTypes.string,
    over: PropTypes.bool,
    active: PropTypes.bool

}
export default MatchingGame;

