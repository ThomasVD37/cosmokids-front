
import { useState } from 'react';
import './SolarSystemDnd.scss'
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';

import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

import { SortableItem } from './SortableItem/SortableItem';
import { useCompleteActivity } from '../../hooks/useCompleteActivity';

/**
 * Array shuffle function
 * @param {array} array 
 * @returns {array}
 */
const randomizeArray = (array) => {
    // let array = [...ary];
    for (let index = array.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
    }

    return array
}

const SolarSystemDnd = () => {

    const SolarSystem = [
        "Mercure",
        "Venus",
        "Terre",
        "Mars",
        "Jupiter",
        "Saturne",
        "Uranus",
        "Neptune",
    ];

    const [items, setItems] = useState(randomizeArray([...SolarSystem]));
    const [moves, setMoves] = useState(0);
    const [checks, setChecks] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);

    const isGameOver = correctAnswers === SolarSystem.length;

    useCompleteActivity(isGameOver);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const checkResult = () => {
        setChecks(checks + 1);
        setCorrectAnswers(0);
        let i = 0
        for (const name of SolarSystem) {
            if (name === items[i]) {
                setCorrectAnswers(correctAnswers => correctAnswers + 1)
            }
            i++
        }
    }

    const handleReplay = () => {
        setMoves(0);
        setCorrectAnswers(0);
        setChecks(0);
        setItems(randomizeArray([...SolarSystem]))
    }

    return (

        <div className="solarSystemGame">
            <div className='test'>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <div className="gameContainer">
                        <SortableContext
                            items={items}
                            strategy={horizontalListSortingStrategy}
                        >
                            {items.map((planet) => <SortableItem key={planet} id={planet} />)}

                        </SortableContext>
                    </div>

                </DndContext>
                <div className="resultContainer">
                    <div className="currentResult">
                        {!isGameOver && <button onClick={() => checkResult()}>Vérifier mes réponses</button>}
                        <p>Bonnes positions : <strong>{correctAnswers} / {SolarSystem.length}</strong></p>
                        <p>Mouvements : <strong>{moves}</strong></p>
                    </div>
                    {isGameOver &&
                        <div className='winBox'>
                            <p>Bravo ! Tu as réussi en {checks} essais</p>
                            <button onClick={() => handleReplay()}>Rejouer</button>
                        </div>
                    }
                </div>
            </div>
        </div>

    );

    function handleDragEnd(event) {
        const { active, over } = event;
        setMoves(moves => moves + 1)

        if (active.id !== over.id) {
            setItems((items) => {

                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }
}

export default SolarSystemDnd;


// const itemIds = useMemo(() => items.map((item) => item.id), [items]);

// const SolarSystem = [
//     { name: "Mercure", position: 0 },
//     { name: "Venus", position: 1 },
//     { name: "Terre", position: 2 },
//     { name: "Mars", position: 3 },
//     { name: "Jupiter", position: 4 },
//     { name: "Saturne", position: 5 },
//     { name: "Uranus", position: 6 },
//     { name: "Neptune", position: 7 }
// ];

/* {items.map((planet) => <SortableItem key={planet.name} id={planet.name} name={planet.name} position={planet.position}/>)} */

// useEffect(() => {
//     setItems(randomizeArray(SolarSystem))
// }, [])

// const oldIndex = items.findIndex(item => item.name === active.id);
// const newIndex = items.findIndex(item => item.name === over.id);