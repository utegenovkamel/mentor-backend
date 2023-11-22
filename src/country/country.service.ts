import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CountryService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.country.findMany();
  }

  async create() {
    try {
      const response = await axios.get(
        'https://namaztimes.kz/ru/api/country?type=json',
      );
      const data = response.data;
      const result = [];

      for (const dataKey in data) {
        result.push({ id: +dataKey, name: data[dataKey] });
      }

      await this.prisma.country.createMany({
        data: result,
        skipDuplicates: true,
      });
    } catch (error) {
      console.error('Error fetching countries', error);
    }

    return 'This action adds a new country';
  }

  // async createCities() {
  //   await this.prisma.ci;
  // }
}
