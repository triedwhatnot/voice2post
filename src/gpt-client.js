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

export async function generateEnhancedText(optionId, recordedArrText, prompt = null){
    try{
        if(!recordedArrText?.length || !optionId) return;
        
        let text = recordedArrText.reduce((acc, txt)=> acc + txt + ". ");
        
        const response = await fetch(window.location.origin + '/api/get-ai-enhanced-text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                optionId,
                prompt,
                text
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if(data?.statusCode === 1){
            return data.enhancedText;
        }
        else throw Error(`Invalid / empty input. status code: ${data?.statusCode}`);
    }
    catch(e){
        console.log("Error in generateEnhancedText: ", e);
    }
}