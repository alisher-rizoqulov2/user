import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from '../admin/admin.module';
import { MailModule } from '../mail/mail.module';
import { DoctorModule } from '../doctor/doctor.module';
import { PatientsModule } from '../patients/patients.module';

@Module({
  imports:[JwtModule.register({global:true}),AdminModule,MailModule,DoctorModule,PatientsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
