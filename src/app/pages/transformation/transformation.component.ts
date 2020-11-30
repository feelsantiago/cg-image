import { Component, ViewChild } from '@angular/core';
import { ImageUpload, PgmFile } from '../../shared/types/pgm-image';
import { CanvasComponent } from '../../shared/components/canvas/canvas.component';
import { TransformationService } from 'src/app/shared/services/transformation.service';
import { TransformationInfo, TransformationTypes } from 'src/app/shared/types/transformation';

@Component({
    selector: 'app-transformation',
    templateUrl: './transformation.component.html',
    styleUrls: ['./transformation.component.scss']
})
export class TransformationComponent {
    @ViewChild(CanvasComponent)
    public canvas: CanvasComponent;

    @ViewChild('outPutCanvas')
    public outPutCanvas: CanvasComponent;

    public image: PgmFile;

    public transformations: TransformationInfo[] = [];

    public transformedImage: PgmFile;

    public selectedTransformation: TransformationTypes;

    public degrees: number = 90;

    public x: number = 0;

    public y: number = 0;

    public gama: number = 0.5;

    constructor(private readonly transformationService: TransformationService) {
        this.transformations = transformationService.getTransformations();
    }

    public onTransformationSelectChange(value: string): void {
        this.selectedTransformation = Number(value);
    }

    public onTransformationClick() {
        if (this.image) {

            if (this.selectedTransformation === TransformationTypes.rotate) {
                this.transformedImage = this.transformationService.rotate(
                    this.image,
                    this.degrees
                );
            } else if (this.selectedTransformation === TransformationTypes.scale) {
                this.transformedImage = this.transformationService.scale(
                    this.image,
                    this.x,
                    this.y
                )
            } else if (this.selectedTransformation === TransformationTypes.shear) {
                this.transformedImage = this.transformationService.shear(
                    this.image,
                    this.x,
                    this.y
                )
            } else if (this.selectedTransformation === TransformationTypes.translation) {
                this.transformedImage = this.transformationService.translation(
                    this.image,
                    this.x,
                    this.y
                )
            }


            this.outPutCanvas.drawImage(
                this.transformedImage.width,
                this.transformedImage.height,
                this.transformedImage.pixels
            );
        }
    }

    public async onFileChange(values: ImageUpload) {
        const files = values.files;

        if (files && files.length > 0) {
            this.image = await PgmFile.load(files.shift());
            this.canvas.drawImage(
                this.image.width,
                this.image.height,
                this.image.pixels
            );
        }
    }
}
