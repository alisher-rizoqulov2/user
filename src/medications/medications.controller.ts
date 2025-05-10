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
import { MedicationsService } from "./medications.service";
import { CreateMedicationDto } from "./dto/create-medication.dto";
import { UpdateMedicationDto } from "./dto/update-medication.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { activeGuard } from "../common/guards/user.active.guard";
import { adminguard } from "../common/guards/user.selfadmin.guard";
import { authGuard } from "../common/guards/admin.guard";

@ApiTags("Medications")
@Controller("medications")
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  @Post()
  @ApiOperation({ summary: "Yangi dori qo‘shish" })
  @ApiResponse({ status: 201, description: "Dori muvaffaqiyatli yaratildi" })
  @ApiResponse({ status: 400, description: "Noto‘g‘ri ma’lumotlar" })
  create(@Body() createMedicationDto: CreateMedicationDto) {
    return this.medicationsService.create(createMedicationDto);
  }

  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  @Get()
  @ApiOperation({ summary: "Barcha dorilar ro‘yxatini olish" })
  @ApiResponse({ status: 200, description: "Dorilar ro‘yxati qaytarildi" })
  findAll() {
    return this.medicationsService.findAll();
  }

  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha dori topish" })
  @ApiParam({ name: "id", type: Number, description: "Dori ID raqami" })
  @ApiResponse({ status: 200, description: "Topilgan dori qaytarildi" })
  @ApiResponse({ status: 404, description: "Dori topilmadi" })
  findOne(@Param("id") id: string) {
    return this.medicationsService.findOne(+id);
  }

  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Dorini yangilash" })
  @ApiParam({ name: "id", type: Number, description: "Dori ID raqami" })
  @ApiResponse({ status: 200, description: "Dori muvaffaqiyatli yangilandi" })
  @ApiResponse({ status: 404, description: "Dori topilmadi" })
  update(
    @Param("id") id: string,
    @Body() updateMedicationDto: UpdateMedicationDto
  ) {
    return this.medicationsService.update(+id, updateMedicationDto);
  }

  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Dorini o‘chirish" })
  @ApiParam({ name: "id", type: Number, description: "Dori ID raqami" })
  @ApiResponse({ status: 200, description: "Dori muvaffaqiyatli o‘chirildi" })
  @ApiResponse({ status: 404, description: "Dori topilmadi" })
  remove(@Param("id") id: string) {
    return this.medicationsService.remove(+id);
  }
}
