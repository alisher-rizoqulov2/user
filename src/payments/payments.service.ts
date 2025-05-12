import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Payment } from "./models/payment.model";
import { PatientsService } from "../patients/patients.service";

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment)
    private readonly paymentmodel: typeof Payment,
    private readonly patientsService: PatientsService
  ) {}
  async create(createPaymentDto: CreatePaymentDto) {
    const { patient_id } = createPaymentDto;
    if (patient_id) {
      const patient = await this.patientsService.findOne(patient_id);
      if (!patient) {
        throw new BadRequestException(`Bunaqa id li patient topilmadi`);
      }
    }
    return this.paymentmodel.create(createPaymentDto);
  }

  findAll() {
    return this.paymentmodel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const payment = await this.paymentmodel.findByPk(id);
    if (!payment) {
      throw new NotFoundException("payment topilmadi");
    }
    return payment;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.paymentmodel.findByPk(id);
    if (!payment) {
      throw new BadRequestException(`payment topilmadi: ID ${id}`);
    }
    await payment.update(updatePaymentDto);
    return {
      message: `payment muvaffaqiyatli yangilandi: ID ${id}`,
      payment,
    };
  }

  async remove(id: number) {
    const payment = await this.paymentmodel.findByPk(id);
    if (!payment) {
      throw new BadRequestException(`payment topilmadi: ID ${id}`);
    }
    await payment.destroy();
    return { message: `payment muvaffaqiyatli o'chirildi: ID ${id}` };
  }
}
