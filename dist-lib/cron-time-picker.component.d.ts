import { OnInit, EventEmitter } from '@angular/core';
export declare class TimePickerComponent implements OnInit {
    onChange: EventEmitter<any>;
    disabled: boolean;
    model: any;
    selectClass: string;
    use24HourTime: boolean;
    hideSeconds: boolean;
    hours: number[];
    minutes: number[];
    seconds: number[];
    hourTypes: string[];
    ngOnInit(): Promise<void>;
    changeEmit(): void;
    private range;
}
