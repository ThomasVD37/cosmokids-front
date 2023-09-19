import { useEffect, useState } from "react";

/**
 * Randomise the order of a given array
 * @param {array} arrayToShuffle array to shuffle
 * @param {number} nbrOfItems
 * @returns {array} Array with the nbrOfItems entries
 */
export const useArrayRandomiser = (arrayToShuffle, nbrOfItems) => {

    const [shuffledArray, setShuffledArray] = useState([]);

    useEffect(() => {
        let array = [...arrayToShuffle];
        for (let index = array.length - 1; index > 0; index--) {
            const randomIndex = Math.floor(Math.random() * (index + 1));
            [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
        }

        const homeItems = array.slice(0, nbrOfItems);
        setShuffledArray(homeItems);
    }, [arrayToShuffle, nbrOfItems]);

    return shuffledArray;
};
