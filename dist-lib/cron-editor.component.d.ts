import { OnInit, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { CronOptions } from './CronOptions';
export declare class CronGenComponent implements OnInit, OnChanges {
    private _activeTab;
    private _selectedTabIndex;
    private _initializing;
    disabled: boolean;
    options: CronOptions;
    get cron(): string;
    set cron(value: string);
    cronChange: EventEmitter<any>;
    selectOptions: {
        months: number[];
        monthWeeks: string[];
        days: string[];
        minutes: number[];
        fullMinutes: number[];
        seconds: number[];
        hours: number[];
        monthDays: number[];
        monthDaysWithLasts: string[];
        monthDaysWithOutLasts: string[];
        hourTypes: string[];
    };
    state: any;
    private localCron;
    private isDirty;
    private _tabsList;
    get selectedTabIndex(): number;
    set selectedTabIndex(val: number);
    get activeTab(): string;
    set activeTab(val: string);
    get isCronFlavorQuartz(): boolean;
    get isCronFlavorStandard(): boolean;
    get yearDefaultChar(): "*" | "";
    get weekDayDefaultChar(): "*" | "?";
    get monthDayDefaultChar(): "*" | "?";
    ngOnInit(): Promise<void>;
    ngOnChanges(changes: SimpleChanges): Promise<void>;
    setActiveTab(tab: string, event: any): void;
    dayDisplay(day: string): string;
    monthWeekDisplay(monthWeekNumber: number): string;
    monthDisplay(month: number): string;
    monthDayDisplay(month: string): string;
    regenerateCron(): void;
    private getAmPmHour;
    private getHourType;
    private hourToCron;
    private handleModelChange;
    private cronIsValid;
    private getDefaultState;
    private getOrdinalSuffix;
    private getSelectOptions;
    private getRange;
}
