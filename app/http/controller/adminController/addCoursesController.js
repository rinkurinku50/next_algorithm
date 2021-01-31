const Courses = require('../../../models/admin/courses');
const { v4: uuidv4 } = require('uuid');


function addCorsesController() {

    return {
        index(req, res) {
            return res.render('admin/addcourses');
        },
        async addcourses(req, res) {
            const file = req.file;
            const { cname, ccatagory, ctiming, batch, cdesc } = req.body;

            //console.log(cdesc);
            if (cname == "" || ccatagory == "" || ctiming == "" || batch == "" || cdesc == "") {
                req.flash('error', 'Required All Fields...');

            } else if (!file) {
                req.flash('error', 'Please upload a file');

            } else {

                try {
                    const cos = await Courses.create({
                        cId: uuidv4(),
                        cname,
                        ccatagory,
                        ctiming,
                        batch,
                        cdesc,
                        cimage: file.filename
                    });


                    if (!cos) {
                        req.flash('error', 'something went wrong....');

                    } else {
                        req.flash('success', 'Course Added...');

                    }
                } catch (error) {
                    req.flash('error', `error in database.... ${error}`);

                }

            }

            return res.redirect('/admin/addcourses');
        },

    }

}

module.exports = addCorsesController;