function loginController() {
    return {
        index(req, res) {
            return res.render('admin/login');
        }, 
        resData(req,res){
            console.log(req);
            return res.redirect('admin/login');  
        }
    }
}

module.exports = loginController;