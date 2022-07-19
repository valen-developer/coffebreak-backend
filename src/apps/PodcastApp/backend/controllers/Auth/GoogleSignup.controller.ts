import { Request, Response } from "express";
import { GoogleLogin } from "../../../../../context/PodcastApp/User/application/GoogleLogin";
import { enviroment } from "../../config/enviroment";
import { Container } from "../../dependency-injection/Container";
import { UserDependencies } from "../../dependency-injection/injectUserDependencies";
import { Controller } from "../Controller.interface";

export class GoogleSignupController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const SUCCESS_URL = `${enviroment.webappUrl}/auth/rrss/success`;
    const FAILURE_URL = `${enviroment.webappUrl}/auth/rrss/failure`;

    try {
      const sessionUser = req.user;

      if (!sessionUser) {
        res.redirect(FAILURE_URL);
        return;
      }

      const { email } = sessionUser as {
        email: string;
      };

      const container = Container.getInstance();
      const googleLogin = container.get<GoogleLogin>(
        UserDependencies.GoogleLogin
      );
      const { token } = await googleLogin.login({ email });

      res.redirect(`${SUCCESS_URL}?token=${token}`);
    } catch (error) {
      res.redirect(FAILURE_URL);
    }
  }
}
