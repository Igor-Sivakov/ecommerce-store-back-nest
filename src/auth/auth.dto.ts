import { IsEmail, IsString, MinLength } from "class-validator"


export class RegisterDto {
  @IsEmail()
  email: string

  @MinLength(6, {
    message: 'Password must be at least 6 characters long'
  })
  @IsString()
  password: string

  @IsString()
  firstName: string

  @IsString()
  lastName: string

  @IsString()
  gender: string
}


export class LoginDto {
  @IsEmail()
  email: string

  @IsString()
  password: string
}


export class RefreshTokenDto {
  @IsString()
  refreshToken: string
}