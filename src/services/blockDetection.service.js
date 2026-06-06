export class BlockDetectionService {
    constructor() {
        this.LINE_THRESHOLD = 6;
        this.PARAGRAPH_GAP = 12;
    }

    sortItems(items) {
        return items.sort((a, b) => {
            if (Math.abs(a.y - b.y) < 5) return a.x - b.x;
            return b.y - a.y;
        });
    };

    groupLines(items) {
        const lines = [];

        for (const item of items) {
            let line = lines.find(l => Math.abs(l.y - item.y) < this.LINE_THRESHOLD);
            if (!line) {
                line = { y: item.y, items: [] };
                lines.push(line);
            };
            line.items.push(item);
        };

        return lines;
    };

    mergeLineText(lines) {
        return lines.map((line, index) => {
            const text = line.items.sort((a, b) => a.x - b.x).map(i => i.text).join(" ");

            return {
                lineId: `line_${index}`,
                text,
                x: Math.min(...line.items.map(i => i.x)),
                y: line.y,
                width: Math.max(...line.items.map(i => i.x + i.width)),
                height: Math.max(...line.items.map(i => i.height)),
            };
        });
    };

    groupParagraphs(lines) {
        const blocks = [];
        let currentBlock = [];

        for (let i = 0; i < lines.length; i++) {
            const current = lines[i];
            const next = lines[i + 1];
            currentBlock.push(current);
            const gap = next ? current.y - next.y : 0;
            if (!next || gap > this.PARAGRAPH_GAP) {
                blocks.push([...currentBlock]);
                currentBlock = [];
            }
        };
        return blocks;
    };

    detectBlocks(pageItems) {
        const sorted = this.sortItems(pageItems);
        const lines = this.groupLines(sorted);
        const mergedLines = this.mergeLineText(lines);
        const paragraphs = this.groupParagraphs(mergedLines);
        const blocks = paragraphs.map((para, index) => {
            const text = para.map(l => l.text).join(" ");

            return {
                blockId: `block_${index + 1}`,
                type: "paragraph",
                text,
                x: Math.min(...para.map(l => l.x)),
                y: Math.max(...para.map(l => l.y)),
                width: Math.max(...para.map(l => l.width)),
                height: para.length * 14,
            };
        });
        return blocks;
    };
};
