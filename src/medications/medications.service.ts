import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Medication } from "./models/medication.model";
import { CreateMedicationDto } from "./dto/create-medication.dto";
import { UpdateMedicationDto } from "./dto/update-medication.dto";

@Injectable()
export class MedicationsService {
  constructor(
    @InjectModel(Medication)
    private readonly medicationRepo: typeof Medication
  ) {}

  async create(createMedicationDto: CreateMedicationDto) {
    return await this.medicationRepo.create(createMedicationDto);
  }

  async findAll() {
    return  this.medicationRepo.findAll();
  }

  async findOne(id: number) {
    const medication = await this.medicationRepo.findByPk(id);
    if (!medication) {
      throw new NotFoundException("Dori topilmadi");
    }
    return medication;
  }

  async update(id: number, updateMedicationDto: UpdateMedicationDto) {
    const medication = await this.findOne(id);
    return await medication.update(updateMedicationDto);
  }

  async remove(id: number) {
    const medication = await this.findOne(id);
    await medication.destroy();
    return { message: "Dori muvaffaqiyatli o‘chirildi" };
  }
}
