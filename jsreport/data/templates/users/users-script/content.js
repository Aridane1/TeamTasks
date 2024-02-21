const axios = require("axios")

async function fetchUsers() {
    try{
    const response = await axios.get(`http://localhost:8080/api/user`)
    return response.data
    }catch(err){
        console.log(err)
    }
}

async function beforeRender (req, res) {
    req.data.users = await fetchUsers();
    console.log(req.data.users)
}