import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('product')
export class ProductOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  sku: string;

  @Column('float')
  currentPrice: number;

  @Column()
  supplierId: string;

  @UpdateDateColumn()
  lastUpdatedAt: Date;
}
