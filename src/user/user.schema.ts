import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import argon2 from 'argon2';
import { Document } from "mongoose";

export const UserCollectionName = 'user';

@Schema({ timestamps: true, versionKey: false, collection: UserCollectionName })
export class UserEntity {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  name: string;

  @Prop()
  avatar: string;

  @Prop({ alias: 'dateOfBirth' })
  date_of_birth: Date
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);

export type UserDocument = UserEntity & Document;

UserSchema.pre<UserDocument>('save', async function (next) {
  try {
    this.email = this.email.toLowerCase();
    this.password = await argon2.hash(this.password);
    next();
  } catch (error) {
    next(error)
  }
})