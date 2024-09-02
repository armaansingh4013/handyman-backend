const express = require('express');
const { createWorkArea, getWorkAreas } = require('../controllers/workarea');
const { createaCategory,  getAllCategories } = require('../controllers/category');
const { createService, getServices, getServiceByCategory, getServiceByWorkarea, getService } = require('../controllers/service');
const { saveEnquiry,getAllEnquiries } = require('../controllers/enquiry');
const router = express.Router();

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      cb(null, "image"+Date.now() + path.extname(file.originalname)); // Appends extension
    },
  });
  
  const upload = multer({ storage });


router.post('/workarea',upload.single("image"),  createWorkArea);
router.get('/workareas', getWorkAreas);
router.post('/category',upload.single("image"), createaCategory);
router.get('/categories', getAllCategories);


router.post('/service', upload.array('images',5), createService);
router.get('/services', getServices);
router.get('/service/:id', getService);

router.get('/service', getService);
router.get('/services/category/', getServiceByCategory);
router.get('/services/workarea', getServiceByWorkarea);

router.post('/enquiries', saveEnquiry);
// router.get('/enquiries/count', enquiryController.countEnquiries);
router.get('/enquiries', getAllEnquiries);
// router.get('/enquiries/:id', enquiryController.getEnquiryById);
// router.put('/enquiries/:id', enquiryController.updateEnquiry);


module.exports = router;