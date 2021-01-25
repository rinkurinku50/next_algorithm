const Courses = require('../../../models/admin/courses');
const Modules = require('../../../models/admin/modules');

function updateModuleController() {
    return {
        async index(req, res) {
            const allCour = await Courses.findAll({
                order: [
                    ['createdAt', 'ASC'],
                ],
            });
            //console.log(allCour);
            return res.render('admin/updatemodule', { allCourses: allCour });
        },
        async getAllModule(req, res) {
            //console.log(req.params.id);
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
        async update(req, res) {
            //console.log(req.params.id);
            //console.log(req.body);
            const { modulename, moduledesc } = req.body;
            const len1 = modulename.length;
            const len2 = moduledesc.length;
            var result = {};
            var mainObj = {
                modules: {}
            }
            var cou = 1;
            if (len1 == len2) {
                //convert two array into map
                modulename.forEach((key, i) => result[key] = moduledesc[i]);
                //now map to object
                for (const [key, value] of Object.entries(result)) {
                    mainObj.modules[`module ${cou}`] = {
                        mname: key,
                        mdesc: value
                    }

                    cou++
                }
                console.log(JSON.stringify(mainObj));
                //return res.redirect('/admin/modulewithcourses');
                const mainJson = JSON.stringify(mainObj);
                if (mainObj != null) {

                    try {
                        const modu = await Modules.update({
                            modules: mainJson
                        }, {
                            where: {
                                cId: req.params.id
                            }
                        });
                        if (!modu) {
                            req.flash('error', 'something went wrong....');

                        } else {
                            req.flash('success', 'Module updated...');

                        }
                    } catch (error) {
                        console.log(error);
                        req.flash('error', 'error in database....');
                    }



                }

            }
            return res.redirect('/admin/updatemodule');
        }
    }
}


module.exports = updateModuleController;