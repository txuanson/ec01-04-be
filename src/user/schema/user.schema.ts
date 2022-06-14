import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import argon2 from 'argon2';
import { Document } from "mongoose";

@Schema({ versionKey: false })
class UserProfileEntity {
  @Prop()
  name: string;

  @Prop()
  avatar: string;

  @Prop({ alias: 'dateOfBirth' })
  date_of_birth: Date
}

@Schema({ timestamps: true, versionKey: false })
export class UserEntity {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;


}

export const UserDatabaseName = 'users';
export const UserSchema = SchemaFactory.createForClass(UserEntity);

export type UserDocument = UserEntity & Document;

UserSchema.pre<UserDocument>('save', async function (next) {
  try {
    this.email = this.email.toLowerCase();
    this.username = this.username.toLowerCase();
    this.password = await argon2.hash(this.password);
    next();
  } catch (error) {
    next(error)
  }
})