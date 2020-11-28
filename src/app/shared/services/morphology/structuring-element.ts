export class StructuringElement {
    constructor(public readonly dim = 3, public data?: number[]) {
        if (!data) {
            this.data = [];
            // this.integerRepresentation = new UintArray(32);
            for (let ind = 0; ind < this.dim * this.dim; ind++) {
                this.data.push(1);
            }
        }
    }

    public dilatate(element: StructuringElement): number {
        for (let j = 0; j < 9; j++) {
            if (element.data[j] == -1) continue;
            if (element.data[j] == 1 && this.data[j] == 1) {
                return 1;
            }
        }

        return 0;
    }

    public erode(element: StructuringElement): number {
        for (let i = 0; i < 9; i++) {
            if (element.data[i] == -1) continue;
            if (element.data[i] != this.data[i] && element.data[i] != 1) {
                return 0;
            }
        }
        return 1;
    }

    public equivalence(element: StructuringElement): number {
        for (let i = 0; i < 9; i++) {
            if (element.data[i] == -1) continue;
            if (element.data[i] != this.data[i]) {
                return 0;
            }
        }
        return 1;
    }
}
