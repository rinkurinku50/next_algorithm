function dashboardController() {

    return {
        async index(req, res) {
            return res.render('admin/dashboard');
        }
    }
}

module.exports = dashboardController;