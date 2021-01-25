const Courses = require('../../../models/admin/courses');
const Modules = require('../../../models/admin/modules');
const { v4: uuidv4 } = require('uuid');

function addModulesController() {

    return {
        async index(req, res) {
            const allCour = await Courses.findAll({
                order: [
                    ['createdAt', 'ASC'],
                ],
            });
            //console.log(allCour);
            return res.render('admin/addmodules', { allCourses: allCour });
            //return res.render('admin/addmodules', { cId: req.params.id });
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
        async addmodule(req, res) {
            const cId = req.params.id;
            console.log(cId);

            if (!cId) {
                req.flash('error', 'Please add CId');

            }
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

                //console.log(mainObj);

                //console.log(JSON.stringify(mainObj));
                const mainJson = JSON.stringify(mainObj);

                try {
                    const mod = await Modules.create({
                        mId: uuidv4(),
                        modules: mainJson,
                        cId
                    });
                    if (!mod) {
                        req.flash('error', 'something went wrong....');

                    } else {
                        req.flash('success', 'Module Added...');

                    }
                } catch (error) {
                    console.log(error);
                    req.flash('error', 'error in database....');

                }


            }


            return res.redirect('/admin/addmodules');
        },
        async addmoduleexist(req, res) {
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

            return res.redirect('/admin/addmodules');
        },



    }
}

module.exports = addModulesController;