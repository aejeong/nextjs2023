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

export const requestChat = async ({model, message}) => {
    const {user} = await getSession();
    try{
        const response = await fetch(`https://api.openai.com/v1/completions`,{
            method: 'POST',
            headers: {
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${user.key}`,
            },
            body : JSON.stringify({
                model,
                prompt: message,
                temperature:1,
                max_tokens:60,
                frequency_penalty:0,
                presence_penalty:0,
            })
        });
    
       return await response.json();
    }catch(error){
        return error;
    }
}
