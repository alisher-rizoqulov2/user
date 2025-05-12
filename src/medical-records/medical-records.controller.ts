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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { MedicalRecordsService } from "./medical-records.service";
import { CreateMedicalRecordDto } from "./dto/create-medical-record.dto";
import { UpdateMedicalRecordDto } from "./dto/update-medical-record.dto";
import { activeGuard } from "../common/guards/user.active.guard";
import { adminguard } from "../common/guards/user.selfadmin.guard";
import { authGuard } from "../common/guards/admin.guard";
import { roleguard } from "../common/guards/user.role.guard";

@ApiTags("Medical Records") // Swagger bo‘lim nomi
@Controller("medical-records")
export class MedicalRecordsController {
  constructor(private readonly medicalRecordsService: MedicalRecordsService) {}

  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  @Post()
  @ApiOperation({ summary: "Yangi tibbiy yozuv qo‘shish" })
  @ApiResponse({
    status: 201,
    description: "Tibbiy yozuv muvaffaqiyatli yaratildi",
  })
  @ApiResponse({ status: 400, description: "Noto‘g‘ri ma’lumot" })
  @ApiBody({ type: CreateMedicalRecordDto })
  create(@Body() createMedicalRecordDto: CreateMedicalRecordDto) {
    return this.medicalRecordsService.create(createMedicalRecordDto);
  }

  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  @Get()
  @ApiOperation({ summary: "Barcha tibbiy yozuvlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Tibbiy yozuvlar ro‘yxati qaytarildi",
  })
  findAll() {
    return this.medicalRecordsService.findAll();
  }

  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha tibbiy yozuvni olish" })
  @ApiParam({ name: "id", type: Number, description: "Tibbiy yozuv ID raqami" })
  @ApiResponse({
    status: 200,
    description: "Tibbiy yozuv topildi",
  })
  @ApiResponse({ status: 404, description: "Tibbiy yozuv topilmadi" })
  findOne(@Param("id") id: string) {
    return this.medicalRecordsService.findOne(+id);
  }

  @UseGuards(activeGuard)
  @UseGuards(roleguard)
  @UseGuards(authGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Tibbiy yozuvni yangilash" })
  @ApiParam({ name: "id", type: Number, description: "Tibbiy yozuv ID raqami" })
  @ApiResponse({
    status: 200,
    description: "Tibbiy yozuv muvaffaqiyatli yangilandi",
  })
  @ApiResponse({ status: 404, description: "Tibbiy yozuv topilmadi" })
  @ApiBody({ type: UpdateMedicalRecordDto })
  update(
    @Param("id") id: string,
    @Body() updateMedicalRecordDto: UpdateMedicalRecordDto
  ) {
    return this.medicalRecordsService.update(+id, updateMedicalRecordDto);
  }

  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Tibbiy yozuvni o‘chirish" })
  @ApiParam({ name: "id", type: Number, description: "Tibbiy yozuv ID raqami" })
  @ApiResponse({
    status: 200,
    description: "Tibbiy yozuv muvaffaqiyatli o‘chirildi",
  })
  @ApiResponse({ status: 404, description: "Tibbiy yozuv topilmadi" })
  remove(@Param("id") id: string) {
    return this.medicalRecordsService.remove(+id);
  }

  @UseGuards(activeGuard)
  @UseGuards(roleguard)
  @UseGuards(authGuard)
  @Get("/doctor/:id")
  doctor(@Param("id") id: string) {
    return this.medicalRecordsService.doctor(+id);
  }
  @UseGuards(activeGuard)
  @UseGuards(roleguard)
  @UseGuards(authGuard)
  @Get("/doctor2/:id")
  doctor2(@Param("id") id: string) {
    return this.medicalRecordsService.doctor2(+id);
  }
}
