import { TagDto } from '../../tag/dto/tag.dto';
import { SocialNetworkDto } from './social-network.dto';
import { EnumGender } from '@prisma/client';
import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';

export class UserDto {
  id: number;
  @IsEmail()
  email: string;
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  phone: string;
  @IsInt()
  age: number;
  @IsString()
  description: string;
  @IsString()
  @IsOptional()
  password: string;
  gender: EnumGender;
  tags: TagDto[];
  socialNetworks: SocialNetworkDto[];
}
