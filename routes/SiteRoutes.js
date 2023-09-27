const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController.js');
const siteController = require('../controllers/siteController.js');
const jwt = require('../config/JWT.js');
const storage = require("../config/multer.js");

router.post('/register', siteController.registerSite);
router.post('/login', userController.login);

router.get('/siteList/:site_name', siteController.sortUserbySite);
router.get('/siteList', siteController.getSiteList);
router.get('/:site_name', siteController.searchAdminbySite);

router.post('/siteLogin',siteController.searchAdminbySite,userController.login)


// Communication Routes
// {
// Task Routes
router.post('/communication/createTask',jwt.validateAdmin, taskController.createTask);
router.put('/communication/updateTask', jwt.validateAdmin, taskController.editTask);
router.put('/communication/assignTask', jwt.validateAdmin, taskController.assignTask);
router.delete('/communication/:id', jwt.validateAdmin, taskController.deleteTask);
router.get('/communication/', taskController.geTaskList);
router.get('/communication/:reciever', taskController.findTasksByReceiver);
router.get('/communication/searchTask/:description', taskController.searchTasks);

// Comment Routes
router.post('/communication/createComment', commentController.createComment);
router.get('/communication/comment/:id', commentController.getComment);
router.put('/communication/comment/:id', commentController.updateComment);
router.delete('/communication/comment/:id', commentController.deleteComment);
router.post('/communication/createComment', commentController.createComment);
// }


// Stock Request Routes
router.get('/stock', siteController.getAllStockRequest);
router.post('/stock/addComment', siteController.addStockRequest);
router.get('/stock/:id', siteController.getStockRequest);
router.put('/stock/:id', siteController.selectStockRequest);
router.delete('/stock/:id', siteController.deleteStockRequest);

// Incident Report Routes
router.get('/IncidentReport', siteController.getAllIncidentReports);
router.get('/IncidentReport/:id', siteController.getIncidentReportById);
router.post('/IncidentReport/newIncident', siteController.createIncidentReport);
router.put('/IncidentReport/:id', siteController.updateIncidentReport);
router.delete('/IncidentReport/:id', siteController.deleteIncidentReport);

// Site Manual Routes
router.get('/SiteManual', siteController.getAllSiteManuals);
router.get('/SiteManual/:id', siteController.getSiteManualById);
router.put('/SiteManual/:id', siteController.updateSiteManual);
router.delete('/SiteManual/:id', siteController.deleteSiteManual);
router.post('/SiteManual/addNew', siteController.addNewSiteManual);

// Site Info Route 
router.get('/SiteInfo', siteController.getAllSiteInfo);
router.get('/SiteInfo/:id', siteController.getSiteInfoById);
router.put('/SiteInfo/:id', siteController.updateSiteInfoById);
router.delete('/SiteInfo/:id', siteController.deleteSiteInfoById);

// Toolbox Talk Routes
router.get('/ToolboxTalk', siteController.getAllToolboxTalks);
router.get('/ToolboxTalk/:id', siteController.getToolboxTalkById);
router.put('/ToolboxTalk/:id', siteController.updateToolboxTalk);
router.post('/ToolboxTalk/add', siteController.createToolboxTalk);
router.delete('/ToolboxTalk/:id', siteController.deleteToolboxTalk);

// Site Recommendation Routes
router.get('/SiteRecomendation', siteController.getAllSiteRecommendations);
router.get('/SiteRecomendation/:id', siteController.getSiteRecommendationById);
router.put('/SiteRecomendation/:id', siteController.updateSiteRecommendation);
router.post('/SiteRecomendation/addRecomendation', siteController.createSiteRecommendation);
router.delete('/SiteRecomendation/:id', siteController.deleteSiteRecommendation);

// Help Routes
router.get('/Help', siteController.getAllHelpItems);
router.get('/Help/:id', siteController.getHelpItemById);
router.put('/Help/:id', siteController.updateHelpItem);
router.put('/Help/newInstance', siteController.createNewHelpItem);
router.delete('/Help/:id', siteController.deleteHelpItem);



// router.post('/createUser',storage.single('image'), jwt.validateAdmin, userController.createUser);
// router.put('/:id', jwt.validateToken, userController.editUser);
// router.delete('/:id',jwt.validateAdmin, userController.deleteUser);
// router.get('/', userController.getAllUsers);
// router.get('/profile', userController.getProfile); 
// router.get('/:name', userController.searchUser);
// router.post('/get-verification-code', userController.getVerificationCode);
// router.post('/verifiy-code', userController.verifyCode);
// router.put('/update-password/:userId', userController.updatePassword);
  
module.exports = router;
