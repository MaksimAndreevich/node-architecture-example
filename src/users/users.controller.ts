import { NextFunction, Response, Request } from "express";
import { BaseController } from "../common/base.controller";
import { HTTPError } from "../errors/htpp-error.class";
import { LoggerService } from "../logger/logger.service";

export class UsersController extends BaseController {
  constructor(logger: LoggerService) {
    super(logger);
    this.bindRoutes([
      { path: "/login", method: "post", func: this.login },
      { path: "/register", method: "post", func: this.register },
      { path: "/test-error", method: "get", func: this.testExeptionFilter },
    ]);
  }

  login(req: Request, res: Response, next: NextFunction) {
    this.ok(res, "login");
  }

  register(req: Request, res: Response, next: NextFunction) {
    this.ok(res, "register");
  }

  testExeptionFilter(req: Request, res: Response, next: NextFunction) {
    next(new HTTPError(400, "Test Error"));
  }
}
