module.exports = function(app, dbProvider) {
    app.get('/newReview/:itemId', isLoggedIn, async function(req, res) {
        let itemId = req.params.itemId;

        let text = req.query.text;
        let rating = parseInt(req.query.inlineRadioOptions);

        if(rating == null)
            res.redirect('/');

        await dbProvider.AddReview(req.user.id, itemId, rating, text);

        res.redirect('/item/' + itemId);
    });

    app.get('/newItem', isLoggedIn, async function(req, res) {
        if(req.user.isAdmin == 0){
            res.redirect("/");
        }
        
        let name = req.query.name;
        let price = parseInt(req.query.price);
        let url = req.query.url;

        if(name == null || price == null || url == null)
            res.redirect('/');
            
        await dbProvider.AddItem(name, price, url);

        res.redirect('/items');
    });

    app.get('/removeItem/:id', isLoggedIn, async function(req, res) {
        if(req.user.isAdmin == 0){
            res.redirect("/");
        }
        
        await dbProvider.RemoveItem(req.params.id);

        res.redirect('/items');
    });

    app.get('/items', isLoggedIn, async function(req, res) {
        if(req.user.isAdmin == 0){
            res.redirect("/");
        }

        let items = await dbProvider.GetItems();

        res.render('items.ejs', {
            user: req.user,
            items: items
        });
    });

    app.get('/item/:id', isLoggedIn, async function(req, res) {
        let item = await dbProvider.GetItem(req.params.id);
        let reviews = await dbProvider.GetReviews(req.params.id);

        res.render('item.ejs', {
            user: req.user,
            item: item,
            reviews: reviews
        });
    });
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
}
