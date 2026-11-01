import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../domain/product';
import { ProductOrmEntity } from '../infrastructure/product.orm-entity';

@Injectable()
export class UpdatePriceUseCase {
  constructor(
    // En archi hexa stricte, on injecterait une interface (Port).
    // Pour ce POC, on utilise directement l'adapteur TypeORM.
    @InjectRepository(ProductOrmEntity)
    private readonly productRepo: Repository<ProductOrmEntity>,
  ) {}

  async execute(sku: string, newPrice: number): Promise<ProductOrmEntity> {
    const productData = await this.productRepo.findOne({ where: { sku } });

    if (!productData) {
      throw new NotFoundException(`Produit avec le SKU ${sku} introuvable.`);
    }

    // 1. Reconstitution de l'entité du Domaine
    const product = new Product(
      productData.id,
      productData.sku,
      productData.currentPrice,
      productData.supplierId,
    );

    // 2. Exécution de la règle métier pure
    try {
      product.updatePrice(newPrice);
    } catch (error) {
      // Cast explicite de l'erreur pour TypeScript
      throw new BadRequestException((error as Error).message);
    }

    // 3. Sauvegarde de la modification
    productData.currentPrice = product.currentPrice;
    return this.productRepo.save(productData);
  }
}
