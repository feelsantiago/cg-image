import { Mask, MaskType } from '../types/maks';
import { PgmFile } from '../types/pgm-image';
import { ImageHelperService } from './image-helper.service';

export class BaseFilterService {
    constructor(protected readonly imageHelperService: ImageHelperService) {}

    protected filterImage(
        image: PgmFile,
        mask: Mask,
        type: MaskType = MaskType.correlation,
        abs = false
    ): number[] {
        const newImage = [];

        if (type === MaskType.convolution) mask = this.convolutionMask(mask);

        for (let i = 0; i < image.length; i++) {
            const neighborhoods = this.getNeighborhoods(i, image);
            let sum = 0;

            for (let j = 0; j < 9; j++) {
                sum += Math.floor(neighborhoods[j] * mask[j]);
                if (abs) sum = Math.abs(sum);
            }

            newImage.push(sum);
        }

        return newImage;
    }

    protected getNeighborhoods(i: number, image: PgmFile, zeroCount = true, addCenter = true): Mask {

        const neighbors = [];

        if (i - image.width - 1 >= 0 && i % image.width != 0)
            // northwest
            neighbors.push(image.pixels[i - image.width - 1]);
        else if (zeroCount) neighbors.push(0);

        if (i - image.width >= 0) neighbors.push(image.pixels[i - image.width]);
        // north
        else if (zeroCount) neighbors.push(0);

        if (i - image.width + 1 >= 0 && (i + 1) % image.width != 0)
            // northeast
            neighbors.push(image.pixels[i - image.width + 1]);
        else if (zeroCount) neighbors.push(0);

        if (i % image.width != 0) neighbors.push(image.pixels[i - 1]);
        // west
        else if (zeroCount) neighbors.push(0);

        if (addCenter)
            neighbors.push(image.pixels[i]);

        if ((i + 1) % image.width != 0) neighbors.push(image.pixels[i + 1]);
        // east
        else if (zeroCount) neighbors.push(0);

        if (i + image.width - 1 < image.length && i % image.width != 0)
            // southwest
            neighbors.push(image.pixels[i + image.width - 1]);
        else if (zeroCount) neighbors.push(0);

        if (i + image.width < image.length) neighbors.push(image.pixels[i + image.width]);
        // south
        else if (zeroCount) neighbors.push(0);

        if (i + image.width + 1 < image.length && (i + 1) % image.width != 0)
            // southeast
            neighbors.push(image.pixels[i + image.width + 1]);
        else if (zeroCount) neighbors.push(0);

        return neighbors as Mask;
    }

    protected convolutionMask(mask: Mask): Mask {
        // prettier-ignore
        const convolution: Mask = [
            mask[8], mask[7], mask[6],
            mask[5], mask[4], mask[3],
            mask[2], mask[1], mask[0],
        ];

        return convolution;
    }
}
