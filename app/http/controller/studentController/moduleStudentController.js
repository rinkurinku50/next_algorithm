const Modules = require('../../../models/admin/modules');

function moduleStudentController() {
    return {
        async index(req, res) {
            console.log(req.params.id);


            var moduleData = null;
            try {
                const onemodule = await Modules.findOne({
                    where: {
                        cId: req.params.id
                    }
                });
                //console.log(JSON.parse(onemodule.modules)['modules']);
                if (onemodule != null) {
                    const mod = JSON.parse(onemodule.modules);
                    moduleData = mod['modules'];

                }
                //for (const [key, value] of Object.entries(JSON.parse(onemodule.modules)['modules'])) {
                //    console.log(`${key}: ${value.mname}`);
                //}

            } catch (error) {
                console.log(error);
            }

            res.render('students/modulestudent', { singleModule: moduleData, name: req.params.name })
        }
    }
}

module.exports = moduleStudentController;