const cocApi = require("../../routes/cocApiRoute/cocApi");

async function getTopPlayersData (location) {
    const {data} = await cocApi.get(`/locations/${location}/rankings/players`)
   return data.items
    
    
}


module.exports = {
    getTopPlayersData
}