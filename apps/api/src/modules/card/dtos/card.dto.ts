interface Legality {
  [key: string]: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Image extends Legality {}

export class CardDto {
  name: string
  language: string
  releaseDate: Date
  images: Image[]
  set: string
  legalities: Legality[]
}
