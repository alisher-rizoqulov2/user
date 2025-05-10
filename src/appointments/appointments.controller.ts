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
import { AppointmentsService } from "./appointments.service";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from "@nestjs/swagger";
import { activeGuard } from "../common/guards/user.active.guard";
import { adminguard } from "../common/guards/user.selfadmin.guard";
import { authGuard } from "../common/guards/admin.guard";

@ApiTags("Appointments")
@Controller("appointments")
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}
  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  @Post()
  @ApiOperation({ summary: "Create new appointment" })
  @ApiResponse({
    status: 201,
    description: "Appointment created successfully.",
  })
  @ApiBody({ type: CreateAppointmentDto })
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }
  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  @Get()
  @ApiOperation({ summary: "Get all appointments" })
  @ApiResponse({ status: 200, description: "List of all appointments." })
  findAll() {
    return this.appointmentsService.findAll();
  }
  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  @Get(":id")
  @ApiOperation({ summary: "Get one appointment by ID" })
  @ApiParam({ name: "id", type: Number, description: "Appointment ID" })
  @ApiResponse({ status: 200, description: "Appointment found." })
  @ApiResponse({ status: 404, description: "Appointment not found." })
  findOne(@Param("id") id: string) {
    return this.appointmentsService.findOne(+id);
  }
  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Update an appointment" })
  @ApiParam({ name: "id", type: Number, description: "Appointment ID" })
  @ApiResponse({
    status: 200,
    description: "Appointment updated successfully.",
  })
  @ApiBody({ type: UpdateAppointmentDto })
  update(
    @Param("id") id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto
  ) {
    return this.appointmentsService.update(+id, updateAppointmentDto);
  }

  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Delete an appointment" })
  @ApiParam({ name: "id", type: Number, description: "Appointment ID" })
  @ApiResponse({
    status: 200,
    description: "Appointment deleted successfully.",
  })
  remove(@Param("id") id: string) {
    return this.appointmentsService.remove(+id);
  }
}
