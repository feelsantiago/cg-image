import { Mask, MaskType } from '../types/maks';
import { PgmFile } from '../types/pgm-image';
import { ImageHelperService } from './image-helper.service';

export class BaseFilterService {

    constructor(protected readonly imageHelperService: ImageHelperService) {}

    protected filterImage(
        image: PgmFile,
        mask: Mask,
        type: MaskType = MaskType.correlation
    ): number[] {
        const newImage = [];

        if (type === MaskType.convolution) mask = this.convolutionMask(mask);

        for (let i = 0; i < image.length; i++) {
            const neighborhoods = this.getNeighborhoods(i, image);
            let sum = 0;

            for (let j = 0; j < 9; j++) {
                sum += neighborhoods[j] * mask[j];
            }

            newImage.push(sum);
        }

        return newImage;
    }

    private getNeighborhoods(index: number, image: PgmFile): Mask {
        const [x, y] = this.imageHelperService.calculateCoordinates(
            index,
            image.width,
            image.height
        );

        const topLeft = image.pixelAt(x - 1, y - 1);
        const top = image.pixelAt(x - 1, y);
        const topRight = image.pixelAt(x - 1, y + 1);

        const left = image.pixelAt(x, y - 1);
        const center = image.pixelAt(x, y);
        const right = image.pixelAt(x, y + 1);

        const bottomLeft = image.pixelAt(x + 1, y - 1);
        const bottom = image.pixelAt(x + 1, y);
        const bottomRight = image.pixelAt(x + 1, y + 1);

        // prettier-ignore
        return [
            topLeft, top, topRight,
            left, center, right,
            bottomLeft, bottom, bottomRight
        ]
    }

    private convolutionMask(mask: Mask): Mask {

        // prettier-ignore
        const convolution: Mask = [
            mask[8], mask[7], mask[6],
            mask[5], mask[4], mask[3],
            mask[2], mask[1], mask[0],
        ];

        return convolution;
    }
}
