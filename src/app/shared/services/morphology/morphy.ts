import { Contours } from './contours';
import { MorphologyService } from './morphology.service';
import { StructuringElement } from './structuring-element';

export class Morph {
    public data: number[];

    constructor(
        private readonly height: number,
        private readonly width: number,
        bits: number[]
    ) {
        if (bits) {
            this.data = bits;
            if (this.height * this.width != this.data.length)
                throw 'MORPH_DIMENSION_ERROR: incorrect dimensions';
        } else {
            this.data = MorphologyService.createEmptyArrayWithZeros(this.height, this.width);
        }
    }

    public constructMatrixForIndex(ind: number, d: number) {
        if (!d) d = 3;

        const mat = new StructuringElement(d);
        const halfDim = Math.floor(d / 2);
        const upperLeft = ind - this.height * halfDim - 1;

        let count = 0;
        for (let x = 0; x < d * d; x++) {
            const j = upperLeft + (x % d) + this.height * Math.floor(x / d);

            if (j < this.data.length && j >= 0) {
                mat.data[count] = this.data[j];
            }

            count++;
        }

        return mat;
    }

    public subtract(mo: Morph): Morph {
        for (
            let ind = 0;
            ind < this.data.length && ind < mo.data.length;
            ind++
        ) {
            if (this.data[ind] == 1 && mo.data[ind] == 0) {
                continue;
            }

            this.data[ind] = 0;
        }

        return this;
    }

    public add(mo: Morph): Morph {
        for (
            let ind = 0;
            ind < this.data.length && ind < mo.data.length;
            ind++
        ) {
            if (mo.data[ind] == 1) {
                this.data[ind] = 1;
            }
        }

        return this;
    }

    public erodeWithElement(el: StructuringElement): Morph {
        if (!el) {
            el = new StructuringElement();
        }

        let result = [];
        let i = this.height * this.width;

        while (i > 0) {
            result.push(0);
            i--;
        }

        for (let x = 1; x < this.width - 1; x++) {
            for (let y = 1; y < this.height - 1; y++) {
                const i = y * this.width + x;
                const mat = this.constructMatrixForIndex(i, el.dim);
                result[i] = el.erode(mat);
            }
        }

        this.data = result;

        return this;
    }

    public dilateWithElement = function (el) {
        if (!el) {
            el = new StructuringElement();
        }

        const result = MorphologyService.createEmptyArrayWithZeros(this.height, this.width);

        for (let x = 1; x < this.width - 1; x++) {
            for (let y = 1; y < this.height - 1; y++) {
                const ind = x * this.height + y;
                const mat = this.constructMatrixForIndex(ind, el.dim);
                result[ind] = mat.dilateOp(el);
            }
        }

        this.data = result;

        return this;
    };

    public openingWithElement(el: StructuringElement): Morph {
        this.dilateWithElement(el);
        this.erodeWithElement(el);

        return this;
    }

    public closingWithElement(el: StructuringElement): Morph {
        this.erodeWithElement(el);
        this.dilateWithElement(el);

        return this;
    }

    public getSubImageInRect(
        top: number,
        left: number,
        height: number,
        width: number
    ) {
        if (left + width > this.width || top + height > this.height) {
            throw 'MORPH_SUBIMAGE_BOUND_ERROR: check subimage bounds)';
        }

        const startIndex = top * this.width + left;
        const endIndex = (top + height) * this.width + (left + width);
        const subImage = [];

        let i = startIndex;
        while (i < endIndex) {
            subImage.push(this.data.splice(i, i + width));
            i += this.width;
        }

        return subImage;
    }

    public hitMissTransform(): number[] {
        const result = MorphologyService.createEmptyArrayWithZeros(this.height, this.width);

        for (let x = 1; x < this.width - 1; x++) {
            for (let y = 1; y < this.height - 1; y++) {
                const i = y * this.width + x;
                const mat = this.constructMatrixForIndex(i, 3);
                result[i] =
                    mat.equivalence(
                        MorphologyService.MORPH_3x3_BOTTOM_LEFT_CORNER_ELEMENT
                    ) ||
                    mat.equivalence(
                        MorphologyService.MORPH_3x3_BOTTOM_RIGHT_CORNER_ELEMENT
                    ) ||
                    mat.equivalence(
                        MorphologyService.MORPH_3x3_TOP_LEFT_CORNER_ELEMENT
                    ) ||
                    mat.equivalence(
                        MorphologyService.MORPH_3x3_TOP_RIGHT_CORNER_ELEMENT
                    );
            }
        }

        return result;
    };

    public labelConnectedComponents() {
        const copy = new Morph(this.height, this.width, this.data);
        let labelIndex = 2;

        const equivalenceClasses = new Array();

        for (let y = 1; y < this.height - 1; y++) {
            for (let x = 1; x < this.width - 1; x++) {
                const i = y * this.width + x;
                if (copy.data[i] > 0) {
                    const mat = copy.constructMatrixForIndex(i, 3);
                    let connectedNeighborCount = 0;

                    const assignEquivalenceClass = (
                        label: number,
                        i: number
                    ) => {
                        if (connectedNeighborCount > 0) {
                            equivalenceClasses[String(label)] = Math.min(
                                equivalenceClasses[String(label)],
                                Math.min(label, copy.data[i])
                            );
                            equivalenceClasses[String(copy.data[i])] = Math.min(
                                equivalenceClasses[String(label)],
                                Math.min(label, copy.data[i])
                            );
                            copy.data[i] = Math.min(
                                equivalenceClasses[String(label)],
                                Math.min(label, copy.data[i])
                            );
                        } else {
                            equivalenceClasses[String(label)] = label;
                            copy.data[i] = label;
                        }
                    };

                    let neighborCopy0;

                    if (mat.data[0] > 2) {
                        assignEquivalenceClass(mat.data[0], i);
                        connectedNeighborCount++;
                    }
                    if (mat.data[1] > 2) {
                        assignEquivalenceClass(mat.data[1], i);
                        connectedNeighborCount++;
                    }
                    if (mat.data[2] > 2) {
                        assignEquivalenceClass(mat.data[2], i);
                        connectedNeighborCount++;
                    }
                    if (mat.data[3] > 2) {
                        assignEquivalenceClass(mat.data[3], i);
                        connectedNeighborCount++;
                    }
                    if (connectedNeighborCount == 0) {
                        labelIndex++;
                        assignEquivalenceClass(labelIndex, i);
                    }
                }
            }
        }

        /*** second pass . consolidates labels ***/

        const connectedSegments = new Contours();

        for (let y = 1; y < this.height - 1; y++) {
            for (let x = 1; x < this.width - 1; x++) {
                const i = x * this.height + y;

                if (copy.data[i] > 0) {
                    copy.data[i] = equivalenceClasses[String(copy.data[i])];
                    if (
                        !(
                            connectedSegments.contours[
                                String(equivalenceClasses[String(copy.data[i])])
                            ] instanceof Array
                        )
                    ) {
                        connectedSegments.contours[
                            String(equivalenceClasses[String(copy.data[i])])
                        ] = [[(2.0 * x) / this.width, (2.0 * y) / this.height]];
                    } else {
                        connectedSegments.contours[
                            String(equivalenceClasses[String(copy.data[i])])
                        ].push([
                            (2.0 * x) / this.width,
                            (2.0 * y) / this.height,
                        ]);
                    }
                }
            }
        }

        return {
            labeledMorph: copy,
            maxLabel: labelIndex,
            contours: connectedSegments.contours,
        };
    };

    public printDataAsMatrix(): void {
        for (let y = 0; y < this.height; y++) {
            let str = '';
            for (let x = 0; x < this.width; x++) {
                let i = y * this.width + x;
                str += this.data[i] + '  ';
            }
            console.log(str);
        }
    };

    public iterativeThinning (iterations): void {
        const hitmiss = new Morph(this.height, this.width, this.data);
        const copy = new Morph(this.height, this.width, this.data);
        hitmiss.data = hitmiss.hitMissTransform();

        let c = 0;

        while (c < iterations) {
            copy.subtract(hitmiss);
            hitmiss.data = copy.hitMissTransform();
            c++;
        }

        this.data = copy.data;
    };
}



