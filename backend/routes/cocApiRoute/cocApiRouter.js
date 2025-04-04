const { default: axios } = require('axios');
require('dotenv').config()
const cocApiRouter = require('express').Router();
const apiToken = process.env.COC_API_VAR;
const royleApiToken = process.env.ROYLE_API_PROXY;

cocApiRouter.get("/test", async (req, res) => {
   
    let data = await testApi();
    res.json(data);
});


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