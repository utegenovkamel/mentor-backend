import { PickType } from '@nestjs/mapped-types';
import { UserDto } from '../../user/dto/user.dto';

export class LoginUserDto extends PickType(UserDto, [
  'username',
  'password',
] as const) {}
