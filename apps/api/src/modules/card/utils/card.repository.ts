import { Injectable } from '@nestjs/common'
import { DeleteQueryBuilder, getConnection, InsertQueryBuilder, SelectQueryBuilder } from 'typeorm'

import { CardDto } from '../dtos/card.dto'
import { CardFilterDto } from '../dtos/extra.dto'
import { CardEntity } from './card.entity'

@Injectable()
export class CardRepository {
  getQueryBuilder(): SelectQueryBuilder<CardEntity> {
    return getConnection().createQueryBuilder<CardEntity>(CardEntity, 'card')
  }

  createCards(cards: CardDto[]): InsertQueryBuilder<CardEntity> {
    return this.getQueryBuilder()
      .insert()
      .values(cards)
      .returning(['id', 'name', 'language', 'release_date as "releaseDate"', 'images', 'set', 'legalities'])
  }

  getCards(filters: CardFilterDto): SelectQueryBuilder<CardEntity> {
    const qb = this.getQueryBuilder().select([
      'id',
      'name',
      'language',
      'release_date as "releaseDate"',
      'images',
      'set',
      'legalities',
    ])
    if (filters.id) qb.andWhere('id = :id').setParameter('id', filters.id)
    if (filters.legality) qb.andWhere("legalities->>:legality = 'legal'").setParameter('legality', filters.legality)
    if (filters.name) qb.andWhere('name = :name').setParameter('name', filters.name)
    if (filters.set) qb.andWhere('set = :set').setParameter('set', filters.set)

    return qb
  }

  deleteCards(): DeleteQueryBuilder<CardEntity> {
    return this.getQueryBuilder().delete()
  }
}
