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
import { PatientsService } from "./patients.service";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import { activeGuard } from "../common/guards/user.active.guard";
import { adminguard } from "../common/guards/user.selfadmin.guard";
import { authGuard } from "../common/guards/admin.guard";
import { roleguard } from "../common/guards/user.role.guard";
import { patientselfguard } from "../common/guards/user.patientuchun.guard";

@ApiTags("Patients")
@Controller("patients")
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi bemor qo‘shish" })
  @ApiResponse({ status: 201, description: "Bemor muvaffaqiyatli qo‘shildi." })
  @ApiResponse({ status: 400, description: "Noto‘g‘ri ma’lumotlar." })
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }
  @UseGuards(roleguard)
  @UseGuards(authGuard)
  @Get()
  @ApiOperation({ summary: "Barcha bemorlarni olish" })
  @ApiResponse({ status: 200, description: "Barcha bemorlar ro‘yxati." })
  findAll() {
    return this.patientsService.findAll();
  }
  @UseGuards(activeGuard)
  @UseGuards(patientselfguard)
  @UseGuards(authGuard)
  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha bemorni olish" })
  @ApiParam({ name: "id", type: Number, description: "Bemor IDsi" })
  @ApiResponse({ status: 200, description: "Topilgan bemor." })
  @ApiResponse({ status: 404, description: "Bemor topilmadi." })
  findOne(@Param("id") id: string) {
    return this.patientsService.findOne(+id);
  }
  @UseGuards(activeGuard)
  @UseGuards(patientselfguard)
  @UseGuards(authGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Bemor ma’lumotlarini yangilash" })
  @ApiParam({ name: "id", type: Number, description: "Bemor IDsi" })
  @ApiResponse({ status: 200, description: "Bemor muvaffaqiyatli yangilandi." })
  @ApiResponse({ status: 404, description: "Bemor topilmadi." })
  update(@Param("id") id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(+id, updatePatientDto);
  }
  @UseGuards(activeGuard)
  @UseGuards(roleguard)
  @UseGuards(authGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Bemorni o‘chirish" })
  @ApiParam({ name: "id", type: Number, description: "Bemor IDsi" })
  @ApiResponse({ status: 200, description: "Bemor muvaffaqiyatli o‘chirildi." })
  @ApiResponse({ status: 404, description: "Bemor topilmadi." })
  remove(@Param("id") id: string) {
    return this.patientsService.remove(+id);
  }
  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  @Get("active/:id")
  is_active_True(@Param("id") id: number) {
    return this.patientsService.is_active_True(id);
  }
  @UseGuards(activeGuard)
  @UseGuards(roleguard)
  @UseGuards(authGuard)
  @Get("activeFalse/:id")
  is_active_False(@Param("id") id: number) {
    return this.patientsService.is_active_False(id);
  }
  @Get("activate/:link")
  activateUser(@Param("link") link: string) {
    return this.patientsService.activatePatient(link);
  }
}
