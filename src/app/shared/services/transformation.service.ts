import { Injectable } from '@angular/core';
import { PgmFile } from '../types/pgm-image';

@Injectable({ providedIn: 'root' })
export class TransformationService {
    public rotate(image: PgmFile, deg: number): PgmFile {

        deg %= 360;
        const rad = (deg * Math.PI) / 180;
        const cosine = Math.cos(rad);
        const sine = Math.sin(rad);

        const newImage = Array.from(Array(image.length).keys()).map(() => 255);

        const translate2Cartesian = this.createTranslationFunction(
            -(image.width / 2),
            -(image.height / 2)
        );
        const translate2Screen = this.createTranslationFunction(
            image.width / 2 + 0.5,
            image.height / 2 + 0.5
        );

        for (let x = 1; x <= image.height; x++) {
            for (let y = 1; y <= image.width; y++) {
                const cartesian = translate2Cartesian(x, y);
                const source = translate2Screen(
                    cosine * cartesian.x - sine * cartesian.y,
                    cosine * cartesian.y + sine * cartesian.x
                );

                const dstIdx = image.width * (y - 1) + x - 1;

                if (
                    source.x >= 0 &&
                    source.x < image.width &&
                    source.y >= 0 &&
                    source.y < image.height
                ) {
                    const srcIdx =
                        (image.width * (source.y | 0) + source.x) | 0;

                    newImage[dstIdx] = image.pixels[srcIdx];
                } else {
                    newImage[dstIdx] = 255;
                }
            }
        }

        const newPgm = new PgmFile();
        newPgm.pixels = newImage;
        newPgm.height = image.height;
        newPgm.width = image.width;
        return newPgm;
    }

    public scale(image: PgmFile, deltaX, deltaY): PgmFile {

        let newWidth = Math.round(deltaX * image.width);
        let newHeight = Math.round(deltaY * image.height);

        if (newWidth <= 0) {
            newWidth = 1;
        }
        if (newHeight <= 0) {
            newHeight = 1;
        }

        if (newWidth === image.width && newHeight === image.height) {
            return image;
        }

        const newImage = Array.from(Array(image.length).keys()).map(() => 255);

        const wRatio = image.width / newWidth;
        const hRatio = image.height / newHeight;

        for (let i = 0; i < newWidth; i++) {
            const w = Math.floor((i + 0.5) * wRatio);
            for (let j = 0; j < newHeight; j++) {
                const h = Math.floor((j + 0.5) * hRatio);
                if (image.pixelAt(w, h)) {
                    const index = i * newWidth + j;
                    newImage[index] = image.pixelAt(w, h);
                }
            }
        }

        const newPgm = new PgmFile();
        newPgm.pixels = newImage;
        newPgm.height = newHeight;
        newPgm.width = newWidth;

        return newPgm;
    }

    public translation(image: PgmFile, deltaX: number, deltaY: number): PgmFile {

        const newImage = Array.from(Array(image.length).keys()).map(() => 255);

        for (let i = 0; i < image.height; i++) {
            for (let j = 0; j < image.width; j++) {
                const x = i + (deltaX - 1);
                const y = j + (deltaY - 1);
                const index = image.calculateArrayIndex(x, y);

                if (index <= image.length && x < image.height && y < image.width) {
                    newImage[index] = image.pixelAt(i, j);
                }
            }
        }

        const newPgm = new PgmFile();
        newPgm.pixels = newImage;
        newPgm.height = image.height;
        newPgm.width = image.width;

        return newPgm;
    }

    private createTranslationFunction(
        deltaX: number,
        deltaY: number
    ): (x: number, y: number) => { x: number; y: number } {
        return (x, y) => ({
            x: x + deltaX,
            y: y + deltaY,
        });
    }
}
