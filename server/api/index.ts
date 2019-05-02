import * as Router from "koa-router";
// import user from "./user/index";
// import post from "./post/index";

var router = new Router();

import * as logger from "koa-logger";
import * as skip from "koa-ignore";
import { ObjectId } from "mongodb";

router
  .prefix("/api")
  .use(logger())
  .get("/", ctx => ctx.ok("API"))
  .post("/", ctx => ctx.ok(ctx.request.body))
  .get("/user", async ctx =>
    ctx.ok(
      await ctx.db
        .collection("user")
        .find()
        .toArray()
    )
  )
  .post("/user", async ctx => {
    ctx.ok(await ctx.db.collection("user").insertOne(ctx.request.body));
  })
  .delete("/user/:id", async ctx => {
    ctx.ok(await ctx.db.collection("user").deleteOne({ _id: new ObjectId(ctx.params.id) }));
  });

export default router;
