// import { useDispatch } from 'react-redux';
// import {
//     // incrementCorrect,
//     // incrementTotal,
//     // resetGame,
//     // setRandomDraggableItems,
//     // setItemDropped,
//     // setDraggedItem,
// } from './../../store/reducers/matchingGameReducer';

import styles from './matchingGame.module.scss';
import images from './../../assets/icon/matchingGame';
import { useEffect, useState } from 'react';
import { spaceItems } from './../../assets/matchingDatas';

const TotalDraggableItems = 4;
const TotalMatchingPairs = 4;

/**
 *
 * @param {number} nbrItems
 * @param {array} originalArray game datas
 * @returns
 */
const generateRandomItemsArray = (nbrItems, originalArray) => {
    let itemsArray = [];
    let clonedArray = [...originalArray];
    if (nbrItems > clonedArray.length) nbrItems = clonedArray.length;
    for (let i = 1; i <= nbrItems; i++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length);
        itemsArray.push(clonedArray[randomIndex]);
        clonedArray.splice(randomIndex, 1);
    }
    return itemsArray;
};

const MatchingGame = () => {
    // const correct = useSelector((state) => state.matchingGame.correct);
    // const total = useSelector((state) => state.matchingGame.total);
    // const draggedItem=useSelector((state)=>state.matchingGame.draggedItem);
    // const randomDraggableItems = useSelector(
    //     (state) => state.matchingGame.randomDraggableItems
    // );
    
    const [correct, setCorrect] = useState(0);
    const [total, setTotal] = useState(0);
    const [randomDraggableItems, setRandomDraggableItems] = useState([])
    const [draggedItem, setDraggedItem] = useState(null);

    useEffect(() => {
        randomDraggableItems.forEach(item=>setItemDropped( item.iconName, false ))
    }, [])
    
    // const dispatch = useDispatch();

    useEffect(() => {
        // Generate random draggable items only if not already generated
        if (randomDraggableItems.length === 0) {
            setRandomDraggableItems(
                generateRandomItemsArray(TotalDraggableItems, spaceItems)
            )
           
            
            
        }
    }, [randomDraggableItems]);

    const randomDroppableItems =
        TotalMatchingPairs < TotalDraggableItems
            ? generateRandomItemsArray(TotalMatchingPairs, randomDraggableItems)
            : randomDraggableItems;

    const alphabeticallySortedRandomDroppableItems = [
        ...randomDroppableItems,
    ].sort((a, b) =>
        a.itemName.toLowerCase().localeCompare(b.itemName.toLowerCase())
    );
    
    useEffect(() => {
        setRandomDraggableItems(
            generateRandomItemsArray(TotalDraggableItems, spaceItems)
        );
    }, [setRandomDraggableItems]);
            
            
            
    const setItemDropped = (iconName, dropped)=> {
        const item = randomDraggableItems.find(
            (item) => item.iconName === iconName
        );
        if (item) {
            item.dropped = dropped;
        }
    };

    const handleDrop = (event, iconName) => {
        event.preventDefault();
        event.target.classList.remove(styles.droppableHover);

        const matchedItem = randomDraggableItems.find((item) => {
            return item.iconName === draggedItem;
        });


        if (!matchedItem) return;
        
        const isCorrectMatching =
            matchedItem.iconName === event.target.getAttribute('data-item');
        setTotal(total + 1);

        if (isCorrectMatching) {
            event.target.classList.add(styles.dropped);
            setCorrect(correct + 1);
            // dispatch(setItemDropped({ iconName, dropped: true }));
            setItemDropped(iconName, true)
        }
        else {
            setItemDropped( iconName, false );
        }
    };


    const isGameCompleted =
        correct === Math.min(TotalMatchingPairs, TotalDraggableItems);
    /**
     * animation
     * @param {function} event
     *
     */
    const handleDragEnter = (event) => {
        event.preventDefault();
        if (
            event.target.classList.contains(styles.droppable) &&
            !event.target.classList.contains(styles.dropped)
        ) {
            event.target.classList.add(styles.droppableHover);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };
    /**
     *
     * @param {*} event
     */
    const handleDragLeave = (event) => {
        event.preventDefault();
        if (
            event.target.classList.contains(styles.droppable) &&
            !event.target.classList.contains(styles.dropped)
        ) {
            event.target.classList.remove(styles.droppableHover);
        }
    };

    const handleDragStart = (event, iconName) => {
        event.dataTransfer.setData('text', iconName);
        setDraggedItem(iconName);
    };

    const playAgain = () => {
        setCorrect(0);
        setTotal(0);
        setRandomDraggableItems([]);
    };

    return (
        <div>
            <div className={styles.draggableItems}>
                {randomDraggableItems.map((item) => (
                    <img
                        key={item.iconName}
                        src={images[item.iconName]}
                        className={styles.draggable}
                        draggable='true'
                        onDragStart={(event) =>
                            handleDragStart(event, item.iconName)
                        }
                        onTouchStart={(event) =>
                            handleDragStart(event, item.iconName)
                        }
                    />
                ))}
            </div>
            <div className={styles.matchingPairs}>
                {alphabeticallySortedRandomDroppableItems.map((item) => (
                    <div
                        key={item.iconName}
                        className={styles.matchingPair}
                        onDragEnter={handleDragEnter}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={(event) => handleDrop(event, item.iconName)}
                        onTouchCancel={(event) => handleDrop(event, item.iconName)}
                    >
                        <span className={styles.label}>{item.itemName}</span>
                        {item.dropped ? (
                            <img
                                src={images[item.iconName]}
                                alt={item.itemName}
                            />
                        ) : (
                            <span
                                className={styles.droppable}
                                data-item={item.iconName}
                            ></span>
                        )}
                    </div>
                ))}
            </div>
            <div className={styles.score}>
                <span className={styles.correct}>{correct}</span> /{' '}
                <span className={styles.total}>{total}</span>
                {isGameCompleted && (
                    <span>
                        <button
                            className={styles.playAgainBtn}
                            onClick={playAgain}
                        >
                            Play Again
                        </button>
                    </span>
                )}
            </div>
        </div>
    );
};

export default MatchingGame;
