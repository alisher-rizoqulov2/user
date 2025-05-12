import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Doctor } from './model/doctor.model';
import { PatientsService } from '../patients/patients.service';
import { MedicalRecordsService } from '../medical-records/medical-records.service';

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor)
    private readonly doctormodel: typeof Doctor,
    private readonly patientsService: PatientsService,
    // private readonly medicalrecordService: MedicalRecordsService,
  ) {}
  create(createDoctorDto: CreateDoctorDto) {
    return this.doctormodel.create(createDoctorDto);
  }

  findAll() {
    return this.doctormodel.findAll();
  }

  async findOne(id: number) {
    const doctor = await this.doctormodel.findByPk(id);
    if (!doctor) {
      throw new NotFoundException("Doctor topilmadi");
    }
    return doctor;
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    const doctor = await this.doctormodel.findByPk(id);
    if (!doctor) {
      throw new BadRequestException(`Foydalanuvchi topilmadi: ID ${id}`);
    }
    await doctor.update(updateDoctorDto);
    return {
      message: `Foydalanuvchi muvaffaqiyatli yangilandi: ID ${id}`,
      doctor,
    };
  }
  findAdminByEmail(email: string) {
    return this.doctormodel.findOne({ where: { email } });
  }

  async remove(id: number) {
    const doctor = await this.doctormodel.findByPk(id);
    if (!doctor) {
      throw new BadRequestException(`Foydalanuvchi topilmadi: ID ${id}`);
    }
    await doctor.destroy();
    return { message: `Foydalanuvchi muvaffaqiyatli o'chirildi: ID ${id}` };
  }

  async is_active_True(id: number) {
    const admin = await this.doctormodel.findOne({ where: { id } });
    if (!admin) {
      return { message: "Bunaqa id li admin topilmadi" };
    }
    admin.is_active = true;
    await admin?.save();
    return admin;
  }
  async is_active_False(id: number) {
    const admin = await this.doctormodel.findOne({ where: { id } });
    if (!admin) {
      return { message: "Bunaqa id li admin topilmadi" };
    }
    admin.is_active = false;
    await admin?.save();
    return admin;
  }

  async aqlli1(){
    
    
  }
}
