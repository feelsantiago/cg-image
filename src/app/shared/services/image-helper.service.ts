import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ImageHelperService {
    /**
     *
     * @param index actual index
     * @param columns total of columns
     * @param rows total of rows
     * @returns [x, y] coordinate
     */
    public calculateCoordinates(
        index: number,
        columns: number,
        rows: number
    ): [number, number] {
        //for each row
        for (let i = 0; i < rows; i++) {
            //check if the index parameter is in the row
            if (index < columns * i + columns && index >= columns * i) {
                //return x, y
                return [i, index - columns * i];
            }
        }

        return null;
    }

    public addImagesPixels(imageA: number[], imageB: number[]): number[] {
        const newImage = [];

        const length =
            imageA.length < imageB.length ? imageA.length : imageB.length;

        for (let i = 0; i < length; i++) {
            const pixel = imageA[i] + imageB[i];
            newImage.push(Math.min(pixel, 255));
        }

        return newImage;
    }

    public subtractImagesPixels(imageA: number[], imageB: number[]): number[] {
        const newImage = [];

        const length =
            imageA.length < imageB.length ? imageA.length : imageB.length;

        for (let i = 0; i < length; i++) {
            const pixel = imageA[i] - imageB[i];
            newImage.push(Math.max(pixel, 0));
        }

        return newImage;
    }

    public multiplyByScalar(image: number[], scalar: number): number[] {

        const newImage = [];

        for (let i = 0; i < image.length; i++) {
            const pixel = newImage[i] * scalar;
            newImage.push(Math.min(pixel, 255));
        }

        return newImage;
    }
}
