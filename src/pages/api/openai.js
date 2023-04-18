import { getSession } from "next-auth/react";

export const verifyAPI = async (api_key) => {
    try{
        const response = await fetch(`https://api.openai.com/v1/models`,{
            method: 'GET',
            headers: {
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${api_key}`,
            }
        });
    
       return await response.json();
    }catch(error){
        return error;
    }
}

export const requestChat = async (message) => {
    console.log(message,'---message from request chat')
    const {user} = await getSession();
    try{
        // v1/chat/completions
        const response = await fetch(`https://api.openai.com/v1/completions`,{
            method: 'POST',
            headers: {
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${user.key}`,
            },
            body : JSON.stringify({
                // model: 'gpt-3.5-turbo-0301',
                // messages: [{'role':'user', 'content':`${message}`}],
                model:'text-davinci-003',
                prompt: message,
                temperature:1,
                max_tokens:60,
                // top_p:1,
                frequency_penalty:0,
                presence_penalty:0,
            })
        });
    
       return await response.json();
    }catch(error){
        return error;
    }
}
