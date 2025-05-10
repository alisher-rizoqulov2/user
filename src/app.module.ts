import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";

import { TelegrafModule } from "nestjs-telegraf";
import { BOT_NAME } from "./app.contants";
import { MedicationsModule } from './medications/medications.module';
import { PatientsModule } from './patients/patients.module';
import { AdminModule } from './admin/admin.module';
import { DoctorModule } from './doctor/doctor.module';
import { MedicalRecordsModule } from './medical-records/medical-records.module';
import { DepartmentsModule } from './departments/departments.module';
import { PaymentsModule } from './payments/payments.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { LabTestsModule } from './lab-tests/lab-tests.module';
import { PrescriptionsModule } from './prescriptions/prescriptions.module';
import { Doctor } from "./doctor/model/doctor.model";
import { Admin } from "./admin/models/admin.model";
import { Appointment } from "./appointments/models/appointment.model";
import { Department } from "./departments/models/department.model";
import { LabTest } from "./lab-tests/models/lab-test.model";
import { MedicalRecord } from "./medical-records/models/medical-record.model";
import { Medication } from "./medications/models/medication.model";
import { Notification } from "./notifications/models/notification.model";
import { Patient } from "./patients/models/patient.model";
import { Payment } from "./payments/models/payment.model";
import { Prescription } from "./prescriptions/model/prescription.model";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),

    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: () => ({
        token: process.env.BOT_TOKEN!,
        middlewares: [],
        include: [],
      }),
    }),

    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [Doctor,Admin,Appointment,Department,LabTest,MedicalRecord,Medication,Notification,Patient,Payment,Prescription],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),

    MedicationsModule,

    PatientsModule,

    AdminModule,

    DoctorModule,

    MedicalRecordsModule,

    DepartmentsModule,

    PaymentsModule,

    AppointmentsModule,

    NotificationsModule,

    LabTestsModule,

    PrescriptionsModule,

    AuthModule,
  ],
  // controllers: [CarCategory, CarcategoryController],
  // providers: [CarcategoryService],
})
export class AppModule {}
