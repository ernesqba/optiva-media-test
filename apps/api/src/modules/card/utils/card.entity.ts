import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class CardEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  language: string

  @Column({ name: 'release_date' })
  releaseDate: Date

  @Column({ type: 'jsonb', nullable: true })
  images: any

  @Column()
  set: string

  @Column({ type: 'jsonb' })
  legalities: any

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date
}
