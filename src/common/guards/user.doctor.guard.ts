import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { Observable } from "rxjs";

export class doctorguard implements CanActivate {
  constructor() {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request | any = context.switchToHttp().getRequest();

    if (req.user.role == "doctor" || req.user.role == "patient") {
      return true;
    }
    throw new ForbiddenException({
      message: "Siz ruxsat berilmagan",
    });
  }
}
