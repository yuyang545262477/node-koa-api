const Router = require("koa-router");
const router = new Router();

const queries = require("../db/queries/movies");
const BASE_URL = "/api/v1/movies";

router.get(BASE_URL, async (ctx) => {
    try {
        const movies = await queries.getAllMovies();
        ctx.body = {
            status: "success",
            data: movies,
        };
    } catch (e) {
        console.log(e);
    }
});

router.get(`${BASE_URL}/:id`, async (ctx) => {
    try {
        const movies = await queries.getSingleMovie(ctx.params.id);
        if (movies.length) {
            ctx.body = {
                status: "success",
                data: movies,
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: "error",
                message: "That movie does not exist",
            };
        }
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;
