const siteService = require('../services/SiteService.js');
const userService = require('../services/UserService.js');

exports.registerSite = async (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .json({ error: "data is missing in the request body", status:false });
  }
  const { admin_id, description } = req.body;
  try {
    const result = await siteService.createSite(admin_id, description);

    if(result.status){
      res.status(200).json({message :result.message, status:true});
    }else{
      res.status(400).json({message :result.message, status:false});
    }  } catch (error) {
      // throw(error)
    res.status(400).json({ error: "Internal Server Error" , status:false});
  }
};

exports.getSiteList = async (req,res) => {
  try{
    const result = await siteService.siteList();
    res.status(200).json({result :result, status:true});
} catch (error) {
    res.status(400).json({ error: 'Internal Server Error', status:false });
}

}


exports.sortUserbySite = async (req,res) => {
  const site = req.params.site_name;
  try{
      const result = await userService.sortUserbySite(site);
      res.status(200).json({result :result, status:true});
  } catch (error) {
      res.status(400).json({ error: 'Internal Server Error', status:false });
  }
}
exports.searchAdminbySite = async (req,res,next) => {
  const site = req.body.siteName;
  try{
      const result = await userService.searchAdminbySite(site);
      res.status(200).json({result :result, status:true});
      next()
  } catch (error) {
      res.status(400).json({ error: 'Internal Server Error', status:false });
  }
}

// 

