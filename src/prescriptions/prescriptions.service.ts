import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreatePrescriptionDto } from "./dto/create-prescription.dto";
import { UpdatePrescriptionDto } from "./dto/update-prescription.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Prescription } from "./model/prescription.model";
import { DoctorService } from "../doctor/doctor.service";
import { PatientsService } from "../patients/patients.service";

@Injectable()
export class PrescriptionsService {
  constructor(
    @InjectModel(Prescription)
    private readonly Prescriptionmodel: typeof Prescription,
    private readonly doctorService: DoctorService,
    private readonly patientsService: PatientsService
  ) {}
  async create(createPrescriptionDto: CreatePrescriptionDto) {
    const { doctor_id, patient_id } = createPrescriptionDto;  
    if (doctor_id) {
      const doctor =await this.doctorService.findOne(doctor_id);
      if (!doctor) {
        throw new BadRequestException(`Bunaqa id li doctor topilmadi`);
      }
    }
    if (patient_id) {
      const patient = await this.patientsService.findOne(patient_id);
      if (!patient) {
        throw new BadRequestException(`Bunaqa id li patient topilmadi`);
      }
    }
    return await this.Prescriptionmodel.create(createPrescriptionDto);
  }

  findAll() {
    return this.Prescriptionmodel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    const prescription = this.Prescriptionmodel.findByPk(id);
    if (!prescription) {
      throw new NotFoundException(`prescription topilmadi: ID ${id}`);
    }
    return prescription;
  }

  async update(id: number, updatePrescriptionDto: UpdatePrescriptionDto) {
   const prescription = await this.Prescriptionmodel.findByPk(id);
       if (!prescription) {
         throw new BadRequestException(`Foydalanuvchi topilmadi: ID ${id}`);
       }
       await prescription.update(updatePrescriptionDto);
       return {
         message: `Foydalanuvchi muvaffaqiyatli yangilandi: ID ${id}`,
         prescription,
       };
  }

  remove(id: number) {
    const prescription = this.Prescriptionmodel.findByPk(id);
    if (!prescription) {
      throw new BadRequestException(`prescription topilmadi: ID ${id}`);
    }
    this.Prescriptionmodel.destroy({ where: { id } });
    return { message: `prescription muvaffaqiyatli o'chirildi: ID ${id}` };
  }
    async doctormuolaja(id: number) {
      const doctor = await this.Prescriptionmodel.findOne({
        where: { doctor_id: id },
      });
  
      if (!doctor) {
        throw new BadRequestException("Shifokor topilmadi");
      }
  
      const patients = await this.Prescriptionmodel.findAll({
        where: { doctor_id: id },
        include: { all: true },
      });
      const activePatients: Prescription[] = [];
  
      for (const patientRecord of patients) {
          activePatients.push(patientRecord);
      }
  
      return activePatients;
    }
}
