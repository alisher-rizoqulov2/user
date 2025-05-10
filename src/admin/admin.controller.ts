import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { authGuard } from "../common/guards/admin.guard";
import { activeGuard } from "../common/guards/user.active.guard";
import { selfguard } from "../common/guards/user.self.guard";
import { selfsuperguard } from "../common/guards/user.self.super.guard";


@ApiTags("Admins") // Swagger bo‘lim nomi
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(selfsuperguard)
  @UseGuards(activeGuard)
  @UseGuards(authGuard)
  @Post()
  @ApiOperation({
    summary: "Yangi admin yaratish",
    description: "Yangi admin foydalanuvchisini tizimga qo‘shadi.",
  })
  @ApiResponse({ status: 201, description: "Admin muvaffaqiyatli yaratildi" })
  @ApiResponse({
    status: 400,
    description: "Yaratishda xatolik: noto‘g‘ri ma’lumotlar",
  })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  @UseGuards(selfsuperguard)
  @UseGuards(activeGuard)
  @UseGuards(authGuard)
  @ApiOperation({
    summary: "Barcha adminlar ro‘yxatini olish",
    description:
      "Tizimdagi barcha adminlar ro‘yxatini qaytaradi (faqat avtorizatsiyadan o‘tganlar uchun).",
  })
  @ApiResponse({ status: 200, description: "Adminlar ro‘yxati qaytarildi" })
  @ApiResponse({ status: 401, description: "Avtorizatsiya talab qilinadi" })
  findAll() {
    return this.adminService.findAll();
  }

  @UseGuards(selfguard)
  @UseGuards(authGuard)
  @Get(":id")
  @ApiOperation({
    summary: "ID bo‘yicha adminni olish",
    description: "Berilgan ID bo‘yicha bitta admin ma’lumotlarini qaytaradi.",
  })
  @ApiParam({ name: "id", type: Number, description: "Admin ID raqami" })
  @ApiResponse({ status: 200, description: "Admin topildi" })
  @ApiResponse({ status: 404, description: "Admin topilmadi" })
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(+id);
  }

  @UseGuards(selfguard)
  @UseGuards(authGuard)
  @Patch(":id")
  @ApiOperation({
    summary: "Admin ma’lumotlarini yangilash",
    description: "Adminning ma’lumotlarini yangilaydi.",
  })
  @ApiParam({ name: "id", type: Number, description: "Admin ID raqami" })
  @ApiResponse({ status: 200, description: "Admin muvaffaqiyatli yangilandi" })
  @ApiResponse({ status: 400, description: "Yaroqsiz ma’lumotlar" })
  @ApiResponse({ status: 404, description: "Admin topilmadi" })
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @UseGuards(selfguard)
  @UseGuards(authGuard)
  @Delete(":id")
  @ApiOperation({
    summary: "Adminni o‘chirish",
    description: "Berilgan ID bo‘yicha adminni tizimdan o‘chiradi.",
  })
  @ApiParam({ name: "id", type: Number, description: "Admin ID raqami" })
  @ApiResponse({ status: 200, description: "Admin o‘chirildi" })
  @ApiResponse({ status: 404, description: "Admin topilmadi" })
  remove(@Param("id") id: string) {
    return this.adminService.remove(+id);
  }

  @UseGuards(selfsuperguard)
  @UseGuards(authGuard)
  @Get("active/:id")
  @ApiOperation({
    summary: "Adminni aktiv qilish",
    description: "Adminning holatini aktiv (true) holatga o‘tkazadi.",
  })
  @ApiParam({ name: "id", type: Number, description: "Admin ID raqami" })
  @ApiResponse({ status: 200, description: "Admin aktiv holatga o‘tkazildi" })
  @ApiResponse({ status: 404, description: "Admin topilmadi" })
  is_active_True(@Param("id") id: number) {
    return this.adminService.is_active_True(id);
  }

  @UseGuards(selfsuperguard)
  @UseGuards(authGuard)
  @Get("activeFalse/:id")
  @ApiOperation({
    summary: "Adminni noaktiv qilish",
    description: "Adminning holatini noaktiv (false) holatga o‘tkazadi.",
  })
  @ApiParam({ name: "id", type: Number, description: "Admin ID raqami" })
  @ApiResponse({ status: 200, description: "Admin noaktiv holatga o‘tkazildi" })
  @ApiResponse({ status: 404, description: "Admin topilmadi" })
  is_active_False(@Param("id") id: number) {
    return this.adminService.is_active_False(id);
  }
}
