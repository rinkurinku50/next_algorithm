function authMiddleware() {
    return {
        ensureAuthenticated(req, res, next) {
            if (req.isAuthenticated()) { return next(); }
            res.redirect('/admin')
          },
          ensureLoginAuthenticated(req, res, next) {
            if (req.isAuthenticated()) {
               
                return res.redirect('/admin/dashboard') 
                }
               return next();
          },
    };
}

module.exports=authMiddleware;