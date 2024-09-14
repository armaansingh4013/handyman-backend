const express = require('express');
const { createWorkArea, getWorkAreas, deleteWorkArea, updateWorkArea } = require('../controllers/workarea');
const { createaCategory,  getAllCategories, deleteCategory, updateCategory } = require('../controllers/category');
const { createService, getServices, getServiceByCategory, getServiceByWorkarea, getService, deleteService, updateService } = require('../controllers/service');
const { saveEnquiry,getAllEnquiries } = require('../controllers/enquiry');
const {login,signup} = require("../controllers/user")
const router = express.Router();

const multer = require('multer');
const path = require('path');
const { addFeedback, getAllFeedbacks } = require('../controllers/feedback');
const { dashboard } = require('../controllers/dashboard');
const auth = require('../helper/auth');

const storage = multer.diskStorage({
    
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      cb(null, "image"+Date.now() + path.extname(file.originalname)); // Appends extension
    },
  });
  
  const upload = multer({ storage });

router.post ("/login",login)
router.post("/signup",signup)

router.post('/workarea',upload.single("image"),  createWorkArea);
router.put('/update-workarea/:id',upload.single("image"),  updateWorkArea);
router.get('/workareas', getWorkAreas);
router.delete('/delete-workarea/:id', auth,deleteWorkArea);

router.post('/category',upload.single("image"), createaCategory);
router.get('/categories', getAllCategories);
router.delete('/delete-category/:id', deleteCategory);
router.put('/update-category/:id',upload.single("image"),  updateCategory);



router.post('/service', upload.array('images',5), createService);
router.get('/services', getServices);
router.get('/service/:id', getService);
router.delete('/delete-service/:id',deleteService)
router.put('/update-service/:id',upload.array('images',5),  updateService);


router.get('/service', getService);
router.get('/services/category/', getServiceByCategory);
router.get('/services/workarea', getServiceByWorkarea);

router.post('/enquiries', saveEnquiry);
router.get('/enquiries',auth, getAllEnquiries);
// router.get('/enquiries/count', enquiryController.countEnquiries);
// router.get('/enquiries/:id', enquiryController.getEnquiryById);
// router.put('/enquiries/:id', enquiryController.updateEnquiry);

router.post('/feedback', addFeedback);
router.get("/feedbacks",auth,getAllFeedbacks);


router.get("/dashboard",auth,dashboard)


module.exports = router;