import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class authGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader) {
      console.log("1");

      throw new UnauthorizedException("Unauthorized person");
    }

    const bearer = authHeader.split(" ")[0];
    const token = authHeader.split(" ")[1];

    if (bearer !== "Bearer" || !token) {
      console.log("2");

      throw new UnauthorizedException("Unauthorized person");
    }

    async function verify(token: string, jwtService: JwtService) {
      let payload: any;
      try {
        payload = await jwtService.verify(token, {
          secret: process.env.ACCESS_TOKEN_KEY,
        });
      } catch (error) {
        console.log(error);
        throw new BadRequestException(error);
      }
      if (!payload) {
        console.log("3");

        throw new UnauthorizedException("Unauthorized person");
      }
      if (!payload.is_active) {
        throw new UnauthorizedException("Ruxsat etilmagan `active` holat");
      }
      req.user = payload;
      return true;
    }
    return verify(token, this.jwtService);
  }
}
