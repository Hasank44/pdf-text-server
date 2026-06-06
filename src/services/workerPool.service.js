export class WorkerPool {
    constructor(limit = 2) {
        this.limit = limit;
        this.running = 0;
        this.queue = [];
    };
    async run(task) {
        return new Promise((resolve, reject) => {
            this.queue.push({ task, resolve, reject });
            this.next();
        });
    };

    async next() {
        if (this.running >= this.limit) return;
        if (!this.queue.length) return;

        const { task, resolve, reject } = this.queue.shift();
        this.running++;
        try {
            const result = await task();
            resolve(result);
        } catch (err) {
            reject(err);
        } finally {
            this.running--;
            this.next();
        };
    };
};
