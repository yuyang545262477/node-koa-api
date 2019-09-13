const Koa = require("koa");
const app = new Koa();
const PORT = 1337;
/*首页路由*/
const indexRoutes = require("./routes/index");
const movieRoutes = require("./routes/movies");
app.use(indexRoutes.routes());
app.use(movieRoutes.routes());

const server = app.listen(PORT, () => {
    console.log(`Server listening on port,${PORT}`);
});

module.exports = server;

