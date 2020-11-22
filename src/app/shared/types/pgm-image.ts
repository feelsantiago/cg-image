/**
 * Represent a image file storage on format PGM
 * The PGM is divided in two sections: the header and the body
 * The first three lines compose the header [1º - ID, 2º - Width and Height, 3º - Max Grey Level]
 * The rest of the file represent the body witch every element represent a pixel
 */


export type FilesEvent = { [key: number]: File };
export interface ImageUpload {
    files: File[];
    type: string;
}
export class PgmFile {
    public id: string;

    public width: number;

    public height: number;

    public maxGreyValue: number;

    public pixels: number[] = [];

    get length(): number {
        return this.pixels.length;
    }

    public static async load(file: File): Promise<PgmFile> {
        return this.readFile(file);
    }

    public pixelAt(x: number, y: number): number {
        const index = x * this.width + y;
        return index < 0 ? 0 : this.pixels[index];
    }

    private static async readFile(file: File): Promise<PgmFile> {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();

            fileReader.addEventListener('load', (content) => {
                try {
                    const result = content.target.result as string;
                    resolve(this.processContent(result));
                } catch (error) {
                    reject(error);
                }
            });

            fileReader.readAsText(file);
        });
    }

    private static processContent(content: string): PgmFile {
        const file = new PgmFile();

        /* CONTENT HEADER */

        // TODO: Can be optimized
        const lines = content.split('\n');

        file.id = lines.shift();

        const [width, height] = lines.shift().split(' ');
        file.width = Number(width);
        file.height = Number(height);

        file.maxGreyValue = Number(lines.shift());

        // Remove last element because is always blank '\n'
        lines.pop();

        /* CONTENT BODY */
        for (let line of lines) {
            const pixels = line.split(' ').map((pixel) => Number(pixel));
            file.pixels.push(...pixels);
        }

        return file;
    }
}
