import {
  Controller,
  Get,
  Param,
  Query
} from '@nestjs/common'
import { ProductService, SortType } from './product.service'


@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get()
  findAllWithSort(@Query('category') category?: string, @Query('sortType') sortType?: SortType, @Query('perPage') perPage?: number, @Query('currentPage') currentPage?: number) {
    return this.productService.findAll(category, sortType, perPage, currentPage)
  }

  @Get('/search')
  findBySearchTerm(@Query('searchTerm') searchTerm?: string) {
    return this.productService.findBySearchTerm(searchTerm)
  }

  @Get('/date')
  findAllByDate() {
    return this.productService.findAllByDate()
  }

  @Get('/slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.productService.findBySlug(slug)
  }

  @Get('/category/:category')
  findByCategory(@Param('category') category: string) {
    return this.productService.findByCategory(category)
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.productService.findById(+id)
  }
}
