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
import { PrescriptionsService } from "./prescriptions.service";
import { CreatePrescriptionDto } from "./dto/create-prescription.dto";
import { UpdatePrescriptionDto } from "./dto/update-prescription.dto";
import { activeGuard } from "../common/guards/user.active.guard";
import { adminguard } from "../common/guards/user.selfadmin.guard";
import { authGuard } from "../common/guards/admin.guard";

@ApiTags("Prescriptions") // Swagger bo‘lim nomi
@Controller("prescriptions")
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  @Post()
  @ApiOperation({ summary: "Yangi retsept qo‘shish" })
  @ApiResponse({
    status: 201,
    description: "Retsept muvaffaqiyatli qo‘shildi",
  })
  @ApiResponse({ status: 400, description: "Noto‘g‘ri ma’lumotlar" })
  @ApiBody({ type: CreatePrescriptionDto })
  create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionsService.create(createPrescriptionDto);
  }

  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  @Get()
  @ApiOperation({ summary: "Barcha retseptlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Retseptlar ro‘yxati qaytarildi",
  })
  findAll() {
    return this.prescriptionsService.findAll();
  }

  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha retseptni olish" })
  @ApiParam({ name: "id", type: Number, description: "Retsept ID raqami" })
  @ApiResponse({ status: 200, description: "Topilgan retsept qaytarildi" })
  @ApiResponse({ status: 404, description: "Retsept topilmadi" })
  findOne(@Param("id") id: string) {
    return this.prescriptionsService.findOne(+id);
  }

  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Retsept ma’lumotlarini yangilash" })
  @ApiParam({ name: "id", type: Number, description: "Retsept ID raqami" })
  @ApiResponse({
    status: 200,
    description: "Retsept muvaffaqiyatli yangilandi",
  })
  @ApiResponse({ status: 404, description: "Retsept topilmadi" })
  @ApiBody({ type: UpdatePrescriptionDto })
  update(
    @Param("id") id: string,
    @Body() updatePrescriptionDto: UpdatePrescriptionDto
  ) {
    return this.prescriptionsService.update(+id, updatePrescriptionDto);
  }

  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Retseptni o‘chirish" })
  @ApiParam({ name: "id", type: Number, description: "Retsept ID raqami" })
  @ApiResponse({
    status: 200,
    description: "Retsept muvaffaqiyatli o‘chirildi",
  })
  @ApiResponse({ status: 404, description: "Retsept topilmadi" })
  remove(@Param("id") id: string) {
    return this.prescriptionsService.remove(+id);
  }
}
