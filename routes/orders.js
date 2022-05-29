module.exports = function(app, dbProvider) {
    app.get('/orders', isLoggedIn, async function(req, res) {
        let items = await dbProvider.GetOrders(req.user.id);
        //console.log(items);
        //console.log(req);
        res.render('orders.ejs', {
            user: req.user,
            items: items
        });
    });

    app.get('/allOrders', isLoggedIn, async function(req, res) {
        if(req.user.isAdmin == 0){
            res.redirect("/");
        }

        let items = await dbProvider.AllOrders();

        res.render('allOrders.ejs', {
            user: req.user,
            items: items
        });
    });

    app.get('/order/:id', isLoggedIn, async function(req, res) {
        await dbProvider.AddOrder(req.params.id, req.user.id);
        
        res.render('orderCompleate.ejs', {
            user: req.user
        });
    });

    app.get('/setOrderStatus/:id/:newStatus', isLoggedIn, async function(req, res) {
        if(req.user.isAdmin == 0){
            res.redirect("/");
        }

        let currentStatus = await dbProvider.GetOrderStatus(req.params.id);
        currentStatus = currentStatus[0].orderStatus;

        if((currentStatus == 1 && req.params.newStatus == 4) ||
            (currentStatus == 2 && req.params.newStatus == 3) ||
            (currentStatus == 2 && req.params.newStatus == 1) ||
            currentStatus == 3 ||
            currentStatus == 4)
            res.redirect("/");

        await dbProvider.UpdateOrderStatus(req.params.id, req.params.newStatus);

        res.redirect("/allOrders");
    });
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
}
