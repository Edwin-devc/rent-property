const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controllers');
const mainController = require('../controllers/main.controllers');
const clientController = require('../controllers/client.controllers');
const landlordController = require('../controllers/landlord.controllers');

router.get('/', mainController.mainView);
/* admin routers */
router.get('/admin', adminController.viewDashboard);
router.get('/admin/dashboard', adminController.viewDashboard);
router.get('/admin/requests', adminController.viewRequests);
router.get('/admin/clients', adminController.viewClients);
router.get('/admin/tenants', adminController.viewTenants)
router.get('/admin/landlords', adminController.viewLandlords);
router.get('/admin/property', adminController.viewProperty);
router.post('/admin', adminController.addAdmin);
/* client requests */
router.get('/client', clientController.view);
/* tenant requests */
router.get('');
/* landlord */
router.get('/landlord', landlordController.view);
router.post('/landlord', landlordController.addProperty);

module.exports = router;