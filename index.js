
const input=document.getElementById('input')
const button=document.getElementById('send')
const chatBox=document.getElementById('chat')
const setInput=[]
button.addEventListener('click',async function(e){
    e.preventDefault();
    const prompt=input.value;
    console.log(setInput);
    const newElement= document.createElement('p');
    newElement.innerText=`User: ${prompt}`;
    setInput.push({ role: "user",text: prompt });
    chatBox.appendChild(newElement);
    const aiResponse= await getAIresponse(setInput);
    if(aiResponse){
        const air= document.createElement('p');
        air.innerText=`Bot: ${aiResponse}`;
        setInput.push({role:"model", text: aiResponse });
        chatBox.appendChild(air);
    }
    input.value="";


    console.log(aiResponse);
})
async function getAIresponse(prompt) {
    const API_KEY="AIzaSyCPTAp5cj_W03ouWV_41hvmTQV6agLnqwU"
    const URL=`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`
    try{
        const data= await fetch(URL,{
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                contents: prompt.map(entry => ({
                    role: entry.role, // Ensure correct role assignment
                    parts: [{ text: entry.text }]
                }))
            })
        });
        const answer= await data.json();
        return answer.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I don't understand that";

    }
    catch(error){
        console.error("There is an error",error);
        return "Error: Unable to get response.";
    }

}
console.log(setInput);