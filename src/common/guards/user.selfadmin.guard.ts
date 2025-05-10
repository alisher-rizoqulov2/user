import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { Observable } from "rxjs";

export class adminguard implements CanActivate {
  constructor() {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request | any = context.switchToHttp().getRequest();

    if (req.user.role == "superadmin" || req.user.role == "admin") {
      return true;
    }
    throw new ForbiddenException({
      message: "Siz admin  emassiz",
    });
  }
}
