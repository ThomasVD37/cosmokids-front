

const useTranslation = async (text) => {
    console.log(!text);
    if (!text) return "";
    try {
        const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=AIzaSyCErrlEjJaUP8n09S9Aurg5H1UCKcYoaf4&q=${text}&source=en&target=fr`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        });
        const {data} = await response.json();
        const translatedText = data.translations[0].translatedText;
        console.log(data.translations[0].translatedText);
        return translatedText
    } catch (error) {
        console.log(error);
        return text;
    };
}

export default useTranslation;