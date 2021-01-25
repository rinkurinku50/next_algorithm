const Courses = require('../../../models/admin/courses');
const fs = require('fs');

function coursesController() {
    return {
        async index(req, res) {
            const allCour = await Courses.findAll({
                order: [
                    ['createdAt', 'ASC'],
                ],
            });
            //console.log(allCour);
            return res.render('admin/courses', { allCourses: allCour });
        },
        async deleteCourse(req, res) {
            const cId = req.params.id;

            try {
                const getImageLink = await Courses.findOne({
                    where: {
                        cId
                    }
                });

                const delRec = await Courses.destroy({
                    where: {
                        cId
                    }
                });
                if (delRec) {
                    fs.unlink(`${appRoot}/uploads/${getImageLink.cimage}`, function(err) {
                        if (err) return console.log(err);
                        console.log('file deleted successfully');
                    });
                    req.flash('success', 'Record Delete Successfully...');
                } else {
                    req.flash('error', 'error in database....');
                }


            } catch (error) {
                console.log(error);
            }


            return res.redirect('/admin/courses');
        },
        async updateCourse(req, res) {
            const file = req.file;
            const { cname, ccatagory, ctiming, batch, cdesc } = req.body;
            //console.log(req.params.id);
            //console.log(req.params.imageName);
            if (!file) {
                //console.log(req.params.id);
                //console.log(req.body);
                try {
                    const updateData = await Courses.update({
                        cname,
                        ccatagory,
                        ctiming,
                        batch,
                        cdesc
                    }, {
                        where: {
                            cId: req.params.id
                        }
                    })

                    if (!updateData) {
                        req.flash('error', 'something went wrong....');

                    } else {
                        req.flash('success', 'Updated Course...');

                    }
                } catch (error) {
                    req.flash('error', 'error in database....');
                }
            } else {
                console.log(file.filename);
                try {
                    const updateData = await Courses.update({
                        cname,
                        ccatagory,
                        ctiming,
                        batch,
                        cimage: file.filename
                    }, {
                        where: {
                            cId: req.params.id
                        }
                    })

                    if (!updateData) {
                        req.flash('error', 'something went wrong....');

                    } else {
                        fs.unlink(`${appRoot}/uploads/${req.params.imageName}`, function(err) {
                            if (err) return console.log(err);
                            console.log('file deleted successfully');
                        });
                        req.flash('success', 'Updated Course...');

                    }
                } catch (error) {
                    req.flash('error', 'error in database....');
                }
            }
            return res.redirect('/admin/courses');
        }
    }
}


module.exports = coursesController;