import { Module } from "@nestjs/common";
import { AppointmentsService } from "./appointments.service";
import { AppointmentsController } from "./appointments.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Appointment } from "./models/appointment.model";
import { DoctorModule } from "../doctor/doctor.module";
import { PatientsModule } from "../patients/patients.module";

@Module({
  imports: [SequelizeModule.forFeature([Appointment]),DoctorModule,PatientsModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
