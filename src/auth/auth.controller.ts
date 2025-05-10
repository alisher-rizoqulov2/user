import { Controller, Get, Post, Body, Res, Req } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/sign-in.dto";
import { Response } from "express";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { CookieGetter } from "../common/decorators/cookie-getter.decorator";
import { CreateDoctorDto } from "../doctor/dto/create-doctor.dto";
import { CreatePatientDto } from "../patients/dto/create-patient.dto";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // =========================== Patients ===========================
  @Post("sign-upPatient")
  @ApiOperation({ summary: "Bemor ro'yxatdan o'tkazish" })
  @ApiResponse({
    status: 201,
    description: "Bemor muvaffaqiyatli ro'yxatdan o'tdi",
  })
  @ApiResponse({ status: 400, description: "Xato ma'lumotlar" })
  async singUpPatient(@Body() createPatientdto: CreatePatientDto) {
    return this.authService.singUpPatient(createPatientdto);
  }

  @Post("sign-inPatient")
  @ApiOperation({ summary: "Bemor tizimga kirishi" })
  @ApiResponse({ status: 200, description: "Kirish muvaffaqiyatli" })
  @ApiResponse({ status: 401, description: "Login yoki parol noto‘g‘ri" })
  async signIppatient(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signInPatient(signInDto, res);
  }
  @Get("sign-outpatient")
  @ApiOperation({ summary: "Shifokorni tizimdan chiqarish" })
  @ApiResponse({ status: 200, description: "Shifokor tizimdan chiqdi" })
  signOutPatient(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.signOutPatient(refreshToken, response);
  }
  @Post("refresh-tokenpatient")
  @ApiOperation({ summary: "Bemor uchun refresh token yangilash" })
  @ApiResponse({ status: 200, description: "Token yangilandi" })
  @ApiResponse({
    status: 403,
    description: "Refresh token mavjud emas yoki noto‘g‘ri",
  })
  async refreshTokenPatient(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenDoctor(refreshToken, res);
  }

  // =========================== Doctors ===========================
  @Post("sign-upDoctor")
  @ApiOperation({ summary: "Shifokorni ro'yxatdan o'tkazish" })
  @ApiResponse({
    status: 201,
    description: "Shifokor muvaffaqiyatli ro'yxatdan o'tdi",
  })
  @ApiResponse({ status: 400, description: "Xato ma'lumotlar" })
  async singUpDoctor(@Body() createDoctorDto: CreateDoctorDto) {
    return this.authService.singUpDoctor(createDoctorDto);
  }

  @Post("sign-inDoctor")
  @ApiOperation({ summary: "Shifokor tizimga kirishi" })
  @ApiResponse({ status: 200, description: "Kirish muvaffaqiyatli" })
  @ApiResponse({ status: 401, description: "Login yoki parol noto‘g‘ri" })
  async signIpDoctor(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signInDoctor(signInDto, res);
  }

  @Get("sign-outdoctor")
  @ApiOperation({ summary: "Shifokorni tizimdan chiqarish" })
  @ApiResponse({ status: 200, description: "Shifokor tizimdan chiqdi" })
  signoutDoctor(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.signoutDoctor(refreshToken, response);
  }

  @Post("refresh-tokendoctor")
  @ApiOperation({ summary: "Shifokor uchun refresh token yangilash" })
  @ApiResponse({ status: 200, description: "Token yangilandi" })
  @ApiResponse({
    status: 403,
    description: "Refresh token mavjud emas yoki noto‘g‘ri",
  })
  async refreshTokenDoctor(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenDoctor(refreshToken, res);
  }

  // =========================== Admin ===========================
  @Post("sign-upAdmin")
  @ApiOperation({ summary: "Adminni ro'yxatdan o'tkazish" })
  @ApiResponse({
    status: 201,
    description: "Admin muvaffaqiyatli ro'yxatdan o'tdi",
  })
  @ApiResponse({ status: 400, description: "Xato ma'lumotlar" })
  async signUpAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.singUpAdmin(createAdminDto);
  }

  @Post("sign-inadmin")
  @ApiOperation({ summary: "Admin tizimga kirishi" })
  @ApiResponse({ status: 200, description: "Kirish muvaffaqiyatli" })
  @ApiResponse({ status: 401, description: "Login yoki parol noto‘g‘ri" })
  async signIpAdmin(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signInAdmin(signInDto, res);
  }

  @Get("sign-outadmin")
  @ApiOperation({ summary: "Adminni tizimdan chiqarish" })
  @ApiResponse({ status: 200, description: "Admin tizimdan chiqdi" })
  signoutAdmin(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.signoutAdmin(refreshToken, response);
  }

  @Post("refresh-tokenadmin")
  @ApiOperation({ summary: "Admin uchun refresh token yangilash" })
  @ApiResponse({ status: 200, description: "Token yangilandi" })
  @ApiResponse({
    status: 403,
    description: "Refresh token mavjud emas yoki noto‘g‘ri",
  })
  async refreshTokenAdmin(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenAdmin(refreshToken, res);
  }
}
