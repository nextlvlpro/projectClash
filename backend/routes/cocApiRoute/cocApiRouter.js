const { default: axios } = require('axios');
const { getTopPlayersData } = require('../../controller/cocApi/playersController');
require('dotenv').config()
const cocApiRouter = require('express').Router();
const apiToken = process.env.COC_API_VAR;
const royleApiToken = process.env.ROYLE_API_PROXY;

cocApiRouter.get("/test", async (req, res) => {
   
    let data = await testApi();
    res.json(data);
});

cocApiRouter.post("/topplayers", async (req, res) => {
    try {
        const location = req.body.location;
    const data = await getTopPlayersData(location);
    res.json(data);    
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching data." });
    console.error(error);
    }
    
})
async function testApi () {
    
    const response = await axios.get("https://cocproxy.royaleapi.dev/v1/locations/32000113/rankings/players",
        {
            headers: {
                Authorization: `Bearer ${royleApiToken}`,
            }
        }
    )
    
    return response.data;
}
testApi()

module.exports = cocApiRouter;