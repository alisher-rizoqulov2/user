import { Module } from '@nestjs/common';
import { MedicalRecordsService } from './medical-records.service';
import { MedicalRecordsController } from './medical-records.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MedicalRecord } from './models/medical-record.model';
import { DoctorModule } from '../doctor/doctor.module';
import { PatientsModule } from '../patients/patients.module';

@Module({
    imports: [SequelizeModule.forFeature([MedicalRecord]),DoctorModule,PatientsModule],
  
  controllers: [MedicalRecordsController],
  providers: [MedicalRecordsService],
  exports:[MedicalRecordsService]
})
export class MedicalRecordsModule {}
