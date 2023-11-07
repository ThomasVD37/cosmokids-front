import { useEffect, useState } from "react"

/**
 * @property {string} NASA_API_KEY Token officiel pour accéder à l'API, limité à 1 000 requête par heure.
 * @property {string} DEMO_KEY Token de Démo, s'en servir pour faire des teste uniquement, limité à 30 reques pas heure / 50 par jours (Cette key fonctionne avec votre IP)
 * Si l'API renvoie un object vide il se peut que toutes les requetes soient consommer 
 * @returns 
 */
export const useFetchPictureOfDay = () => {
    const [dataAPI, setDataAPI] = useState({})
    
    const fetchPictureOfDay = async () => {
        
        // const config = { 
        //     NASA_API_KEY: 'clDhCE5FxaGPbhEYgXpGF2tbqRLHjFP8bSbtfnmB', 
        //     DEMO_KEY: 'DEMO_KEY'
        // }

        const url = 'https://images-api.nasa.gov/search?q=planet'

        // const api_key = config.NASA_API_KEY

        try {
            const response = await fetch(`${url}`)

            if (response.status === 200) {
                setDataAPI( await response.json())
            }
            else{
                data.error && console.error(`Code: ${data.error.code} | Message: ${data.error.message} `)
            }


        } catch (error) {
          }
    }

    useEffect(() => {
        fetchPictureOfDay()
    }, [])

    return dataAPI;
}