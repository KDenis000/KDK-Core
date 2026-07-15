import axios from "axios";


export async function searchInformation(query){

    try{


        const response = await axios.get(
            "https://api.duckduckgo.com/",
            {
                params:{
                    q:query,
                    format:"json"
                }
            }
        );


        return {

            source:"DuckDuckGo",
            answer:
            response.data.AbstractText ||
            "No information found",

            related:
            response.data.RelatedTopics

        };


    }

    catch(error){

        console.log(error);

        return {

            source:"System",
            answer:"Unable to access information source."

        };

    }

}
