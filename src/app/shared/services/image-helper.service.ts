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

    public add(imageA: number[], imageB: number[]): number[] {
        const newImage = [];
        let minValue = 255;
        let maxValue = 0;

        const length =
            imageA.length < imageB.length ? imageA.length : imageB.length;

        for (let i = 0; i < length; i++) {
            const pixel = imageA[i] + imageB[i];
            minValue = minValue < pixel ? minValue : pixel;
            maxValue = maxValue > pixel ? maxValue : pixel;
            newImage.push(Math.min(pixel, 255));
        }

        return this.normalization(newImage, maxValue, minValue, 255);
    }

    public subtract(imageA: number[], imageB: number[]): number[] {
        const newImage = [];
        let minValue = 255;
        let maxValue = 0;

        const length =
            imageA.length < imageB.length ? imageA.length : imageB.length;

        for (let i = 0; i < length; i++) {
            const pixel = imageA[i] - imageB[i];
            minValue = minValue < pixel ? minValue : pixel;
            maxValue = maxValue > pixel ? maxValue : pixel;
            newImage.push(Math.max(pixel, 0));
        }

        return this.normalization(newImage, maxValue, minValue, 255);
    }

    public multiplyByScalar(image: number[], scalar: number): number[] {
        const newImage = [];
        let minValue = 255;
        let maxValue = 0;

        for (let i = 0; i < image.length; i++) {
            let a = image[i];
            const pixel = image[i] * scalar;
            minValue = minValue < pixel ? minValue : pixel;
            maxValue = maxValue > pixel ? maxValue : pixel;
            newImage.push(Math.floor(pixel));
        }

        return this.normalization(newImage, maxValue, minValue, 255);
    }

    public multiply(imageA: number[], imageB: number[]): number[] {
        const newImage = [];
        let minValue = 255;
        let maxValue = 0;

        const length =
            imageA.length < imageB.length ? imageA.length : imageB.length;

        for (let i = 0; i < length; i++) {
            const pixel = imageA[i] * imageB[i];
            minValue = minValue < pixel ? minValue : pixel;
            maxValue = maxValue > pixel ? maxValue : pixel;
            newImage.push(pixel);
        }

        return this.normalization(newImage, maxValue, minValue, 255);
    }

    public divide(imageA: number[], imageB: number[]): number[] {
        const newImage = [];
        let minValue = 255;
        let maxValue = 0;

        const length =
            imageA.length < imageB.length ? imageA.length : imageB.length;

        for (let i = 0; i < length; i++) {
            const pixel = imageA[i] / imageB[i];
            minValue = minValue < pixel ? minValue : pixel;
            maxValue = maxValue > pixel ? maxValue : pixel;
            newImage.push(Math.max(pixel, 0));
        }

        return this.normalization(newImage, maxValue, minValue, 255);
    }

    public and(imageA: number[], imageB: number[]): number[] {
        const newImage = [];

        const length =
            imageA.length < imageB.length ? imageA.length : imageB.length;

        for (let i = 0; i < length; i++) {
            const pixel = imageA[i] & imageB[i];
            newImage.push(pixel > 255 ? 255 : Math.max(pixel, 0));
        }

        return newImage;
    }

    public or(imageA: number[], imageB: number[]): number[] {
        const newImage = [];

        const length =
            imageA.length < imageB.length ? imageA.length : imageB.length;

        for (let i = 0; i < length; i++) {
            const pixel = imageA[i] | imageB[i];
            newImage.push(pixel > 255 ? 255 : Math.max(pixel, 0));
        }

        return newImage;
    }

    public xor(imageA: number[], imageB: number[]): number[] {
        const newImage = [];

        const length =
            imageA.length < imageB.length ? imageA.length : imageB.length;

        for (let i = 0; i < length; i++) {
            const pixel = imageA[i] ^ imageB[i];
            newImage.push(pixel > 255 ? 255 : Math.max(pixel, 0));
        }

        return newImage;
    }

    private normalization(imageA: number[], maxPixelvalue: number, minPixelValue: number, maxCinzaValue: number): number[] {
        const newImage = [];

        for (let i = 0; i < imageA.length; i++) {
            const pixel = Math.round(((maxCinzaValue / (maxPixelvalue - minPixelValue)) * (imageA[i] - minPixelValue)));
            newImage.push(pixel);
        }

        return newImage;
    }
}
