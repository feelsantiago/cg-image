import {
    Component,
    Input,
    OnInit,
    ViewChild,
    AfterViewInit,
    ElementRef,
    Output,
    EventEmitter,
} from '@angular/core';
import { PgmFile } from '../../types/pgm-image';

@Component({
    selector: 'app-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit, AfterViewInit {
    @Input()
    public width = 256;

    @Input()
    public height = 256;

    @ViewChild('canvas')
    public canvasRef: ElementRef;

    private canvas: HTMLCanvasElement;

    private canvasContext: CanvasRenderingContext2D;

    constructor() {}

    public ngOnInit(): void {}

    public ngAfterViewInit(): void {
        this.canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
        this.canvasContext = this.canvas.getContext('2d');
    }

    public clean(): void {
        this.canvasContext.clearRect(0, 0, this.width, this.height);
    }

    public drawImage(image: PgmFile): void {
        const { width, height, pixels } = image;
        const imageData = this.canvasContext.createImageData(width, height);
        const data = imageData.data;

        let pixelCount = 0;
        for (let pixel of pixels) {
            // RED
            data[0 + pixelCount] = pixel;
            // GREEN
            data[1 + pixelCount] = pixel;
            // BLUE
            data[2 + pixelCount] = pixel;
            // ALPHA
            data[3 + pixelCount] = 255;

            pixelCount += 4;
        }

        // Draw next tick, after angular redraw component sizes
        // There is no 'setImmediate' on browsers
        setTimeout(() => {
            // Draw image on canvas position [0, 0]
            this.canvasContext.putImageData(imageData, 0, 0);
        }, 0);
    }
}
