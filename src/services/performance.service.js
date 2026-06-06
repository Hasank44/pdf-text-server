export class PerformanceService {
    start() {
        this.startTime = Date.now();
    };

    end() {
        return `${((Date.now() - this.startTime) / 1000).toFixed(2)}s`;
    };
};
