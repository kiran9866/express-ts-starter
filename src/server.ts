import express, { Application, Request, Response } from "express";
import { HttpError } from "http-errors";

const app: Application = express();
app.set("port", process.env.PORT || 3000);
app.get("/", (req: Request, res: Response, next: express.NextFunction) => {
  res.status(200).json({
    message: "hello world!"
  });
});
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use((req: Request, res: Response, next: express.NextFunction) => {
  res.status(404).json({
    message: "That route does not exist ☠️",
    status: 404
  });
});

app.use(
  (err: HttpError, req: Request, res: Response, next: express.NextFunction) => {
    res.status(err.status || 500).json({
      message: err.message || "Something went wrong. Please try again",
      status: err.status || 500
    });
  }
);
app.listen(app.get("port"), () =>
  console.log(`server is running at %d`, app.get("port"))
);
