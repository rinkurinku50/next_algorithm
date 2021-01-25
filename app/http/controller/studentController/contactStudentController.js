const Courses = require('../../../models/admin/courses');

function contactStudentController() {
    return {
        async index(req, res) {


            return res.render('students/contact')
        },
        contactSimple(req, res) {

        },
        contactFromModule(req, res) {
            console.log(req.body);

            const { message, name, email, subject, module } = req.body;

            var newMessage = message.replace(/\r?\n/g, '\n');

            console.log(newMessage);

            return res.redirect('/courses');
        }
    }

}

module.exports = contactStudentController;