import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import path from 'path';
import * as crypto from 'crypto';

@Injectable()
export class CryptService {
  privateKey: string;
  publicKey: string;
  algorithm: string = 'RSA-SHA256';

  constructor(
    private readonly configService: ConfigService,
  ) {
    // this.publicKey = readFileSync(path.resolve('', this.configService.getOrThrow('CRYPT_PUBLIC_KEY')), 'ascii');
    // this.privateKey = readFileSync(path.resolve('', this.configService.getOrThrow('CRYPT_PRIVATE_KEY')), 'ascii');
    
    this.publicKey = this.configService.getOrThrow('HEROKU_PUBLIC_KEY');
    this.privateKey = this.configService.getOrThrow('HEROKU_PRIVATE_KEY');
  }

  sign(data: Record<string, any>): string {
    return crypto.sign(this.algorithm, Buffer.from(JSON.stringify(data)), this.privateKey).toString('base64');
  }

  verify(data: Record<string, any>, signature: string): boolean {
    return crypto.verify(this.algorithm, Buffer.from(JSON.stringify(data)), this.publicKey, Buffer.from(signature, 'base64'));
  }

}
