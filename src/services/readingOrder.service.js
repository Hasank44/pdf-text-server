export class ReadingOrderService {
    orderBlocks(blocks) {
        return blocks.sort((a, b) => {
            if (Math.abs(a.y - b.y) < 10) {
                return a.x - b.x;
            };
            return b.y - a.y;
        });
    };
};