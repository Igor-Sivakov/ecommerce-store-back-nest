import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

export type SortType = 'newest' | 'oldest' | 'ascending' | 'descending'

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) { }

  async findAll(category?: string, sortType?: SortType, perPage?: number, currentPage?: number) {
    const isByPrice = sortType === 'descending' || sortType === 'ascending'
    const isAsc = sortType === 'oldest' || sortType === 'ascending'

    const count = Number(perPage) || 100

    const totalCount = await this.prisma.product.count({
      where: {
        category
      },
      orderBy: {
        [isByPrice ? 'price' : 'createdAt']: isAsc ? 'asc' : 'desc'
      },
    })

    const product = await this.prisma.product.findMany({
      take: count,
      skip: (count * (currentPage || 1)) - count,
      where: {
        category
      },
      orderBy: {
        [isByPrice ? 'price' : 'createdAt']: isAsc ? 'asc' : 'desc'
      },
    })

    if (!product) throw new NotFoundException('Product not found!')
    return {
      items: product,
      totalCount: totalCount
    }
  }


  async findBySearchTerm(searchTerm?: string) {
    const product = await this.prisma.product.findMany(searchTerm ? {
      where: {
        OR: [
          {
            name: {
              contains: searchTerm,
            }
          },
          {
            description: {
              contains: searchTerm,
            }
          },
          {
            category: {
              contains: searchTerm,
            }
          },
        ]
      }
    } : undefined)

    if (!product) throw new NotFoundException('Product not found!')
    return product
  }

  async findAllByDate() {
    const product = await this.prisma.product.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    if (!product) throw new NotFoundException('Product not found!')
    return product
  }

  async findById(id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id
      }
    })

    if (!product) throw new NotFoundException('Product not found!')
    return product
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        slug
      }
    })

    if (!product) throw new NotFoundException('Product not found!')
    return product
  }

  async findByCategory(category: string) {
    const product = await this.prisma.product.findMany({
      where: {
        category
      }
    })

    if (!product) throw new NotFoundException('Product not found!')
    return product
  }
}
