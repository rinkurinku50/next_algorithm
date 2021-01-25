const multer = require('multer');
const path = require('path');
//admin controller
const loginController = require('../app/http/controller/adminController/loginController');
const dashboardController = require('../app/http/controller/adminController/dashboardController');
const coursesController = require('../app/http/controller/adminController/coursesController');
const addCorsesController = require('../app/http/controller/adminController/addCoursesController');
const addModulesController = require('../app/http/controller/adminController/addModulesController');
const updateModuleController = require('../app/http/controller/adminController/updateModuleController');
const modulesController = require('../app/http/controller/adminController/modulesController');
//students controller
const homeStudentController = require('../app/http/controller/studentController/homeStudentController');
const coursesStudentController = require('../app/http/controller/studentController/coursesStudentController');
const moduleStudentController = require('../app/http/controller/studentController/moduleStudentController');
const aboutStudentController = require('../app/http/controller/studentController/aboutStudentController');
const contactStudentController = require('../app/http/controller/studentController/contactStudentController');


function initRoutes(app) {

    var storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'uploads')
        },
        filename: function(req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    })

    var upload = multer({ storage: storage })

    //student route

    app.get('/', homeStudentController().index);
    app.get('/courses', coursesStudentController().index);
    app.get('/courses/module/:id/:name', moduleStudentController().index);
    app.get('/about', aboutStudentController().index);
    app.get('/contact', contactStudentController().index);
    app.post('/contactModule', contactStudentController().contactFromModule);


    // admin routes

    //all admin routes
    app.get('/admin', loginController().index);
    app.get('/admin/dashboard', dashboardController().index);

    //add course
    app.get('/admin/courses', coursesController().index);
    app.get('/admin/addcourses', addCorsesController().index);
    app.post('/admin/addcourses', upload.single('cimage'), addCorsesController().addcourses);

    //update course
    //app.get('/admin/updatecourse', updateCourseController().index);
    app.post('/admin/updatecourse/:id/:imageName', upload.single('cimage'), coursesController().updateCourse);


    //delete course
    app.get('/admin/courses/:id', coursesController().deleteCourse);


    //show module
    app.get('/admin/modules', modulesController().index);
    app.get('/admin/modules/:id', modulesController().getAllModule);

    //add module route
    app.get('/admin/addmodules', addModulesController().index);
    app.post('/admin/addmodules/:id', addModulesController().addmodule);
    app.post('/admin/addmoduleexist/:id', addModulesController().addmoduleexist);
    app.get('/admin/findaddmodules/:id', addModulesController().getAllModule);

    //update module route
    app.get('/admin/updatemodule', updateModuleController().index);
    app.get('/admin/findmodules/:id', updateModuleController().getAllModule);
    app.post('/admin/updatemodule/:id', updateModuleController().update);


    //


}

module.exports = initRoutes;