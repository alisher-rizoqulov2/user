import { Module } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { NotificationsController } from "./notifications.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Notification } from "./models/notification.model";
import { DoctorModule } from "../doctor/doctor.module";
import { PatientsModule } from "../patients/patients.module";

@Module({
  imports: [SequelizeModule.forFeature([Notification]),DoctorModule,PatientsModule],

  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
