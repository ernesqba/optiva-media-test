export class AppConstantsService {
  static get sets(): string[] {
    return process.env.SET.split(',')
  }
}
