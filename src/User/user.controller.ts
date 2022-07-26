import {
  Body,
  Controller,
  Param,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JWTGuard } from 'src/Auth/infrastructure/JWT.guard';
import { FormDataParser } from 'src/Shared/domain/interfaces/FormDataParser.interface';
import { UserUpdater } from './application/UserUpdater';
import { User } from './domain/User.mode';

@Controller('user')
export class UserController {
  constructor(
    private userUpdater: UserUpdater,
    private formDataParser: FormDataParser,
  ) {}

  @Put(':uuid')
  @UseGuards(JWTGuard)
  public async updateUser(
    @Param('uuid') uuid: string,
    @Req() req: Request,
  ): Promise<void> {
    const {
      fields: { name, email },
      files,
    } = await this.formDataParser.parse<{ email: string; name: string }>(req);

    await this.userUpdater.update({
      uuid,
      name,
      email,
      fileData: files[0],
    });
  }
}
