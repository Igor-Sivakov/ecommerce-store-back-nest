import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { hash } from 'argon2'

import { UserDto } from './dto/user.dto'
import { CardDto } from './dto/card.dto'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async byId(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    })

    if (!user) throw new Error('User not found')

    return user
  }

  async updateProfile(id: number, dto: UserDto) {
    const isSameUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    })

    if (isSameUser && id !== isSameUser.id) throw new BadRequestException('Email already in use')

    const user = await this.byId(id)

    const updatedUser = this.prisma.user.update({
      where: {
        id
      },
      data: {
        email: dto.email,
        password: dto.password ? await hash(dto.password) : user.password,
        firstName: dto.firstName,
        lastName: dto.lastName,
        gender: dto.gender
      }
    })

    return updatedUser
  }

  async getUserCard(id: number) {
    const card = this.prisma.card.findMany({
      where: {
        userId: id
      }
    })

    if (!card) throw new Error('Card not found')

    return card
  }

  async addNewCard(id: number, dto: CardDto) {
    const user = await this.byId(id)
    const card = await this.getUserCard(id)

    if (!user) return

    const data = {
      cardNumber: dto.cardNumber,
      month: dto.month,
      year: dto.year,
      cvv: dto.cvv,
      userId: id
    }

    if (card.length) {
      const updatedCard = this.prisma.card.update({
        where: {
          id: card[0].id
        },
        data
      })

      return updatedCard
    } else {
      const newCard = this.prisma.card.create({
        data
      })

      return newCard
    }
  }
}