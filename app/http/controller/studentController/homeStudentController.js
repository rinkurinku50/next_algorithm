const Courses = require('../../../models/admin/courses');

function homeStudentController() {
    return {
        async index(req, res) {

            const allCour = await Courses.findAll({
                order: [
                    ['createdAt', 'DESC'],
                ],
            });
            res.render('students/home', { allCourses: allCour })
        }
    }
}

module.exports = homeStudentController;