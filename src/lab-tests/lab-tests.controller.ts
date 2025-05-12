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
import { LabTestsService } from "./lab-tests.service";
import { CreateLabTestDto } from "./dto/create-lab-test.dto";
import { UpdateLabTestDto } from "./dto/update-lab-test.dto";
import { activeGuard } from "../common/guards/user.active.guard";
import { adminguard } from "../common/guards/user.selfadmin.guard";
import { authGuard } from "../common/guards/admin.guard";
import { doctorguard } from "../common/guards/user.doctor.guard";
import { roleguard } from "../common/guards/user.role.guard";

@ApiTags("Lab Tests") // Swagger bo‘lim nomi
@Controller("lab-tests")
export class LabTestsController {
  constructor(private readonly labTestsService: LabTestsService) {}

  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  @Post()
  @ApiOperation({ summary: "Yangi laboratoriya testi yaratish" })
  @ApiResponse({ status: 201, description: "Test muvaffaqiyatli yaratildi" })
  @ApiResponse({ status: 400, description: "Noto‘g‘ri ma’lumot" })
  @ApiBody({ type: CreateLabTestDto })
  create(@Body() createLabTestDto: CreateLabTestDto) {
    return this.labTestsService.create(createLabTestDto);
  }

  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  @Get()
  @ApiOperation({ summary: "Barcha laboratoriya testlarini olish" })
  @ApiResponse({ status: 200, description: "Testlar ro‘yxati" })
  findAll() {
    return this.labTestsService.findAll();
  }
  @UseGuards(activeGuard)
  @UseGuards(roleguard)
  @UseGuards(authGuard)
  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha laboratoriya testini olish" })
  @ApiParam({ name: "id", type: Number, description: "Test ID raqami" })
  @ApiResponse({ status: 200, description: "Test topildi" })
  @ApiResponse({ status: 404, description: "Test topilmadi" })
  findOne(@Param("id") id: string) {
    return this.labTestsService.findOne(+id);
  }
  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Laboratoriya testini yangilash" })
  @ApiParam({ name: "id", type: Number, description: "Test ID raqami" })
  @ApiResponse({ status: 200, description: "Test muvaffaqiyatli yangilandi" })
  @ApiResponse({ status: 404, description: "Test topilmadi" })
  @ApiBody({ type: UpdateLabTestDto })
  update(@Param("id") id: string, @Body() updateLabTestDto: UpdateLabTestDto) {
    return this.labTestsService.update(+id, updateLabTestDto);
  }
  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Laboratoriya testini o‘chirish" })
  @ApiParam({ name: "id", type: Number, description: "Test ID raqami" })
  @ApiResponse({ status: 200, description: "Test muvaffaqiyatli o‘chirildi" })
  @ApiResponse({ status: 404, description: "Test topilmadi" })
  remove(@Param("id") id: string) {
    return this.labTestsService.remove(+id);
  }
}
