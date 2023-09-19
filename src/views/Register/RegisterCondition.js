export const emailCondition = {
    required: "Merci de remplir votre e-mail.",
    pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Votre e-mail est invalide."
    },
    maxLength: {
        value: 40,
        message: "Votre email doit être inférieur à 40 caractères"
    }
};

export const usernameCondition = {
    required: "Merci de remplir un pseudo.",
    minLength: {
        value: 4,
        message: "Votre pseudo doit être supêrieur à 4 caractères."
    },
    maxLength: {
        value: 15,
        message: "Votre pseudo doit être inférieur à 15 caractères."
    }
};

export const passwordCondition = {
    required: "Merci de remplir un Mot de passe.",
    pattern: {
        // Regex pour le mot de passe doit contenir au moins huit caractères, au moins un chiffre et des lettres minuscules et majuscules et des caractères spéciaux
        value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        message: "Doit contenir au moins 8 caractères, 1 chiffre, des minuscules, majuscules et des caractères spéciaux"
    },
    minLength: {
        value: 8,
        message: "Votre mot de passe doit être supêrieur à 8 caractères."
    },
    maxLength: {
        value: 255,
        message: "Votre mot de passe doit être inférieur à 255 caractères."
    }
};


