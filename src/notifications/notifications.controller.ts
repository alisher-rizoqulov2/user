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
import { NotificationsService } from "./notifications.service";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
import { activeGuard } from "../common/guards/user.active.guard";
import { adminguard } from "../common/guards/user.selfadmin.guard";
import { authGuard } from "../common/guards/admin.guard";

@ApiTags("Notifications") // Swagger bo‘lim nomi
@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  @Post()
  @ApiOperation({ summary: "Yangi bildirishnoma yaratish" })
  @ApiResponse({
    status: 201,
    description: "Bildirishnoma muvaffaqiyatli yaratildi",
  })
  @ApiResponse({ status: 400, description: "Noto‘g‘ri ma’lumotlar" })
  @ApiBody({ type: CreateNotificationDto })
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  @Get()
  @ApiOperation({ summary: "Barcha bildirishnomalarni olish" })
  @ApiResponse({
    status: 200,
    description: "Bildirishnomalar ro‘yxati qaytarildi",
  })
  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  findAll() {
    return this.notificationsService.findAll();
  }

  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha bildirishnomani olish" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Bildirishnoma ID raqami",
  })
  @ApiResponse({
    status: 200,
    description: "Topilgan bildirishnoma qaytarildi",
  })
  @ApiResponse({ status: 404, description: "Bildirishnoma topilmadi" })
  findOne(@Param("id") id: string) {
    return this.notificationsService.findOne(+id);
  }

  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Bildirishnomani yangilash" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Bildirishnoma ID raqami",
  })
  @ApiResponse({
    status: 200,
    description: "Bildirishnoma muvaffaqiyatli yangilandi",
  })
  @ApiResponse({ status: 404, description: "Bildirishnoma topilmadi" })
  @ApiBody({ type: UpdateNotificationDto })
  update(
    @Param("id") id: string,
    @Body() updateNotificationDto: UpdateNotificationDto
  ) {
    return this.notificationsService.update(+id, updateNotificationDto);
  }

  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Bildirishnomani o‘chirish" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Bildirishnoma ID raqami",
  })
  @ApiResponse({
    status: 200,
    description: "Bildirishnoma muvaffaqiyatli o‘chirildi",
  })
  @ApiResponse({ status: 404, description: "Bildirishnoma topilmadi" })
  remove(@Param("id") id: string) {
    return this.notificationsService.remove(+id);
  }
}
