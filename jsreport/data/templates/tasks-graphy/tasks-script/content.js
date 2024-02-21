const axios = require("axios")

async function fetchTasks() {
    try{
        const response = await axios.get("http://localhost:8080/api/userTask/count")
        return response.data
    }catch(err){
        console.log(err)
    }
}


async function beforeRender (req, res) {
    req.data.tasks = await fetchTasks();
}