import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { Admin } from "../admin/models/admin.model";
import { Patient } from "../patients/models/patient.model";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendMailPatient(patient: Patient) {
    const url = `${process.env.API_HOST}/api/patients/activate/${patient.dataValues.activation_link}`;

    await this.mailerService.sendMail({
      to: patient.dataValues.email,
      subject: "Welcome to Skidkachi App ! ",
      template: "confirmation",
      context: {
        name: patient.first_name,
        url,
      },
    });
  }
}
