function loginController() {
    return {
        index(req, res) {
            return res.render('admin/login');
        }
    }
}

module.exports = loginController;