import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageUpload, PgmFile } from '../../shared/types/pgm-image';
import { OperationInfo, OperationsTypes } from '../../shared/types/operation';
import { OperationService } from '../../shared/services/operation.service';
import { CanvasComponent } from '../../shared/components/canvas/canvas.component';

@Component({
    selector: 'app-operation',
    templateUrl: './operation.component.html',
    styleUrls: ['./operation.component.scss']
})
export class OperationComponent {
    @ViewChild('imageA')
    public imageACanvas: CanvasComponent;

    @ViewChild('imageB')
    public imageBCanvas: CanvasComponent;

    @ViewChild('outPutCanvasOperation')
    public outPutCanvasOperation: CanvasComponent;

    public imageA: PgmFile;

    public imageB: PgmFile;

    public operations: OperationInfo[] = [];

    public selectedOperation: OperationsTypes;

    constructor(private readonly operationService: OperationService) {
        this.operations = operationService.getOperations();
    }

    public onOperationSelectChange(value: string): void {
        this.selectedOperation = Number(value);
    }

    public onOperationClick() {
        if (this.imageA && this.imageB) {
            const transformedImage = this.operationService.transform(
                this.imageA,
                this.imageB,
                this.selectedOperation
            );
            this.outPutCanvasOperation.drawImage(
                this.imageA.width,
                this.imageA.height,
                transformedImage
            );
        }
    }

    public async onFileChange(values: ImageUpload) {
        const files = values.files;
        const type = values.type;

        if (files && files.length > 0) {
            if (type === 'imageA') {
                this.imageA = await PgmFile.load(files.shift());
                this.imageACanvas.drawImage(
                    this.imageA.width,
                    this.imageA.height,
                    this.imageA.pixels
                );
            } else if (type === 'imageB') {
                this.imageB = await PgmFile.load(files.shift());
                this.imageBCanvas.drawImage(
                    this.imageB.width,
                    this.imageB.height,
                    this.imageB.pixels
                );
            }
        }
    }

}
