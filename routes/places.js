const router=require('express').Router();

const placeController=require('../controller/placeController');


const multer=require('multer');
const path=require('path');
const passport=require('passport');

//multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..','./assets/uploads'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = file.fieldname + '-' +Date.now()
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  const upload = multer({ storage: storage });

//routes

router.get('/',placeController.homePage); //home page


router.get('/states',placeController.exploreStates); //explore states

router.get('/places/:id',placeController.exploreplace); //explore place

router.get('/states/:id',placeController.exploreStatesById); //explore state by id

router.post('/search',placeController.search); //search

router.get('/explore-latest',placeController.exploreLetest); //explore latest 

router.get('/explore-random',placeController.exploreRandom); //explore random 

router.get('/submit-place',placeController.submitForm); //submit form

router.post('/submit-place',passport.checkAuthentication,upload.single('image'),placeController.submitPlace); //submit


module.exports=router;