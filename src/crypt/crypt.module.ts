import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CryptService } from './crypt.service';

@Module({
  exports: [CryptService],
  imports: [ConfigModule],
  providers: [CryptService]
})
export class CryptModule { }
