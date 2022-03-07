const express = require("express");
const app = express();

app.use(logger);

app.get("/books", logger, (req, res) => {
    res.send({ route: "/books" })
});

app.get("/libraries", logger, checkPermission("librarian"), (req, res) => {
    res.send({ route: "/libraries", permission: req.permission })
});

app.get("/authors", logger, checkPermission("author"), (req, res) => {
    res.send({ route: "/authors", permission: req.permission })
});


function checkPermission(role) {
    return function checkPermission(req, res, next) {
        if (role == "librarian") {
            req.permission = "true"
        }
        else if (role === "author") {
            req.permission = "true"
        }
        next();
    };
}


function logger(req, res, next) {

    console.log("before");
    next();
    console.log("after");

}




app.listen(5000, () => {
    console.log(`server 5000 is running now!`)
})