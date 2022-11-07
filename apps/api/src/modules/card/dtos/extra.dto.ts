import { Type } from 'class-transformer'
import { IsNotEmpty, IsPositive, IsString } from 'class-validator'

export class CardFilterDto {
  id?: number
  set?: string
  name?: string
  legality?: string
}

export class NameParamDto {
  @IsString()
  @IsNotEmpty()
  name: string
}

export class ModeParamDto {
  @IsString()
  @IsNotEmpty()
  mode: string
}

export class IdParamDto {
  @IsPositive()
  @Type(() => Number)
  id: number
}
