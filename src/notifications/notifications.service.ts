import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Notification } from "./models/notification.model";
import { DoctorService } from "../doctor/doctor.service";
import { PatientsService } from "../patients/patients.service";

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification)
    private readonly notificationmodel: typeof Notification,
    private readonly doctorService: DoctorService,
    private readonly patientsService: PatientsService
  ) {}
  async create(createNotificationDto: CreateNotificationDto) {
    const { patient_id } = createNotificationDto;

    if (patient_id) {
      const patient = await this.patientsService.findOne(patient_id);
      if (!patient) {
        throw new BadRequestException(`Bunaqa id li patient topilmadi`);
      }
    }
    return this.notificationmodel.create(createNotificationDto);
  }

  findAll() {
    return this.notificationmodel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const notification = await this.notificationmodel.findByPk(id);
    if (!notification) {
      throw new NotFoundException("notification topilmadi");
    }
    return notification;
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    const notification = await this.notificationmodel.findByPk(id);
    if (!notification) {
      throw new BadRequestException(`Foydalanuvchi topilmadi: ID ${id}`);
    }
    await notification.update(updateNotificationDto);
    return {
      message: `Foydalanuvchi muvaffaqiyatli yangilandi: ID ${id}`,
      notification,
    };
  }

  async remove(id: number) {
    const notification = await this.notificationmodel.findByPk(id);
    if (!notification) {
      throw new BadRequestException(`notification topilmadi: ID ${id}`);
    }
    await notification.destroy();
    return { message: `notification muvaffaqiyatli o'chirildi: ID ${id}` };
  }
}
