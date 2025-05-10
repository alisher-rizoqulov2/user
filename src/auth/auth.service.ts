import {
  BadRequestException,
  ConflictException,
  Injectable,
  Req,
  ServiceUnavailableException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SignInDto } from "./dto/sign-in.dto";
import * as bcrypt from "bcrypt";
import { Response, Request } from "express";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { Admin } from "../admin/models/admin.model";
import * as cookieParser from "cookie-parser";
import { AdminService } from "../admin/admin.service";
import { MailService } from "../mail/mail.service";
import { CreateDoctorDto } from "../doctor/dto/create-doctor.dto";
import { Doctor } from "../doctor/model/doctor.model";
import { DoctorService } from "../doctor/doctor.service";
import { Patient } from "../patients/models/patient.model";
import { CreatePatientDto } from "../patients/dto/create-patient.dto";
import { PatientsService } from "../patients/patients.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtServise: JwtService,
    private readonly adminService: AdminService,
    private readonly DoctorService: DoctorService,
    private readonly patientService: PatientsService,
    private readonly mailService: MailService
  ) {}

  async generateAdminTokens(admin: Admin) {
    console.log();
    
    const payload = {
      id: admin.id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
      email: admin.email,
      role: admin.dataValues.role,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtServise.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtServise.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
  async generateDoctorTokens(doctor: Doctor) {
    const payload = {
      id: doctor.id,
      is_active: doctor.is_active,
      email: doctor.email,
      role:"doctor"
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtServise.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtServise.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
  async generatePatienTokens(patient: Patient) {
    console.log(patient);
    
    const payload = {
      id: patient.id,
      is_active: patient.dataValues.is_active,
      email: patient.dataValues.email,
      role:"patient"
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtServise.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtServise.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  //===================================PATIENT====================================
  async singUpPatient(createPatientDto: CreatePatientDto) {
    const candidate = await this.DoctorService.findAdminByEmail(
      createPatientDto.email
    );
    if (candidate) {
      throw new ConflictException("Bunday admin mavjud");
    }
    const hashPassword = await bcrypt.hash(createPatientDto.hashed_password, 7);
    const newAdmin = await this.patientService.create({
      ...createPatientDto,
      hashed_password: hashPassword,
    });
    return newAdmin;
  }
  async signInPatient(signInDto: SignInDto, res: Response) {
    const doctor = await this.patientService.findAdminByEmail(signInDto.email);
    if (!doctor) {
      throw new BadRequestException({
        message: "Email yoki Password noto'g'ri",
      });
    }
    if (!doctor.dataValues.is_active) {
      throw new BadRequestException("Activ emassiz");
    }
    const isValidPassword = await bcrypt.compare(
      signInDto.hashed_password,
      doctor.dataValues.hashed_password
    );
    if (!isValidPassword) {
      throw new BadRequestException({
        message: "Email yoki Password noto'g'ri",
      });
    }
    const { accessToken, refreshToken } =
      await this.generatePatienTokens(doctor);
    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOCIE_TIME),
      httpOnly: true,
    });
    doctor.refresh_token = await bcrypt.hash(refreshToken, 7);
    await doctor.save();
    return {
      message: "Tizimga xush kelibsiz",
      accessToken,
    };
  }
  async signOutPatient(refreshToken: string, res: Response) {
    const admin =await this.jwtServise.verifyAsync(refreshToken, {   
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!admin) {
      throw new BadRequestException("Token topilmadi");
    }
    const adminData = await this.patientService.findOne(admin.id);
    if (!adminData) {
      throw new BadRequestException("Bunday Tokenli shaxs topilmadi");
    }
     adminData.refresh_token = "";

    adminData.save();
    res.clearCookie("refresh_token");

    return {
      success: true,
      message: "Signed out successfully",
    };
  }
  async refreshTokenPatient(refresh_token: string, res: Response) {
    try {
      const admin = await this.jwtServise.verifyAsync(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
      const admindata = await this.patientService.findOne(admin.id);

      if (!admindata) {
        throw new BadRequestException("Bunday tokenli foydalanuvchi topilmadi");
      }
      const tokens = await this.generatePatienTokens(admindata);

      admindata.refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
      await admindata.save();

      res.cookie("refresh_token", tokens.refreshToken, {
        httpOnly: true,
        maxAge: Number(process.env.COOCIE_TIME),
      });

      return res.send({
        message: "Tokenlar yangilandi",
        accessToken: tokens.accessToken,
      });
    } catch (error) {
      throw new UnauthorizedException("Tokenni yangilashda xatolik yuz berdi");
    }
  }
  //===================================DOCTOR====================================
  async singUpDoctor(createDoctorDto: CreateDoctorDto) {
    const candidate = await this.DoctorService.findAdminByEmail(
      createDoctorDto.email
    );
    if (candidate) {
      throw new ConflictException("Bunday admin mavjud");
    }
    const hashPassword = await bcrypt.hash(createDoctorDto.hashed_password, 7);
    const newAdmin = await this.DoctorService.create({
      ...createDoctorDto,
      hashed_password: hashPassword,
    });
    return newAdmin;
  }

  async signInDoctor(signInDto: SignInDto, res: Response) {
    const doctor = await this.DoctorService.findAdminByEmail(signInDto.email);
    if (!doctor) {
      throw new BadRequestException({
        message: "Email yoki Password noto'g'ri",
      });
    }
    if (!doctor.is_active) {
      throw new BadRequestException("Activ emassiz");
    }
    const isValidPassword = await bcrypt.compare(
      signInDto.hashed_password,
      doctor.hashed_password
    );
    if (!isValidPassword) {
      throw new BadRequestException({
        message: "Email yoki Password noto'g'ri",
      });
    }
    const { accessToken, refreshToken } =
      await this.generateDoctorTokens(doctor);
    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOCIE_TIME),
      httpOnly: true,
    });
    doctor.refresh_token = await bcrypt.hash(refreshToken, 7);
    await doctor.save();
    return {
      message: "Tizimga xush kelibsiz",
      accessToken,
    };
  }
  async signoutDoctor(refreshToken: string, res: Response) {
    const admin = await this.jwtServise.verifyAsync(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!admin) {
      throw new BadRequestException("Token topilmadi");
    }
    const adminData = await this.DoctorService.findOne(admin.id);
    if (!adminData) {
      throw new BadRequestException("Bunday Tokenli shaxs topilmadi");
    }

    adminData.refresh_token = "";
    await adminData.save();

    res.clearCookie("refresh_token");

    return {
      success: true,
      message: "Signed out successfully",
    };
  }
  async refreshTokenDoctor(refresh_token: string, res: Response) {
    try {
      const admin = await this.jwtServise.verifyAsync(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
      const admindata = await this.DoctorService.findOne(admin.id);

      if (!admindata) {
        throw new BadRequestException("Bunday tokenli foydalanuvchi topilmadi");
      }
      const tokens = await this.generateDoctorTokens(admindata);

      admindata.refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
      await admindata.save();

      res.cookie("refresh_token", tokens.refreshToken, {
        httpOnly: true,
        maxAge: Number(process.env.COOCIE_TIME),
      });

      return res.send({
        message: "Tokenlar yangilandi",
        accessToken: tokens.accessToken,
      });
    } catch (error) {
      throw new UnauthorizedException("Tokenni yangilashda xatolik yuz berdi");
    }
  }

  //===================================ADMIN====================================
  async singUpAdmin(createUserDto: CreateAdminDto) {
    const candidate = await this.adminService.findAdminByEmail(
      createUserDto.email
    );
    if (candidate) {
      throw new ConflictException("Bunday admin mavjud");
    }
    const hashPassword = await bcrypt.hash(createUserDto.hashed_password, 7);
    const newAdmin = await this.adminService.create({
      ...createUserDto,
      hashed_password: hashPassword,
    });
    
    return newAdmin;
  }
  async signInAdmin(signInDto: SignInDto, res: Response) {
    const admin = await this.adminService.findAdminByEmail(signInDto.email);
    if (!admin) {
      throw new BadRequestException({
        message: "Email yoki Password noto'g'ri",
      });
    }
    // if (!admin.is_active) {
    //   throw new BadRequestException("Activ emassiz");
    // }
    const isValidPassword = await bcrypt.compare(
      signInDto.hashed_password,
      admin.hashed_password
    );
    if (!isValidPassword) {
      throw new BadRequestException({
        message: "Email yoki Password noto'g'ri",
      });
    }
    const { accessToken, refreshToken } = await this.generateAdminTokens(admin);
    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOCIE_TIME),
      httpOnly: true,
    });
    admin.refresh_token = await bcrypt.hash(refreshToken, 7);
    await admin.save();
    return {
      message: "Tizimga xush kelibsiz",
      accessToken,
    };
  }
  async signoutAdmin(refreshToken: string, res: Response) {
    const admin = await this.jwtServise.verifyAsync(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!admin) {
      throw new BadRequestException("Token topilmadi");
    }
    const adminData = await this.adminService.findOne(admin.id);
    if (!adminData) {
      throw new BadRequestException("Bunday Tokenli shaxs topilmadi");
    }

    adminData.refresh_token = "";
    await adminData.save();

    res.clearCookie("refresh_token");

    return {
      success: true,
      message: "Signed out successfully",
    };
  }
  async refreshTokenAdmin(refresh_token: string, res: Response) {
    try {
      const admin = await this.jwtServise.verifyAsync(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
      const admindata = await this.adminService.findOne(admin.id);

      if (!admindata) {
        throw new BadRequestException("Bunday tokenli foydalanuvchi topilmadi");
      }
      const tokens = await this.generateAdminTokens(admindata);

      admindata.refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
      await admindata.save();

      res.cookie("refresh_token", tokens.refreshToken, {
        httpOnly: true,
        maxAge: Number(process.env.COOCIE_TIME),
      });

      return res.send({
        message: "Tokenlar yangilandi",
        accessToken: tokens.accessToken,
      });
    } catch (error) {
      throw new UnauthorizedException("Tokenni yangilashda xatolik yuz berdi");
    }
  }
}
