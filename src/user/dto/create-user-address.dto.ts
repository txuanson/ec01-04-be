import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export enum UserAddressType {
  Home = "Home",
  Work = "Work",
  Other = "Other"
}

export class CreateUserAddressDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @MinLength(5)
  mType: UserAddressType = UserAddressType.Home;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @MinLength(5)
  mPhone: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @MinLength(5)
  mCity: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @MinLength(5)
  mDistrict: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @MinLength(5)
  mWard: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @MinLength(5)
  mAddress: string;
}