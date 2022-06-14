import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, UserEntity } from '@/user/schema/user.schema';
import { UserCreateDto } from './dto/user.create.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity.name) private readonly userModel: Model<UserDocument>
  ) { }

  async create(createUserDto: UserCreateDto): Promise<UserDocument> {
    return this.userModel.create(createUserDto);
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec()
  }

  async findById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id).exec()
  }

  async deleteById(id: string): Promise<UserDocument> {
    return this.userModel.findByIdAndDelete(id).exec()
  }
}
