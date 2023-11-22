import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    return user;
  }

  async getAll() {
    return this.prisma.user.findMany({
      include: {
        tags: true,
        socialNetworks: true,
      },
    });
  }

  async update(user: UpdateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!existingUser) {
      throw new NotFoundException('Пользователь не найден');
    }

    const updatedData = {
      username: user.username,
      name: user.name,
      birthDate: user.birthDate,
      password: user.password,
      description: user.description,
      gender: user.gender,
      tags: {
        update: user.tags.map((tag) => ({
          where: { id: tag.id },
          data: tag,
        })),
      },
      socialNetworks: {
        update: user.socialNetworks.map((socialNetwork) => ({
          where: { id: socialNetwork.id },
          data: socialNetwork,
        })),
      },
    };

    return this.prisma.user.update({
      where: { id: user.id },
      data: updatedData,
    });
  }
}
