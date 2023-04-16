import { IsNotEmpty, IsEmail, IsInt, IsPositive } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly firstName: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsInt()
  @IsPositive()
  readonly age: number;

  @IsEmail()
  readonly email: string;

  @IsInt()
  @IsPositive()
  readonly weight: number;

  @IsInt()
  @IsPositive()
  readonly height: number;
}
