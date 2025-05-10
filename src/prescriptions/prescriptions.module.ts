import { Module } from "@nestjs/common";
import { PrescriptionsService } from "./prescriptions.service";
import { PrescriptionsController } from "./prescriptions.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Prescription } from "./model/prescription.model";
import { DoctorModule } from "../doctor/doctor.module";
import { PatientsModule } from "../patients/patients.module";

@Module({
  imports: [SequelizeModule.forFeature([Prescription]),DoctorModule,PatientsModule],

  controllers: [PrescriptionsController],
  providers: [PrescriptionsService],
  exports: [PrescriptionsService],
})
export class PrescriptionsModule {}
