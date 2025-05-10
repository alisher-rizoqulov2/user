import { Module } from "@nestjs/common";
import { LabTestsService } from "./lab-tests.service";
import { LabTestsController } from "./lab-tests.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { LabTest } from "./models/lab-test.model";
import { DoctorModule } from "../doctor/doctor.module";
import { PatientsModule } from "../patients/patients.module";

@Module({
  imports: [SequelizeModule.forFeature([LabTest]),DoctorModule,PatientsModule],

  controllers: [LabTestsController],
  providers: [LabTestsService],
  exports: [LabTestsService],
})
export class LabTestsModule {}
