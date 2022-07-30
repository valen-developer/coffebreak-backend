import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { Response } from 'express';
import { existsSync } from 'fs';

import { ImageFinder } from './application/ImageFinder';
import { NotFoundImageException } from './domain/exceptions/NotFoundImage.exception';

@Controller('image')
@ApiTags('image')
export class ImageController {
  constructor(private imageFinder: ImageFinder) {}

  @Get('entity/:uuid')
  @ApiResponse({ status: 200, description: 'Image found' })
  public async getImageByEntity(
    @Param('uuid') uuid: string,
    @Res() res: Response,
  ): Promise<void> {
    const images = await this.imageFinder.findByEntityUuid(uuid);
    const featuredImagePath = images[0]?.path?.value;
    const exitImage = existsSync(featuredImagePath);

    if (!exitImage) throw new NotFoundImageException('Image not found');

    res.sendFile(featuredImagePath);
  }
}
