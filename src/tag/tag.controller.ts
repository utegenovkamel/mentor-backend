import { Body, Controller, Get, Post } from '@nestjs/common';
import { TagService } from './tag.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { RegisterUserDto } from '../auth/dto/register.dto';
import { TagDto } from './dto/tag.dto';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  getAll() {
    return this.tagService.getAll();
  }

  @Post()
  create(@Body() dto: TagDto) {
    return this.tagService.create(dto);
  }
}
