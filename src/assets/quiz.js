export const questions = [
    {
        questions: "Quel est le premier homme à avoir marché sur la lune ?",
        incorrectAnswers: [
            "Buzz Aldrin",
            "Elon Musk",
            "Louis Armstrong",
        ],
        correctAnswer: "Neil Armstrong",
        img: "/images/quiz/moon.png"
    },
    {
        questions: "Combien y a-t-il de planètes dans notre système solaire ?",
        incorrectAnswers: [
            "7",
            "9",
            "5",
        ],
        correctAnswer: "8",
        img: "/images/quiz/sky.png"
    },
    {
        questions: "Comment s'appelle notre galaxie ?",
        incorrectAnswers: [
            "Galaxie d'Andromède",
            "Galaxie du Sombrero",
            "Alpha du centaure",
        ],
        correctAnswer: "Voie lactée",
        img: "/images/quiz/galaxy.png"
    },
    {
        questions: "Comment s'appelle la planète qui a des anneaux bien visibles ?",
        incorrectAnswers: [
            "Jupiter",
            "Mercure",
            "La Lune",
        ],
        correctAnswer: "Saturne",
        img: "/images/quiz/saturn.png"
    },
    {
        questions: "Comment s'appelle l'étoile de notre système solaire ?",
        incorrectAnswers: [
            "Mars",
            "Proxima b",
            "Neptune",
        ],
        correctAnswer: "Soleil",
        img: "/images/quiz/planets-sky.png"
    }, 
    {
        questions: "Comment appelle-t-on le voyage dans l'espace effectué par un astronaute ?",
        incorrectAnswers: [
            "Un saut spatial",
            "Une expédition spatiale",
            "Une escapade cosmique",
        ],
        correctAnswer: "Un vol interstellaire",
        img: "/images/quiz/astronaut.png"
    },   
    {
        questions: "Quelle planète est surnommée la planète rouge ?",
        incorrectAnswers: [
            "Neptune",
            "Deimos",
            "Tesla",
        ],
        correctAnswer: "Mars",
        img: "/images/quiz/mars.png"
    },
    {
        questions: "Quelle est la planète la plus proche du Soleil ?",
        incorrectAnswers: [
            "Mars",
            "Vénus",
            "Jupiter",
        ],
        correctAnswer: "Mercure",
        img: "/images/quiz/mercure.png"
    },
    {
        questions: "Qu'est-ce que l'ISS ?",
        incorrectAnswers: [
            "Une sonde spatiale",
            "Une comète",
            "Un télescope spatial",
        ],
        correctAnswer: "Une station spatiale",
        img: "/images/quiz/iss.png"
    },
    {
        questions: "Quel est le plus grand satellite naturel de la Terre ?",
        incorrectAnswers: [
            "Titan",
            "Ganymède",
            "ISS",
        ],
        correctAnswer: "La Lune",
        img: "/images/quiz/planets-random.png"
    },
]
/**
 * 
 * @param {Object} question 
 * @returns {Array} 
 */
export const shuffleAnswers = (question) => {
    /**
     * @param {Array} unShuffleAnswer Questions non-mélangé (Bonne est mauvaise réponses)
     */
    const unShuffleAnswer = [
        question.correctAnswer,
        ...question.incorrectAnswers
    ];

    return unShuffleAnswer
        /** Méthode pour mélanger les questions 
         * @param {Object: function} sort Contient la méthode Math.random()
         * @param {Object: value} answer Contient les questions (incorrectAnswers, correctAnswer)
         * @param {Object} shuffleAnswer Contient  les questions (incorrectAnswers, correctAnswer) mélangé
         */
        .map((answer) => ({sort: Math.random(), value: answer}))
        .sort((incorrectAnswers, correctAnswer) => incorrectAnswers.sort - correctAnswer.sort)
        .map((shuffleAnswer) => shuffleAnswer.value)

}
