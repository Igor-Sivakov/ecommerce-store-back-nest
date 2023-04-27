import { Body, Controller, Get, HttpCode, Put, UsePipes, ValidationPipe } from '@nestjs/common'

import { UserService } from './user.service'

import { Auth } from 'src/decorators/auth.decorator'
import { CurrentUser } from 'src/decorators/user.decorator'

import { UserDto } from './dto/user.dto'
import { CardDto } from './dto/card.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('profile')
  @Auth()
  async getProfile(@CurrentUser('id') id: number) {
    return this.userService.byId(id)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put('profile')
  async updateProfile(@CurrentUser('id') id: number, @Body() dto: UserDto) {
    return this.userService.updateProfile(id, dto)
  }

  @HttpCode(200)
  @Auth()
  @Get('profile/card')
  async getCard(@CurrentUser('id') id: number) {
    return this.userService.getUserCard(id)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put('profile/card')
  async addCard(@CurrentUser('id') id: number, @Body() dto: CardDto) {
    return this.userService.addNewCard(id, dto)
  }
}
