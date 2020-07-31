import { __awaiter } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
export class TimePickerComponent {
    constructor() {
        this.onChange = new EventEmitter();
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.hours = this.use24HourTime ? this.range(0, 23) : this.range(0, 12);
            this.minutes = this.range(0, 59);
            this.seconds = this.range(0, 59);
            this.hourTypes = ['AM', 'PM'];
        });
    }
    changeEmit() {
        console.log('changeEmit');
        this.onChange.emit();
    }
    range(start, end) {
        const length = end - start + 1;
        return Array.apply(undefined, Array(length)).map((_, i) => i + start);
    }
}
TimePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'cron-time-picker',
                template: "<!-- hour -->\r\n<mat-form-field style=\"width: 50px;\">\r\n  <mat-select style=\"width: 20px; display: inline;\" (selectionChange)=\"changeEmit()\" [(ngModel)]=\"model.hours\" [disabled]=\"disabled\"\r\n    [ngClass]=\"selectClass\">\r\n    <mat-option *ngFor=\"let hour of hours\" [value]=\"hour\">{{hour}}</mat-option>\r\n  </mat-select>\r\n</mat-form-field>\r\n\r\n<!-- minute -->\r\n<mat-form-field style=\"width: 50px;\">\r\n  <mat-select style=\"width: 20px; display: inline;\" (selectionChange)=\"changeEmit()\" [(ngModel)]=\"model.minutes\" [disabled]=\"disabled\"\r\n    [ngClass]=\"selectClass\">\r\n    <mat-option *ngFor=\"let minute of minutes\" [value]=\"minute\">{{minute}}</mat-option>\r\n  </mat-select>\r\n</mat-form-field>\r\n\r\n<!-- second -->\r\n<mat-form-field *ngIf=\"!hideSeconds\" style=\"width: 50px;\">\r\n  <mat-select style=\"width: 20px; display: inline;\" (selectionChange)=\"changeEmit()\" [(ngModel)]=\"model.seconds\" [disabled]=\"disabled\"\r\n     [ngClass]=\"selectClass\">\r\n    <mat-option *ngFor=\"let second of seconds\" [value]=\"second\">{{second}}</mat-option>\r\n  </mat-select>\r\n</mat-form-field>\r\n\r\n<!-- am/pm -->\r\n<mat-form-field *ngIf=\"!use24HourTime\" style=\"width: 50px;\">\r\n  <mat-select style=\"width: 20px; display: inline;\" (selectionChange)=\"changeEmit()\" [(ngModel)]=\"model.hourType\" [disabled]=\"disabled\"\r\n     [ngClass]=\"selectClass\">\r\n    <mat-option *ngFor=\"let hourType of hourTypes\" [value]=\"hourType\">{{hourType}}</mat-option>\r\n  </mat-select>\r\n</mat-form-field>\r\n"
            },] }
];
TimePickerComponent.propDecorators = {
    onChange: [{ type: Output }],
    disabled: [{ type: Input }],
    model: [{ type: Input }],
    selectClass: [{ type: Input }],
    use24HourTime: [{ type: Input }],
    hideSeconds: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Jvbi10aW1lLXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBwL2Nyb24tZWRpdG9yL2Nyb24tdGltZS1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQVUsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBTTdFLE1BQU0sT0FBTyxtQkFBbUI7SUFKaEM7UUFLbUIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUE2QmpELENBQUM7SUFoQmMsUUFBUTs7WUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDeEUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEMsQ0FBQztLQUFBO0lBRUQsVUFBVTtRQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRU8sS0FBSyxDQUFDLEtBQWEsRUFBRSxHQUFXO1FBQ3RDLE1BQU0sTUFBTSxHQUFHLEdBQUcsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQy9CLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO0lBQ3hFLENBQUM7OztZQWpDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsMGlEQUErQzthQUNoRDs7O3VCQUVFLE1BQU07dUJBRU4sS0FBSztvQkFDTCxLQUFLOzBCQUNMLEtBQUs7NEJBQ0wsS0FBSzswQkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIE9uSW5pdCwgRXZlbnRFbWl0dGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnY3Jvbi10aW1lLXBpY2tlcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2Nyb24tdGltZS1waWNrZXIudGVtcGxhdGUuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFRpbWVQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBPdXRwdXQoKSBwdWJsaWMgb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIEBJbnB1dCgpIHB1YmxpYyBkaXNhYmxlZDogYm9vbGVhbjtcclxuICBASW5wdXQoKSBwdWJsaWMgbW9kZWw6IGFueTtcclxuICBASW5wdXQoKSBwdWJsaWMgc2VsZWN0Q2xhc3M6IHN0cmluZztcclxuICBASW5wdXQoKSBwdWJsaWMgdXNlMjRIb3VyVGltZTogYm9vbGVhbjtcclxuICBASW5wdXQoKSBwdWJsaWMgaGlkZVNlY29uZHM6IGJvb2xlYW47XHJcblxyXG4gIHB1YmxpYyBob3VyczogbnVtYmVyW107XHJcbiAgcHVibGljIG1pbnV0ZXM6IG51bWJlcltdO1xyXG4gIHB1YmxpYyBzZWNvbmRzOiBudW1iZXJbXTtcclxuICBwdWJsaWMgaG91clR5cGVzOiBzdHJpbmdbXTtcclxuXHJcbiAgcHVibGljIGFzeW5jIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5ob3VycyA9IHRoaXMudXNlMjRIb3VyVGltZSA/IHRoaXMucmFuZ2UoMCwgMjMpIDogdGhpcy5yYW5nZSgwLCAxMik7XHJcbiAgICB0aGlzLm1pbnV0ZXMgPSB0aGlzLnJhbmdlKDAsIDU5KTtcclxuICAgIHRoaXMuc2Vjb25kcyA9IHRoaXMucmFuZ2UoMCwgNTkpO1xyXG4gICAgdGhpcy5ob3VyVHlwZXMgPSBbJ0FNJywgJ1BNJ107XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VFbWl0KCkge1xyXG4gICAgY29uc29sZS5sb2coJ2NoYW5nZUVtaXQnKTtcclxuICAgIHRoaXMub25DaGFuZ2UuZW1pdCgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByYW5nZShzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlcik6IG51bWJlcltdIHtcclxuICAgIGNvbnN0IGxlbmd0aCA9IGVuZCAtIHN0YXJ0ICsgMTtcclxuICAgIHJldHVybiBBcnJheS5hcHBseSh1bmRlZmluZWQsIEFycmF5KGxlbmd0aCkpLm1hcCgoXywgaSkgPT4gaSArIHN0YXJ0KTtcclxuICB9XHJcbn1cclxuIl19