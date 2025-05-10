import { Module } from "@nestjs/common";
import { DepartmentsService } from "./departments.service";
import { DepartmentsController } from "./departments.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Department } from "./models/department.model";
import { DoctorModule } from "../doctor/doctor.module";

@Module({
  imports: [SequelizeModule.forFeature([Department]),DoctorModule],

  controllers: [DepartmentsController],
  providers: [DepartmentsService],
  exports: [DepartmentsService],
})
export class DepartmentsModule {}
