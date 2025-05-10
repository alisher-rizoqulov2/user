import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Admin } from "./models/admin.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin)
    private readonly adminmodel: typeof Admin
  ) {}

  create(createAdminDto: CreateAdminDto) {
    return this.adminmodel.create(createAdminDto);
  }

  findAll() {
    return this.adminmodel.findAll();
  }

  async findOne(id: number) {
    const admin = await this.adminmodel.findByPk(id);
    if (!admin) {
      throw new NotFoundException("Admin topilmadi");
    }
    return admin;
  }
  findAdminByEmail(email: string) {
    return this.adminmodel.findOne({ where: { email } });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminmodel.findByPk(id);
    if (!admin) {
      throw new BadRequestException(`Foydalanuvchi topilmadi: ID ${id}`);
    }
    await admin.update(updateAdminDto);
    return {
      message: `Foydalanuvchi muvaffaqiyatli yangilandi: ID ${id}`,
      admin,
    };
  }

  async remove(id: number) {
    const admin = await this.adminmodel.findByPk(id);
    if (!admin) {
      throw new BadRequestException(`Foydalanuvchi topilmadi: ID ${id}`);
    }
    if(id === 1) {
      throw new BadRequestException(`Adminni o'chirish mumkin emas: ID ${id}`); 
    }
    await admin.destroy();
    return { message: `Foydalanuvchi muvaffaqiyatli o'chirildi: ID ${id}` };
  }

  async is_active_True(id: number) {
    const admin = await this.adminmodel.findOne({ where: { id } });
    if (!admin) {
      return { message: "Bunaqa id li admin topilmadi" };
    }
    admin.is_active = true;
    await admin?.save();
    return admin;
  }
  async is_active_False(id: number) {
    const admin = await this.adminmodel.findOne({ where: { id } });
    if (!admin) {
      return { message: "Bunaqa id li admin topilmadi" };
    }
    admin.is_active = false;
    await admin?.save();
    return admin;
  }
}
