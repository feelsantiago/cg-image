import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilesEvent, ImageUpload } from '../../types/pgm-image';

@Component({
    selector: 'app-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
    @Input()
    public imageType: string;

    @Input()
    public label: string;

    @Output()
    public onImageChange: EventEmitter<ImageUpload>;

    constructor() {
        this.onImageChange = new EventEmitter();
    }

    ngOnInit(): void {
    }

    public onImageUploadedChange(files: FilesEvent): void {
        const values = Object.values(files);

        this.onImageChange.emit({ files: values, type: this.imageType });
    }
}
