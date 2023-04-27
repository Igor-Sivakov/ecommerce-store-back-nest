import { IsString } from "class-validator"


export class CardDto {
  @IsString()
  cardNumber: string

  @IsString()
  month: string

  @IsString()
  year: string

  @IsString()
  cvv: string
}