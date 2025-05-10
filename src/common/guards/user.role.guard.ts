import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import e from "express";
import { Observable } from "rxjs";

export class roleguard implements CanActivate {
  constructor() {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request | any = context.switchToHttp().getRequest();

    if (req.user.role == "superadmin") {
      console.log("superadmin");

      return true;
    } else if (req.user.role == "admin") {
      console.log("admin");
      return true;
    } else if (req.user.role == "doctor" && req.user.id == req.params.id) {
      console.log("doctor");

      return true;
    } else if (req.user.role == "patient" && req.user.id == req.params.id) {
      console.log("patient");

      return true;
    }
    throw new ForbiddenException({
      message: "Sizni malumotlaringgiz to'gri kelmadi",
    });
  }
}
