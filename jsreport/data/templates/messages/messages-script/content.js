const axios = require("axios")

async function fetchMessages() {
    try{
        const response = await axios.get("http://localhost:8080/api/message")
        return response.data
    }catch(err){
        console.log(err)
    }
}

async function beforeRender (req, res) {
    req.data.messages = await fetchMessages();
}