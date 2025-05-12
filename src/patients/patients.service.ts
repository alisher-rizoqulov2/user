import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Patient } from "./models/patient.model";
import { MailService } from "../mail/mail.service";

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient)
    private readonly Patientmodel: typeof Patient,
    private readonly mailService: MailService
  ) {}
  async create(createPatientDto: CreatePatientDto) {
    const patient = await this.Patientmodel.create(createPatientDto);
    try {
      await this.mailService.sendMailPatient(patient);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException("emailga xat yuborishda xatolik");
    }
    return patient;
  }

  findAll() {
    return this.Patientmodel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const patients = await this.Patientmodel.findByPk(id);
    if (!patients) {
      throw new NotFoundException("patients topilmadi");
    }
    return patients;
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    const patients = await this.Patientmodel.findByPk(id);
    if (!patients) {
      throw new BadRequestException(`Foydalanuvchi topilmadi: ID ${id}`);
    }
    await patients.update(updatePatientDto);
    return {
      message: `Foydalanuvchi muvaffaqiyatli yangilandi: ID ${id}`,
      patients,
    };
  }

  async remove(id: number) {
    const patient = await this.Patientmodel.findByPk(id);
    if (!patient) {
      throw new BadRequestException(`Foydalanuvchi topilmadi: ID ${id}`);
    }
    await patient.destroy();
    return { message: `Foydalanuvchi muvaffaqiyatli o'chirildi: ID ${id}` };
  }
  findAdminByEmail(email: string) {
    return this.Patientmodel.findOne({ where: { email } });
  }
  async is_active_True(id: number) {
    const admin = await this.Patientmodel.findOne({ where: { id } });
    if (!admin) {
      return { message: "Bunaqa id li patient topilmadi" };
    }
    admin.setDataValue("is_active", true);
    await admin.save();

    return admin;
  }
  async is_active_False(id: number) {
    const admin = await this.Patientmodel.findOne({ where: { id } });
    if (!admin) {
      return { message: "Bunaqa id li patient topilmadi" };
    }
    admin.is_active = false;
    await admin?.save();
    return admin;
  }
  async activatePatient(link: string) {
    if (!link) {
      throw new BadRequestException({ messsage: "Activation link not found" });
    }
    const updateDoctor = await this.Patientmodel.update(
      {
        is_active: true,
      },
      {
        where: {
          activation_link: link,
          is_active: false,
        },
        returning: true,
      }
    );
    if (!updateDoctor[1][0]) {
      throw new BadRequestException({ message: "User already activated" });
    }
    return {
      massage: "User Activete Successfully",
      is_activate: updateDoctor[1][0].is_active,
    };
  }
}
