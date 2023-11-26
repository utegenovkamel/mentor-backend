import { IsString } from 'class-validator';

export class TagDto {
  id: number;
  @IsString()
  name: string;
}
