import { Application, Router, parse } from "./deps.ts";
import { list } from "./handlers/list.ts";
import { create } from "./handlers/create.ts";
import { remove } from "./handlers/remove.ts";
import { get } from "./handlers/get.ts";
import { update } from "./handlers/update.ts";
import { auth } from "./handlers/auth.ts";
import { authorized } from "./middlewares/authorized.ts";

const app = new Application();

const router = new Router();

router
  .post("/auth", auth)
  .post("/gists", authorized, create)
  .get("/gists", authorized, list)
  .get("/gists/:id", authorized, get)
  .delete("/gists/:id", authorized, remove)
  .patch("/gists/:id", authorized, update);

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener('listen', () => console.log('Running..'));

const DEFAULT_PORT = 8000;
const argPort = parse(Deno.args).port;
await app.listen({ port: argPort ?? DEFAULT_PORT });