import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealthy(): { message: string } {
    return { message: 'healthy' };
  }
}
