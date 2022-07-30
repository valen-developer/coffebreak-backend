import { Controller, Param, Put, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { Request } from 'express';
import { JWTGuard } from 'src/Auth/infrastructure/JWT.guard';
import { FormDataParser } from 'src/Shared/domain/interfaces/FormDataParser.interface';
import { UserUpdater } from './application/UserUpdater';
import { UpdateUserBodySwagger } from './infrastructure/UpdateUserBodySwagger';

@Controller('user')
@ApiBearerAuth()
@ApiTags('User')
export class UserController {
  constructor(
    private userUpdater: UserUpdater,
    private formDataParser: FormDataParser,
  ) {}

  @Put(':uuid')
  @ApiBody({ type: UpdateUserBodySwagger })
  @ApiResponse({ status: 201 })
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
