export class TypeormConstantsService {
  static get port(): number {
    return +process.env.DATABASE_PORT
  }

  static get username(): string {
    return process.env.DATABASE_USERNAME
  }

  static get password(): string {
    return process.env.DATABASE_PASSWORD
  }

  static get dbName(): string {
    return process.env.DATABASE_NAME
  }

  static get host(): string {
    return process.env.DATABASE_HOST
  }
}
