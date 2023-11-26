import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TagModule } from './tag/tag.module';
import { CountryModule } from './country/country.module';
import { DictionaryModule } from './dictionary/dictionary.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    TagModule,
    CountryModule,
    DictionaryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
