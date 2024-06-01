async function getAiResonse(messagesArr){
    try{
        const response = await fetch(import.meta.env.VITE_CHAT_GPT_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${import.meta.env.VITE_CHAT_GPT_API_KEY}`,
            },
            body: JSON.stringify({
                messages: messagesArr,
                model: "gpt-3.5-turbo",
            }),
        });

        const jsonRes = await response.json();
        return jsonRes.choices[0].message.content
    }
    catch(ex){
        console.error("Error in getAiResonse", ex);
    }
}

export const GPT_OPTIONS = {
    LINKEDIN: {
        id: 1
    },
    TWITTER: {
        id: 2
    },
    CUSTOM: {
        id: 3
    },
}

export async function generateEnhancedText(optionId, recordedArrText, prompt){
    try{
        if(!recordedArrText?.length || !optionId) return;
        
        let text = recordedArrText.reduce((acc, txt)=> acc + txt + ". ");
        if(optionId === GPT_OPTIONS.LINKEDIN.id) prompt = import.meta.env.VITE_LINKEDIN_PROMPT
        else if(optionId === GPT_OPTIONS.TWITTER.id) prompt = import.meta.env.VITE_TWIITER_PROMPT

        text = `${prompt + '  "' + text + '"'}`;
        let messagesArr = [{
            role: "user",
            content: text,
        }];

        let res = await getAiResonse(messagesArr);
        return res;
    }
    catch(e){
        console.log("Error in generateEnhancedText: ", e);
    }
}