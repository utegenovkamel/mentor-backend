import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getById(id: number) {
    console.log('id', id);
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

  async update(user: UserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!existingUser) {
      throw new NotFoundException('Пользователь не найден');
    }

    const updatedData = {
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      age: user.age,
      description: user.description,
      gender: { set: user.gender },
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
