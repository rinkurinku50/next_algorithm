const Courses = require('../../../models/admin/courses');

function coursesStudentController() {
    return {
        async index(req, res) {

            const allCour = await Courses.findAll({
                order: [
                    ['createdAt', 'ASC'],
                ],
            });
            res.render('students/courses', { allCourses: allCour })
        }
    }
}

module.exports = coursesStudentController;