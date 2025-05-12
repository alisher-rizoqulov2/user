import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateMedicalRecordDto } from "./dto/create-medical-record.dto";
import { UpdateMedicalRecordDto } from "./dto/update-medical-record.dto";
import { InjectModel } from "@nestjs/sequelize";
import { MedicalRecord } from "./models/medical-record.model";
import { DoctorService } from "../doctor/doctor.service";
import { PatientsService } from "../patients/patients.service";
import { Patient } from "../patients/models/patient.model";

@Injectable()
export class MedicalRecordsService {
  constructor(
    @InjectModel(MedicalRecord)
    private readonly medicalRecordmodel: typeof MedicalRecord,
    private readonly doctorService: DoctorService,
    private readonly patientsService: PatientsService
  ) {}
  async create(createMedicalRecordDto: CreateMedicalRecordDto) {
    const { doctor_id, patient_id } = createMedicalRecordDto;
    if (doctor_id) {
      const doctor = await this.doctorService.findOne(doctor_id);
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
    return this.medicalRecordmodel.create(createMedicalRecordDto);
  }

  findAll() {
    return this.medicalRecordmodel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const medicalRocord = await this.medicalRecordmodel.findByPk(id);
    if (!medicalRocord) {
      throw new NotFoundException("medicalRocord topilmadi");
    }
    return medicalRocord;
  }

  async update(id: number, updateMedicalRecordDto: UpdateMedicalRecordDto) {
    const medicalRocord = await this.medicalRecordmodel.findByPk(id);
    if (!medicalRocord) {
      throw new BadRequestException(`medicalRocord topilmadi: ID ${id}`);
    }
    await medicalRocord.update(updateMedicalRecordDto);
    return {
      message: `medicalRocord muvaffaqiyatli yangilandi: ID ${id}`,
      medicalRocord,
    };
  }

  async remove(id: number) {
    const medicalRocord = await this.medicalRecordmodel.findByPk(id);
    if (!medicalRocord) {
      throw new BadRequestException(`medicalRocord topilmadi: ID ${id}`);
    }
    await medicalRocord.destroy();
    return { message: `medicalRocord muvaffaqiyatli o'chirildi: ID ${id}` };
  }
  async doctor(id: number) {
    const doctor = await this.medicalRecordmodel.findOne({
      where: { doctor_id: id },
    });

    if (!doctor) {
      throw new Error("Shifokor topilmadi");
    }

    const patients = await this.medicalRecordmodel.findAll({
      where: { doctor_id: id },
      include: { all: true },
    });
    const activePatients: Patient[] = [];

    for (const patientRecord of patients) {
      const patient = patientRecord.dataValues.patient;

      if (patient.dataValues.status === "active") {
        activePatients.push(patient);
      }
    }

    return activePatients;
  }
  async doctor2(id: number) {
    const doctor = await this.medicalRecordmodel.findOne({
      where: { doctor_id: id },
    });

    if (!doctor) {
      throw new Error("Shifokor topilmadi");
    }

    const patients = await this.medicalRecordmodel.findAll({
      where: { doctor_id: id },
      include: { all: true },
    });
    const activePatients: Patient[] = [];

    for (const patientRecord of patients) {
      const patient = patientRecord.dataValues.patient;
      activePatients.push(patient);
    }

    return activePatients;
  }
}
