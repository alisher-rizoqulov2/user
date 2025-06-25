import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Users } from "./models/users.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Sequelize } from "sequelize-typescript";
import { QueryTypes } from "sequelize";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private readonly usersModel: typeof Users,
    private readonly sequelize: Sequelize
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { first_name, last_name, email, jshshr, dob, address } =
      createUserDto;
    const [existingUsers] = await this.sequelize.query(
      `SELECT * FROM users WHERE email = :email OR jshshr = :jshshr`,
      {
        replacements: { email, jshshr },
        type: QueryTypes.SELECT,
      }
    );
    if (existingUsers) {
      throw new BadRequestException(
        "Bunaqa Email yoki Jshshr royxatdan otilgan"
      );
    }
    if (!/^\d{16}$/.test(jshshr)) {
      throw new BadRequestException(
        "Jshshr aniq 16 ta raqamdan iborat bo'lishi kerak"
      );
    }
    const [result] = await this.sequelize.query(
      `
      INSERT INTO users (first_name, last_name, email, jshshr, dob, address)
      VALUES (:first_name, :last_name, :email, :jshshr, :dob, :address)
      RETURNING *;
    `,
      {
        replacements: { first_name, last_name, email, jshshr, dob, address },
        type: QueryTypes.INSERT,
      }
    );
    return result;
  }

  async findAll() {
    const [results] = await this.sequelize.query(
      `SELECT * FROM users WHERE state = true ORDER BY dob ASC`
    );
    return results;
  }

  async search(search: string) {
    const [results] = await this.sequelize.query(
      `
      SELECT * FROM users
      WHERE state = true AND (
        first_name ILIKE :search OR
        last_name ILIKE :search OR
        email ILIKE :search OR
        jshshr ILIKE :search OR
        address ILIKE :search
      )
      `,
      {
        replacements: { search: `%${search}%` },
      }
    );
    return results;
  }

  async findOne(id: number) {
    const [results] = await this.sequelize.query(
      `SELECT * FROM users WHERE id = :id AND state = true`,
      {
        replacements: { id },
      }
    );
    if (!results || results.length === 0) {
      throw new NotFoundException("Foydalanuvchi topilmadi");
    }
    return results[0];
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { first_name, last_name, email, jshshr, dob, address } =
      updateUserDto;
    const state = true;

    const [result] = await this.sequelize.query(
      `
      UPDATE users
      SET first_name = :first_name,
          last_name = :last_name,
          email = :email,
          jshshr = :jshshr,
          dob = :dob,
          address = :address,
          state=:state
      WHERE id = :id
      RETURNING *;
    `,
      {
        replacements: {
          id,
          first_name,
          last_name,
          email,
          jshshr,
          dob,
          address,
          state,
        },
      }
    );

    if (!result || result.length === 0) {
      throw new BadRequestException(`Foydalanuvchi topilmadi: ID ${id}`);
    }

    return {
      message: `Foydalanuvchi muvaffaqiyatli yangilandi: ID ${id}`,
      user: result[0],
    };
  }

  async remove(id: number) {
    const state = false;

    const [result] = await this.sequelize.query(
      `
      UPDATE Users
      SET
          state=:state
      WHERE id = :id
      RETURNING *;
      `,
      { replacements: { id, state } }
    );

    if (!result || result.length === 0) {
      throw new BadRequestException(`Foydalanuvchi topilmadi: ID ${id}`);
    }
    return { message: `Foydalanuvchi muvaffaqiyatli o‘chirildi: ID ${id}` };
  }
}
