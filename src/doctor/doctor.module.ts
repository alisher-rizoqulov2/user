import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Doctor } from './model/doctor.model';
import { PatientsModule } from '../patients/patients.module';

@Module({
  imports: [SequelizeModule.forFeature([Doctor]),PatientsModule],
  controllers: [DoctorController],
  providers: [DoctorService],
  exports: [DoctorService],
})
export class DoctorModule {}
