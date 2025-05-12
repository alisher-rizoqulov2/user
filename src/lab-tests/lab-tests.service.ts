import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLabTestDto } from './dto/create-lab-test.dto';
import { UpdateLabTestDto } from './dto/update-lab-test.dto';
import { InjectModel } from '@nestjs/sequelize';
import { LabTest } from './models/lab-test.model';
import { DoctorService } from '../doctor/doctor.service';
import { PatientsService } from '../patients/patients.service';

@Injectable()
export class LabTestsService {
  constructor(
        @InjectModel(LabTest)
        private readonly labtestmodel: typeof LabTest,
        private readonly doctorService: DoctorService,
            private readonly patientsService: PatientsService
      ) {}
  async create(createLabTestDto: CreateLabTestDto) {
    const { doctor_id, patient_id } = createLabTestDto;
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
        return this.labtestmodel.create(createLabTestDto);

  }

  findAll() {
        return this.labtestmodel.findAll({ include: { all: true } });

  }

  async findOne(id: number) {
    const labtest = await this.labtestmodel.findByPk(id);
        if (!labtest) {
          throw new NotFoundException("labtest topilmadi");
        }
        return labtest;
  }

  async update(id: number, updateLabTestDto: UpdateLabTestDto) {
    const labtest = await this.labtestmodel.findByPk(id);
        if (!labtest) {
          throw new BadRequestException(`labtest topilmadi: ID ${id}`);
        }
        await labtest.update(updateLabTestDto);
        return {
          message: `labtest muvaffaqiyatli yangilandi: ID ${id}`,
          labtest,
        };
  }

  async remove(id: number) {
    const labtest = await this.labtestmodel.findByPk(id);
    if (!labtest) {
      throw new BadRequestException(`labtest topilmadi: ID ${id}`);
    }
    await labtest.destroy();
    return { message: `labtest muvaffaqiyatli o'chirildi: ID ${id}` };
  }
}
