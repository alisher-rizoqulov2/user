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
import { DepartmentsService } from "./departments.service";
import { CreateDepartmentDto } from "./dto/create-department.dto";
import { UpdateDepartmentDto } from "./dto/update-department.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { activeGuard } from "../common/guards/user.active.guard";
import { adminguard } from "../common/guards/user.selfadmin.guard";
import { authGuard } from "../common/guards/admin.guard";

@ApiTags("Departments")
@Controller("departments")
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}
  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  @Post()
  @ApiOperation({ summary: "Create a new department" })
  @ApiResponse({ status: 201, description: "Department created successfully." })
  @ApiBody({ type: CreateDepartmentDto })
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  @Get()
  @ApiOperation({ summary: "Get all departments" })
  @ApiResponse({ status: 200, description: "List of departments." })
  findAll() {
    return this.departmentsService.findAll();
  }

  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  @Get(":id")
  @ApiOperation({ summary: "Get a department by ID" })
  @ApiParam({ name: "id", type: Number, description: "Department ID" })
  @ApiResponse({ status: 200, description: "Department found." })
  @ApiResponse({ status: 404, description: "Department not found." })
  findOne(@Param("id") id: string) {
    return this.departmentsService.findOne(+id);
  }

  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Update a department" })
  @ApiParam({ name: "id", type: Number, description: "Department ID" })
  @ApiResponse({ status: 200, description: "Department updated successfully." })
  @ApiBody({ type: UpdateDepartmentDto })
  update(
    @Param("id") id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto
  ) {
    return this.departmentsService.update(+id, updateDepartmentDto);
  }

  @UseGuards(activeGuard)
  @UseGuards(adminguard)
  @UseGuards(authGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Delete a department" })
  @ApiParam({ name: "id", type: Number, description: "Department ID" })
  @ApiResponse({ status: 200, description: "Department deleted successfully." })
  remove(@Param("id") id: string) {
    return this.departmentsService.remove(+id);
  }
}
