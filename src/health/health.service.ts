import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
    getHealth() {
        return {
            status: "ok",
            timestamp: new Date().toISOString(),
        }
    }
    getNotHealthy() {
        return {
            status: "error",
            timestamp: new Date().toISOString(),
            message: "Database is not healthy",
        }
    }
}
