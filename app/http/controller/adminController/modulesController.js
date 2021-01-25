const Courses = require('../../../models/admin/courses');
const Modules = require('../../../models/admin/modules');

function modulesController() {
    return {
        async index(req, res) {
            const allCour = await Courses.findAll({
                order: [
                    ['createdAt', 'ASC'],
                ],
            });
            //console.log(allCour);
            return res.render('admin/modules', { allCourses: allCour });
        },
        async getAllModule(req, res) {
            console.log(req.params.id);
            var moduleData = null;
            var cId = null;
            var mId = null;
            var checkVal = 0;
            await Modules.findOne({
                where: {
                    cId: req.params.id
                }
            }).then((data) => {
                if (data) {
                    //console.log(data);
                    moduleData = data.modules;
                    cId = req.params.id;
                    mId = data.mId,
                        checkVal = 1;
                } else {
                    console.log("no module found...");
                    moduleData = "No Module found...";
                    checkVal = 0;
                }
            })

            return res.json({
                modules: moduleData,
                cId,
                mId,
                check: checkVal
            });
        },
    }
}


module.exports = modulesController;