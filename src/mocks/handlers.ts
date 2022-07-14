import { rest } from "msw";

export const handlers = [
  rest.get("/posts", (req, res, ctx) => {
    if (req.url.searchParams.get("fail")) {
      return res(
        ctx.status(400),
        ctx.json({
          errors: [{ detail: "BLAH!" }],
        })
      );
    }
    return res(
      ctx.status(200),
      ctx.json({
        posts: [
          {
            title: "Foo",
            description: "foo description",
          },
          {
            title: "Bar",
            description: "bar description",
          },
        ],
      })
    );
  }),
  rest.get("/people/:id", (req, res, ctx) => {
    return res(
      ctx.json({
        person: {
          favoriteNumber: 2,
          firstName: "David",
          lastName: "Adams",
        },
      })
    );
  }),
  rest.post("/people", (req, res, ctx) => {
    console.log(req.body);
    return res(
      ctx.json({
        message: "Success!",
      })
    );
  }),
  rest.post("/people/:id", (req, res, ctx) => {
    return res(
      ctx.json({
        message: "Success!",
      })
    );
  }),
];
