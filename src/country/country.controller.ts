import { Controller, Get, Post } from '@nestjs/common';
import { CountryService } from './country.service';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  create() {
    return this.countryService.create();
  }

  @Get()
  getAll() {
    return this.countryService.getAll();
  }
}
