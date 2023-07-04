const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controllers');
const mainController = require('../controllers/main.controllers');
const clientController = require('../controllers/client.controllers');
const landlordController = require('../controllers/landlord.controllers');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'public/property-images')
    },
    filename : (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})
const  upload = multer({storage: storage});

router.get('/', mainController.mainView);
router.post('/', mainController.authenticateUser);
router.post('/register', mainController.registerUser);
/* admin routers */
router.get('/admin', adminController.viewDashboard);
router.get('/admin/dashboard', adminController.viewDashboard);
router.get('/admin/requests', adminController.viewRequests);
router.get('/admin/clients', adminController.viewClients);
router.get('/admin/tenants', adminController.viewTenants)
router.get('/admin/landlords', adminController.viewLandlords);
router.get('/admin/property', adminController.viewProperty);
router.post('/admin', adminController.addAdmin);
router.get('/admin-approve-property/:id', adminController.approveProperty);
router.get('/admin-reject-property/:id', adminController.rejectProperty);
router.get('/admin-view-property/:id', adminController.reviewProperty);
/* client requests */
router.get('/client', clientController.view);
router.get('/addcomment/:id',clientController.comment);
router.post('/addcomment/:id',clientController.addComment);
router.get('/likeproperty/:id',clientController.like);
router.get('/dislikeproperty/:id',clientController.dislike);
router.get('/client/requests', clientController.viewClientRequests);
router.get('/requestlease/:id', clientController.requestLease);
/* tenant requests */
// router.get('');
/* landlord */
router.get('/landlord', landlordController.view);
router.post('/landlord', upload.single("photo"), landlordController.addProperty);
router.get('/view-property/:id', landlordController.viewProperty);
router.get('/edit-property/:id', landlordController.editProperty);
router.post('/edit-property/:id', landlordController.updateProperty);
router.get('/delete-property/:id', landlordController.deleteProperty);
router.get('/view-requests', landlordController.viewLandlordRequests);


module.exports = router;