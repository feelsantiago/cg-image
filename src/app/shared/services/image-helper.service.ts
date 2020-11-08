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
    public calculateCoordinates(index: number, columns: number, rows: number): [number, number] {
        //for each row
        for (let i = 0; i < rows; i++) {
            //check if the index parameter is in the row
            if (index < columns * i + columns && index >= columns * i) {
                //return x, y
                return [index - columns * i, i];
            }
        }

        return null;
    };
}
