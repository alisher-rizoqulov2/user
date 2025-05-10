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
import { PaymentsService } from "./payments.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { activeGuard } from "../common/guards/user.active.guard";
import { adminguard } from "../common/guards/user.selfadmin.guard";
import { authGuard } from "../common/guards/admin.guard";

@ApiTags("Payments") // Swagger bo‘lim nomi
@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi to‘lov qo‘shish" })
  @ApiResponse({
    status: 201,
    description: "To‘lov muvaffaqiyatli qo‘shildi",
  })
  @ApiResponse({ status: 400, description: "Noto‘g‘ri ma’lumotlar" })
  @ApiBody({ type: CreatePaymentDto })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  @Get()
  @ApiOperation({ summary: "Barcha to‘lovlarni olish" })
  @ApiResponse({
    status: 200,
    description: "To‘lovlar ro‘yxati qaytarildi",
  })
  findAll() {
    return this.paymentsService.findAll();
  }

  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha to‘lovni olish" })
  @ApiParam({ name: "id", type: Number, description: "To‘lov ID raqami" })
  @ApiResponse({ status: 200, description: "Topilgan to‘lov qaytarildi" })
  @ApiResponse({ status: 404, description: "To‘lov topilmadi" })
  findOne(@Param("id") id: string) {
    return this.paymentsService.findOne(+id);
  }

  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  @Patch(":id")
  @ApiOperation({ summary: "To‘lov ma’lumotlarini yangilash" })
  @ApiParam({ name: "id", type: Number, description: "To‘lov ID raqami" })
  @ApiResponse({
    status: 200,
    description: "To‘lov muvaffaqiyatli yangilandi",
  })
  @ApiResponse({ status: 404, description: "To‘lov topilmadi" })
  @ApiBody({ type: UpdatePaymentDto })
  update(@Param("id") id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  @Delete(":id")
  @ApiOperation({ summary: "To‘lovni o‘chirish" })
  @ApiParam({ name: "id", type: Number, description: "To‘lov ID raqami" })
  @ApiResponse({
    status: 200,
    description: "To‘lov muvaffaqiyatli o‘chirildi",
  })
  @ApiResponse({ status: 404, description: "To‘lov topilmadi" })
  remove(@Param("id") id: string) {
    return this.paymentsService.remove(+id);
  }
}
