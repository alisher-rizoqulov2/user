import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateDepartmentDto } from "./dto/create-department.dto";
import { UpdateDepartmentDto } from "./dto/update-department.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Department } from "./models/department.model";
import { DoctorModule } from "../doctor/doctor.module";
import { DoctorService } from "../doctor/doctor.service";

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectModel(Department)
    private readonly departmentmodel: typeof Department,
    private readonly doctorService: DoctorService
  ) {}
  create(createDepartmentDto: CreateDepartmentDto) {
    const { head_doctor_id } = createDepartmentDto;
    if (head_doctor_id) {
      const doctor = this.doctorService.findOne(head_doctor_id);
      if (!doctor) {
        throw new BadRequestException(`Bunaqa id li doctor topilmadi`);
      }
    }
    return this.departmentmodel.create(createDepartmentDto);
  }

  findAll() {
    return this.departmentmodel.findAll();
  }

  async findOne(id: number) {
    const departments = await this.departmentmodel.findByPk(id);
    if (!departments) {
      throw new NotFoundException("departments topilmadi");
    }
    return departments;
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    const departments = await this.departmentmodel.findByPk(id);
    if (!departments) {
      throw new BadRequestException(`departments topilmadi: ID ${id}`);
    }
    await departments.update(updateDepartmentDto);
    return {
      message: `departments muvaffaqiyatli yangilandi: ID ${id}`,
      departments,
    };
  }

  async remove(id: number) {
    const departments = await this.departmentmodel.findByPk(id);
    if (!departments) {
      throw new BadRequestException(`departments topilmadi: ID ${id}`);
    }
    await departments.destroy();
    return { message: `departments muvaffaqiyatli o'chirildi: ID ${id}` };
  }
}
