import { IsDate, IsOptional, IsString, MinLength } from 'class-validator';
import { EnumGender } from '@prisma/client';
import { TagDto } from '../../tag/dto/tag.dto';
import { SocialNetworkDto } from './social-network.dto';

export class UserDto {
  id: number;
  @IsString()
  username: string;
  @IsString()
  name: string;
  @IsString()
  @MinLength(6, {
    message: 'Длина пароля должна составлять не менее 6 символов',
  })
  password: string;
  @IsDate()
  @IsOptional()
  birthDate: Date;
  @IsString()
  @IsOptional()
  description: string;
  @IsOptional()
  gender: EnumGender;
  @IsOptional()
  tags: TagDto[];
  @IsOptional()
  socialNetworks: SocialNetworkDto[];
}
