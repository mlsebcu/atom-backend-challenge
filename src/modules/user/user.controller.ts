import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service";
import { ApiResponse } from "../../common/types/response.types";
import { User } from "./user.model";
import { Messages } from "../../common/constants/messages";

export class UserController {
  constructor(private readonly userService: UserService) {}

  findByEmail = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const email = req.params["email"] as string;
      const user = await this.userService.findByEmail(email);

      if (!user) {
        res.status(404).json({
          success: false,
          message: Messages.USER.NOT_FOUND,
        });
        return;
      }

      const response: ApiResponse<User> = { success: true, data: user };
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  };

  createUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { email } = req.body as { email: string };
      const user = await this.userService.createUser(email);

      const response: ApiResponse<User> = {
        success: true,
        data: user,
        message: Messages.USER.CREATED,
      };
      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  };
}
