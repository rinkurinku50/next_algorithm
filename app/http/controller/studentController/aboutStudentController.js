const Courses = require('../../../models/admin/courses');

function aboutStudentController() {
    return {
        async index(req, res) {

            res.render('students/about')
        }
    }
}

module.exports = aboutStudentController;