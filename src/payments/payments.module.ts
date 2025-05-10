import { Module } from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { PaymentsController } from "./payments.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Payment } from "./models/payment.model";
import { DoctorModule } from "../doctor/doctor.module";
import { PatientsModule } from "../patients/patients.module";

@Module({
  imports: [SequelizeModule.forFeature([Payment]),DoctorModule,PatientsModule],

  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
