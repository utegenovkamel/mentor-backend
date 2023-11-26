import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TagDto } from './dto/tag.dto';
import { hash } from 'argon2';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.tag.findMany();
  }

  async create(dto: TagDto) {
    const oldTag = await this.prisma.tag.findUnique({
      where: {
        name: dto.name,
      },
    });

    if (oldTag) throw new BadRequestException('Пользователь уже существует');

    const tag = await this.prisma.tag.create({
      data: {
        name: dto.name,
      },
    });
    return tag;
  }
}
