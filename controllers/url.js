const shortid = require("shortid");
const URL = require("../models/url");
async function GeneratetheUrl(req,res){
    const  short_id  = shortid.generate();
    const {url} = req.body;
    if (!url) return res.status(400).json({ error: "url is required" });
    await URL.create({
        shortId : short_id,
        redirectUrl : body.url,
        visitedHistory : []
    })
    return res.json({id : short_id});
}

async  function analyticsforlink(req,res){
    const shortId = req.params.shortId;
    try {
        const result = await URL.findOne({ shortId });

        if (!result) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        return res.json({
            totalClicks: result.visitedHistory.length,
            analytics: result.visitedHistory
        });
    } catch (error) {
        console.error("Error fetching analytics:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    GeneratetheUrl,analyticsforlink
}
