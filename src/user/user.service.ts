import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, UserEntity } from '@/user/user.schema';
import { UserCreateDto } from './dto/user.create.dto';
import { AuthRegisterDto } from '@/auth/dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity.name) private readonly userModel: Model<UserDocument>
  ) { }

  async create(dto: AuthRegisterDto): Promise<UserDocument> {
    return this.userModel.create(dto);
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec()
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec()
  }

  async existByEmail(email: string): Promise<Boolean> {
    return this.userModel.exists({ email }).exec().then(value => value != null)
  }

  async findById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id).exec()
  }

  async deleteById(id: string): Promise<UserDocument> {
    return this.userModel.findByIdAndDelete(id).exec()
  }
}
