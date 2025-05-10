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
import { DoctorService } from "./doctor.service";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";
import { activeGuard } from "../common/guards/user.active.guard";
import { authGuard } from "../common/guards/admin.guard";
import { roleguard } from "../common/guards/user.role.guard";
import { adminguard } from "../common/guards/user.selfadmin.guard";

@ApiTags("Doctors") // Swaggerda bo'lim nomi
@Controller("doctor")
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}
  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  @Post()
  @ApiOperation({ summary: "Yangi shifokor qo‘shish" })
  @ApiResponse({
    status: 201,
    description: "Shifokor muvaffaqiyatli qo‘shildi",
  })
  @ApiResponse({ status: 400, description: "Noto‘g‘ri ma’lumotlar" })
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }
  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  @Get()
  @ApiOperation({ summary: "Barcha shifokorlar ro‘yxatini olish" })
  @ApiResponse({ status: 200, description: "Shifokorlar ro‘yxati qaytarildi" })
  findAll() {
    return this.doctorService.findAll();
  }
  @UseGuards(activeGuard)
  @UseGuards(roleguard)
  @UseGuards(authGuard)
  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha shifokorni olish" })
  @ApiParam({ name: "id", type: Number, description: "Shifokor ID raqami" })
  @ApiResponse({ status: 200, description: "Topilgan shifokor qaytarildi" })
  @ApiResponse({ status: 404, description: "Shifokor topilmadi" })
  findOne(@Param("id") id: string) {
    return this.doctorService.findOne(+id);
  }
  @UseGuards(activeGuard)
  @UseGuards(roleguard)
  @UseGuards(authGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Shifokor ma’lumotlarini yangilash" })
  @ApiParam({ name: "id", type: Number, description: "Shifokor ID raqami" })
  @ApiResponse({
    status: 200,
    description: "Shifokor muvaffaqiyatli yangilandi",
  })
  @ApiResponse({ status: 404, description: "Shifokor topilmadi" })
  update(@Param("id") id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(+id, updateDoctorDto);
  }
  @UseGuards(activeGuard)
  @UseGuards(roleguard)
  @UseGuards(authGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Shifokorni o‘chirish" })
  @ApiParam({ name: "id", type: Number, description: "Shifokor ID raqami" })
  @ApiResponse({
    status: 200,
    description: "Shifokor muvaffaqiyatli o‘chirildi",
  })
  @ApiResponse({ status: 404, description: "Shifokor topilmadi" })
  remove(@Param("id") id: string) {
    return this.doctorService.remove(+id);
  }
  @UseGuards(activeGuard)
  @UseGuards(roleguard)
  @UseGuards(authGuard)
  @Get("active/:id")
  is_active_True(@Param("id") id: number) {
    return this.doctorService.is_active_True(id);
  }
  @UseGuards(activeGuard)
  @UseGuards(roleguard)
  @UseGuards(authGuard)
  @Get("activeFalse/:id")
  is_active_False(@Param("id") id: number) {
    return this.doctorService.is_active_False(id);
  }
}
