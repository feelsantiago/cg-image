import { Injectable } from '@angular/core';
import { PgmFile } from '../types/pgm-image';

@Injectable({ providedIn: 'root' })
export class TransformationService {
    public rotate(image: PgmFile, deg: number): number[] {

        deg %= 360;
        const rad = (deg * Math.PI) / 180;
        const cosine = Math.cos(rad);
        const sine = Math.sin(rad);

        const newImage = new Array(image.height * image.width).map(
            () => 255
        );

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

        return newImage;
    }

    public scale(image: PgmFile, deltaX, deltaY) {
        const scaleH = image.height * deltaX;
        const scaleW = image.width * deltaY;

        const newImage = new Array(scaleH * scaleW).map(() => 0);

        let last = 0;
        for (let x = 0; x < image.height; x++) {
            for (let y = 0; y < image.width; y++) {
                const sourcePixel = image.pixelAt(x, y);

                for (let i = 0; i < deltaX; i++) {
                    for (let j = 0; j < deltaY; j++) {
                        const index = (x + i) * scaleW + (y + j);
                        newImage[index + last] = sourcePixel;
                    }
                }

                last += deltaY;
            }
            last += deltaX;
        }

        return { newImage, scaleH, scaleW };
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
