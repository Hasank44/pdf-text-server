export class LayoutAnalyzer {
    detectColumns(items) {
        const xPositions = items.map(i => i.x);
        const avg = xPositions.reduce((a, b) => a + b, 0) / xPositions.length;
        const left = items.filter(i => i.x < avg);
        const right = items.filter(i => i.x >= avg);

        return {
            hasColumns: left.length > 0 && right.length > 0,
            columns: [left, right],
        };
    };
    detectHeaders(items) {
        return items.filter(i => i.y > 700);
    };
    detectFooters(items) {
        return items.filter(i => i.y < 100);
    };
};
