import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';


@Controller('/')
export class HealthController {
    constructor(private readonly healthService: HealthService) { }
    @Get('health')
    getHealth() {
        return this.healthService.getHealth();
    }
    @Get('not-healthy')
    getNotHealthy() {
        return this.healthService.getNotHealthy();
    }
}
