import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { Observable } from "rxjs";

export class doctorselfguard implements CanActivate {
  constructor() {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request | any = context.switchToHttp().getRequest();

    if (req.user.role == "doctor") {
      console.log(req.user.role);
      
      return true;
    }
    throw new ForbiddenException({
      message: "Sizga ruxsat berilmagan",
    });
  }
}
