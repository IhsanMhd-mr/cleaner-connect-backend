const userModel = require("../repository/UserRepo.js");
const siteRepo = require("../repository/SiteRepo.js");

exports.sortUserbySite = async (site) => {
    try {
      const User = await userModel.searchUser(site);
      return User;
      } catch (error) {
          throw error;
    }
  };
exports.siteList = async () => {
    try {
      const siteList = await siteRepo.getSiteList();
      return siteList;
      } catch (error) {
          throw error;
    }
  };