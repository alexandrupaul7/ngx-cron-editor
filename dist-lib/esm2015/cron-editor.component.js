import { __awaiter } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Days, MonthWeeks, Months, MonthsRO, CronFlavor, MonthWeeksRO, DaysRO } from './enums';
export class CronGenComponent {
    constructor() {
        this._initializing = true;
        // the name is an Angular convention, @Input variable name + "Change" suffix
        this.cronChange = new EventEmitter();
        this.selectOptions = this.getSelectOptions();
    }
    get cron() {
        return this.localCron;
    }
    set cron(value) {
        this.localCron = value;
        if (!this._initializing) {
            this.cronChange.emit(this.localCron);
        }
    }
    // An ordered list of the tabs, based on which ones are hidden
    // Must correspond to the order in the UI
    _tabsList() {
        const tabs = [];
        if (!this.options.hideMinutesTab) {
            tabs.push('minutes');
        }
        if (!this.options.hideHourlyTab) {
            tabs.push('hourly');
        }
        if (!this.options.hideDailyTab) {
            tabs.push('daily');
        }
        if (!this.options.hideWeeklyTab) {
            tabs.push('weekly');
        }
        if (!this.options.hideMonthlyTab) {
            tabs.push('monthly');
        }
        if (!this.options.hideYearlyTab) {
            tabs.push('yearly');
        }
        if (!this.options.hideAdvancedTab) {
            tabs.push('advanced');
        }
        return tabs;
    }
    get selectedTabIndex() {
        return this._selectedTabIndex;
    }
    set selectedTabIndex(val) {
        this._selectedTabIndex = val;
        this._activeTab = this._tabsList()[val];
        this.regenerateCron();
    }
    get activeTab() {
        return this._activeTab;
    }
    set activeTab(val) {
        this._activeTab = val;
        this._selectedTabIndex = this._tabsList().indexOf(val);
        this.regenerateCron();
    }
    get isCronFlavorQuartz() {
        return this.options.cronFlavor === CronFlavor.quartz;
    }
    get isCronFlavorStandard() {
        return this.options.cronFlavor === CronFlavor.standard;
    }
    get yearDefaultChar() {
        return this.options.cronFlavor === CronFlavor.quartz ? '*' : '';
    }
    get weekDayDefaultChar() {
        return this.options.cronFlavor === CronFlavor.quartz ? '?' : '*';
    }
    get monthDayDefaultChar() {
        return this.options.cronFlavor === CronFlavor.quartz ? '?' : '*';
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            // This will be augmented based on the parsed cron
            this.state = this.getDefaultState();
            this.handleModelChange(this.cron);
            // Make sure we have something selected
            if (this._selectedTabIndex === null || this._selectedTabIndex === undefined || this.selectedTabIndex < 0) {
                // Force the first tab as default
                this.selectedTabIndex = 0;
            }
            this.regenerateCron();
            this._initializing = false;
        });
    }
    ngOnChanges(changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCron = changes['cron'];
            if (newCron && !newCron.firstChange) {
                this.handleModelChange(this.cron);
            }
        });
    }
    setActiveTab(tab, event) {
        event; // makes the compiler happy
        if (!this.disabled) {
            this.activeTab = tab;
            this.regenerateCron();
        }
    }
    dayDisplay(day) {
        var r = Days[day];
        if (this.options.tLanguage == 'ro')
            r = DaysRO[day];
        return r;
    }
    monthWeekDisplay(monthWeekNumber) {
        var r = MonthWeeks[monthWeekNumber];
        if (this.options.tLanguage == 'ro') {
            r = MonthWeeksRO[monthWeekNumber];
        }
        return r;
    }
    monthDisplay(month) {
        var r = Months[month];
        if (this.options.tLanguage == 'ro') {
            r = MonthsRO[month];
        }
        return r;
    }
    monthDayDisplay(month) {
        if (month === 'L') {
            return 'Last Day';
        }
        else if (month === 'LW') {
            return 'Last Weekday';
        }
        else if (month === '1W') {
            return 'First Weekday';
        }
        else {
            if (this.options.tLanguage == 'ro') {
                return month;
            }
            else {
                return `${month}${this.getOrdinalSuffix(month)} day`;
            }
        }
    }
    regenerateCron() {
        this.isDirty = true;
        // This is constructed in reverse order from standard:
        // cron_parts[0] = year (quartz -- blank otherwise)
        // cron_parts[1] = day of week
        // cron_parts[2] = month
        // cron_parts[3] = day of month
        // cron_parts[4] = hour
        // cron_parts[5] = minute
        // cron_parts[6] = second (quartz)
        let cron_parts = [];
        switch (this.activeTab) {
            case 'minutes':
                cron_parts = [
                    this.yearDefaultChar,
                    this.weekDayDefaultChar,
                    '*',
                    '1/1',
                    `0/${this.state.minutes.minutes}`
                ];
                if (this.isCronFlavorQuartz) {
                    cron_parts.push(this.state.minutes.seconds);
                }
                break;
            case 'hourly':
                cron_parts = [
                    this.yearDefaultChar,
                    this.weekDayDefaultChar,
                    '*',
                    '1/1',
                    `0/${this.state.hourly.hours}`,
                    this.state.hourly.minutes
                ];
                if (this.isCronFlavorQuartz) {
                    cron_parts.push(this.state.hourly.seconds);
                }
                break;
            case 'daily':
                switch (this.state.daily.subTab) {
                    case 'everyDays':
                        cron_parts = [
                            this.yearDefaultChar,
                            this.weekDayDefaultChar,
                            '*',
                            `1/${this.state.daily.everyDays.days}`,
                            this.hourToCron(this.state.daily.everyDays.hours, this.state.daily.everyDays.hourType),
                            this.state.daily.everyDays.minutes
                        ];
                        if (this.isCronFlavorQuartz) {
                            cron_parts.push(this.state.daily.everyDays.seconds);
                        }
                        break;
                    case 'everyWeekDay':
                        cron_parts = [
                            this.yearDefaultChar,
                            'MON-FRI',
                            '*',
                            this.monthDayDefaultChar,
                            this.hourToCron(this.state.daily.everyWeekDay.hours, this.state.daily.everyWeekDay.hourType),
                            this.state.daily.everyWeekDay.minutes
                        ];
                        if (this.isCronFlavorQuartz) {
                            cron_parts.push(this.state.daily.everyWeekDay.seconds);
                        }
                        break;
                    default:
                        throw 'Invalid cron daily subtab selection';
                }
                break;
            case 'weekly':
                const days = this.selectOptions.days
                    .reduce((acc, day) => this.state.weekly[day] ? acc.concat([day]) : acc, [])
                    .join(',');
                cron_parts = [
                    this.yearDefaultChar,
                    days,
                    '*',
                    this.monthDayDefaultChar,
                    this.hourToCron(this.state.weekly.hours, this.state.weekly.hourType),
                    this.state.weekly.minutes,
                ];
                if (this.isCronFlavorQuartz) {
                    cron_parts.push(this.state.weekly.seconds);
                }
                break;
            case 'monthly':
                switch (this.state.monthly.subTab) {
                    case 'specificDay':
                        cron_parts = [
                            this.yearDefaultChar,
                            this.weekDayDefaultChar,
                            `1/${this.state.monthly.specificDay.months}`,
                            this.state.monthly.specificDay.day,
                            this.hourToCron(this.state.monthly.specificDay.hours, this.state.monthly.specificDay.hourType),
                            this.state.monthly.specificDay.minutes
                        ];
                        if (this.isCronFlavorQuartz) {
                            cron_parts.push(this.state.monthly.specificDay.seconds);
                        }
                        break;
                    case 'specificWeekDay':
                        cron_parts = [
                            this.yearDefaultChar,
                            `${this.state.monthly.specificWeekDay.day}${this.state.monthly.specificWeekDay.monthWeek}`,
                            `1/${this.state.monthly.specificWeekDay.months}`,
                            this.monthDayDefaultChar,
                            this.hourToCron(this.state.monthly.specificWeekDay.hours, this.state.monthly.specificWeekDay.hourType),
                            this.state.monthly.specificWeekDay.minutes
                        ];
                        if (this.isCronFlavorQuartz) {
                            cron_parts.push(this.state.monthly.specificWeekDay.seconds);
                        }
                        break;
                    default:
                        throw 'Invalid cron monthly subtab selection';
                }
                break;
            case 'yearly':
                switch (this.state.yearly.subTab) {
                    case 'specificMonthDay':
                        cron_parts = [
                            this.yearDefaultChar,
                            this.weekDayDefaultChar,
                            this.state.yearly.specificMonthDay.month,
                            this.state.yearly.specificMonthDay.day,
                            this.hourToCron(this.state.yearly.specificMonthDay.hours, this.state.yearly.specificMonthDay.hourType),
                            this.state.yearly.specificMonthDay.minutes
                        ];
                        if (this.isCronFlavorQuartz) {
                            cron_parts.push(this.state.yearly.specificMonthDay.seconds);
                        }
                        break;
                    case 'specificMonthWeek':
                        cron_parts = [
                            this.yearDefaultChar,
                            this.state.yearly.specificMonthWeek.monthWeek,
                            this.state.yearly.specificMonthWeek.day,
                            this.state.yearly.specificMonthWeek.month,
                            this.monthDayDefaultChar,
                            this.hourToCron(this.state.yearly.specificMonthWeek.hours, this.state.yearly.specificMonthWeek.hourType),
                            this.state.yearly.specificMonthWeek.minutes,
                        ];
                        if (this.isCronFlavorQuartz) {
                            cron_parts.push(this.state.yearly.specificMonthWeek.seconds);
                        }
                        break;
                    default:
                        throw 'Invalid cron yearly subtab selection';
                }
                break;
            case 'advanced':
                this.cron = this.state.advanced.expression;
                break;
            default:
                throw 'Invalid cron active tab selection';
        }
        // Normalize irrelivant /'s
        // https://serverfault.com/questions/583111/cron-expression-difference-between-0-1-1-1-and/583121#583121
        // cron_parts[0] = year (quartz -- blank otherwise)
        // cron_parts[1] = day of week
        // cron_parts[2] = month
        // cron_parts[3] = day of month
        // cron_parts[4] = hour
        // cron_parts[5] = minute
        // cron_parts[6] = second (quartz)
        [5, 4, 1].forEach((idx) => {
            if (cron_parts[idx] === '0/1') {
                cron_parts[idx] = '*';
            }
        });
        [2, 3].forEach((idx) => {
            if (cron_parts[idx] === '1/1') {
                cron_parts[idx] = '*';
            }
        });
        // Generate final string
        this.cron = cron_parts.reverse().join(' ').trim();
    }
    getAmPmHour(hour) {
        return this.options.use24HourTime ? hour : (hour + 11) % 12 + 1;
    }
    getHourType(hour) {
        return this.options.use24HourTime ? undefined : (hour >= 12 ? 'PM' : 'AM');
    }
    hourToCron(hour, hourType) {
        if (this.options.use24HourTime) {
            return hour;
        }
        else {
            return hourType === 'AM' ? (hour === 12 ? 0 : hour) : (hour === 12 ? 12 : hour + 12);
        }
    }
    handleModelChange(cron) {
        if (this.isDirty) {
            this.isDirty = false;
            return;
        }
        else {
            this.isDirty = false;
        }
        if (!this.cronIsValid(cron)) {
            if (this.isCronFlavorQuartz) {
                throw 'Invalid cron expression, there must be 6 or 7 segments';
            }
            if (this.isCronFlavorStandard) {
                throw 'Invalid cron expression, there must be 5 segments';
            }
        }
        var origCron = cron;
        if (cron.split(' ').length === 5 && this.isCronFlavorStandard) {
            cron = `0 ${cron} *`;
        }
        const [seconds, minutes, hours, dayOfMonth, month, dayOfWeek] = cron.split(' ');
        if (cron.match(/\d+ 0\/\d+ \* 1\/1 \* [\?\*] \*/)) {
            this.activeTab = 'minutes';
            this.state.minutes.minutes = parseInt(minutes.substring(2));
            this.state.minutes.seconds = parseInt(seconds);
        }
        else if (cron.match(/\d+ \d+ 0\/\d+ 1\/1 \* [\?\*] \*/)) {
            this.activeTab = 'hourly';
            this.state.hourly.hours = parseInt(hours.substring(2));
            this.state.hourly.minutes = parseInt(minutes);
            this.state.hourly.seconds = parseInt(seconds);
        }
        else if (cron.match(/\d+ \d+ \d+ 1\/\d+ \* [\?\*] \*/)) {
            this.activeTab = 'daily';
            this.state.daily.subTab = 'everyDays';
            this.state.daily.everyDays.days = parseInt(dayOfMonth.substring(2));
            const parsedHours = parseInt(hours);
            this.state.daily.everyDays.hours = this.getAmPmHour(parsedHours);
            this.state.daily.everyDays.hourType = this.getHourType(parsedHours);
            this.state.daily.everyDays.minutes = parseInt(minutes);
            this.state.daily.everyDays.seconds = parseInt(seconds);
        }
        else if (cron.match(/\d+ \d+ \d+ [\?\*] \* MON-FRI \*/)) {
            this.activeTab = 'daily';
            this.state.daily.subTab = 'everyWeekDay';
            const parsedHours = parseInt(hours);
            this.state.daily.everyWeekDay.hours = this.getAmPmHour(parsedHours);
            this.state.daily.everyWeekDay.hourType = this.getHourType(parsedHours);
            this.state.daily.everyWeekDay.minutes = parseInt(minutes);
            this.state.daily.everyWeekDay.seconds = parseInt(seconds);
        }
        else if (cron.match(/\d+ \d+ \d+ [\?\*] \* (MON|TUE|WED|THU|FRI|SAT|SUN)(,(MON|TUE|WED|THU|FRI|SAT|SUN))* \*/)) {
            this.activeTab = 'weekly';
            this.selectOptions.days.forEach(weekDay => this.state.weekly[weekDay] = false);
            dayOfWeek.split(',').forEach(weekDay => this.state.weekly[weekDay] = true);
            const parsedHours = parseInt(hours);
            this.state.weekly.hours = this.getAmPmHour(parsedHours);
            this.state.weekly.hourType = this.getHourType(parsedHours);
            this.state.weekly.minutes = parseInt(minutes);
            this.state.weekly.seconds = parseInt(seconds);
        }
        else if (cron.match(/\d+ \d+ \d+ (\d+|L|LW|1W) 1\/\d+ [\?\*] \*/)) {
            this.activeTab = 'monthly';
            this.state.monthly.subTab = 'specificDay';
            this.state.monthly.specificDay.day = dayOfMonth;
            this.state.monthly.specificDay.months = parseInt(month.substring(2));
            const parsedHours = parseInt(hours);
            this.state.monthly.specificDay.hours = this.getAmPmHour(parsedHours);
            this.state.monthly.specificDay.hourType = this.getHourType(parsedHours);
            this.state.monthly.specificDay.minutes = parseInt(minutes);
            this.state.monthly.specificDay.seconds = parseInt(seconds);
        }
        else if (cron.match(/\d+ \d+ \d+ [\?\*] 1\/\d+ (MON|TUE|WED|THU|FRI|SAT|SUN)((#[1-5])|L) \*/)) {
            const day = dayOfWeek.substr(0, 3);
            const monthWeek = dayOfWeek.substr(3);
            this.activeTab = 'monthly';
            this.state.monthly.subTab = 'specificWeekDay';
            this.state.monthly.specificWeekDay.monthWeek = monthWeek;
            this.state.monthly.specificWeekDay.day = day;
            this.state.monthly.specificWeekDay.months = parseInt(month.substring(2));
            const parsedHours = parseInt(hours);
            this.state.monthly.specificWeekDay.hours = this.getAmPmHour(parsedHours);
            this.state.monthly.specificWeekDay.hourType = this.getHourType(parsedHours);
            this.state.monthly.specificWeekDay.minutes = parseInt(minutes);
            this.state.monthly.specificWeekDay.seconds = parseInt(seconds);
        }
        else if (cron.match(/\d+ \d+ \d+ (\d+|L|LW|1W) \d+ [\?\*] \*/)) {
            this.activeTab = 'yearly';
            this.state.yearly.subTab = 'specificMonthDay';
            this.state.yearly.specificMonthDay.month = parseInt(month);
            this.state.yearly.specificMonthDay.day = dayOfMonth;
            const parsedHours = parseInt(hours);
            this.state.yearly.specificMonthDay.hours = this.getAmPmHour(parsedHours);
            this.state.yearly.specificMonthDay.hourType = this.getHourType(parsedHours);
            this.state.yearly.specificMonthDay.minutes = parseInt(minutes);
            this.state.yearly.specificMonthDay.seconds = parseInt(seconds);
        }
        else if (cron.match(/\d+ \d+ \d+ [\?\*] \d+ (MON|TUE|WED|THU|FRI|SAT|SUN)((#[1-5])|L) \*/)) {
            const day = dayOfWeek.substr(0, 3);
            const monthWeek = dayOfWeek.substr(3);
            this.activeTab = 'yearly';
            this.state.yearly.subTab = 'specificMonthWeek';
            this.state.yearly.specificMonthWeek.monthWeek = monthWeek;
            this.state.yearly.specificMonthWeek.day = day;
            this.state.yearly.specificMonthWeek.month = parseInt(month);
            const parsedHours = parseInt(hours);
            this.state.yearly.specificMonthWeek.hours = this.getAmPmHour(parsedHours);
            this.state.yearly.specificMonthWeek.hourType = this.getHourType(parsedHours);
            this.state.yearly.specificMonthWeek.minutes = parseInt(minutes);
            this.state.yearly.specificMonthWeek.seconds = parseInt(seconds);
        }
        else {
            this.activeTab = 'advanced';
            this.state.advanced.expression = origCron;
        }
    }
    cronIsValid(cron) {
        if (cron) {
            const cronParts = cron.split(' ');
            return (this.isCronFlavorQuartz && (cronParts.length === 6 || cronParts.length === 7) || (this.isCronFlavorStandard && cronParts.length === 5));
        }
        return false;
    }
    getDefaultState() {
        const [defaultHours, defaultMinutes, defaultSeconds] = this.options.defaultTime.split(':').map(Number);
        return {
            minutes: {
                minutes: 1,
                seconds: 0
            },
            hourly: {
                hours: 1,
                minutes: 0,
                seconds: 0
            },
            daily: {
                subTab: 'everyDays',
                everyDays: {
                    days: 1,
                    hours: this.getAmPmHour(defaultHours),
                    minutes: defaultMinutes,
                    seconds: defaultSeconds,
                    hourType: this.getHourType(defaultHours)
                },
                everyWeekDay: {
                    hours: this.getAmPmHour(defaultHours),
                    minutes: defaultMinutes,
                    seconds: defaultSeconds,
                    hourType: this.getHourType(defaultHours)
                }
            },
            weekly: {
                MON: true,
                TUE: false,
                WED: false,
                THU: false,
                FRI: false,
                SAT: false,
                SUN: false,
                hours: this.getAmPmHour(defaultHours),
                minutes: defaultMinutes,
                seconds: defaultSeconds,
                hourType: this.getHourType(defaultHours)
            },
            monthly: {
                subTab: 'specificDay',
                specificDay: {
                    day: '1',
                    months: 1,
                    hours: this.getAmPmHour(defaultHours),
                    minutes: defaultMinutes,
                    seconds: defaultSeconds,
                    hourType: this.getHourType(defaultHours)
                },
                specificWeekDay: {
                    monthWeek: '#1',
                    day: 'MON',
                    months: 1,
                    hours: this.getAmPmHour(defaultHours),
                    minutes: defaultMinutes,
                    seconds: defaultSeconds,
                    hourType: this.getHourType(defaultHours)
                }
            },
            yearly: {
                subTab: 'specificMonthDay',
                specificMonthDay: {
                    month: 1,
                    day: '1',
                    hours: this.getAmPmHour(defaultHours),
                    minutes: defaultMinutes,
                    seconds: defaultSeconds,
                    hourType: this.getHourType(defaultHours)
                },
                specificMonthWeek: {
                    monthWeek: '#1',
                    day: 'MON',
                    month: 1,
                    hours: this.getAmPmHour(defaultHours),
                    minutes: defaultMinutes,
                    seconds: defaultSeconds,
                    hourType: this.getHourType(defaultHours)
                }
            },
            advanced: {
                expression: this.isCronFlavorQuartz ? '0 15 10 L-2 * ? *' : '15 10 2 * *'
            }
        };
    }
    getOrdinalSuffix(value) {
        if (value.length > 1) {
            const secondToLastDigit = value.charAt(value.length - 2);
            if (secondToLastDigit === '1') {
                return 'th';
            }
        }
        const lastDigit = value.charAt(value.length - 1);
        switch (lastDigit) {
            case '1':
                return 'st';
            case '2':
                return 'nd';
            case '3':
                return 'rd';
            default:
                return 'th';
        }
    }
    getSelectOptions() {
        return {
            months: this.getRange(1, 12),
            monthWeeks: ['#1', '#2', '#3', '#4', '#5', 'L'],
            days: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
            minutes: this.getRange(0, 59),
            fullMinutes: this.getRange(0, 59),
            seconds: this.getRange(0, 59),
            hours: this.getRange(1, 23),
            monthDays: this.getRange(1, 31),
            monthDaysWithLasts: ['1W', ...[...this.getRange(1, 31).map(String)], 'LW', 'L'],
            monthDaysWithOutLasts: [...[...this.getRange(1, 31).map(String)]],
            hourTypes: ['AM', 'PM']
        };
    }
    getRange(start, end) {
        const length = end - start + 1;
        return Array.apply(null, Array(length)).map((_, i) => i + start);
    }
}
CronGenComponent.decorators = [
    { type: Component, args: [{
                selector: 'cron-editor',
                template: "<div class=\"card cron-editor-main\">\r\n\r\n  <div class=\"card-header\">\r\n    <!-- Tabs -->\r\n    <mat-tab-group [(selectedIndex)]=\"selectedTabIndex\">\r\n      <mat-tab label=\"Minutes\" *ngIf=\"!options.hideMinutesTab\">\r\n        <div class=\"\">\r\n          Every\r\n          <mat-form-field>\r\n            <mat-select class=\"minutes\" [disabled]=\"disabled || activeTab !== 'minutes'\" (selectionChange)=\"regenerateCron()\"\r\n              [(ngModel)]=\"state.minutes.minutes\" [ngClass]=\"options.formSelectClass\">\r\n              <mat-option *ngFor=\"let minute of selectOptions.minutes\" [value]=\"minute\">\r\n                {{minute}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field>minute(s)\r\n          <span *ngIf=\"!options.hideSeconds && isCronFlavorQuartz\">on second</span>\r\n          <mat-form-field *ngIf=\"!options.hideSeconds && isCronFlavorQuartz\">\r\n            <mat-select class=\"seconds\" [disabled]=\"disabled || activeTab !== 'minutes'\" (selectionChange)=\"regenerateCron()\"\r\n              [(ngModel)]=\"state.minutes.seconds\" [ngClass]=\"options.formSelectClass\">\r\n              <mat-option *ngFor=\"let second of selectOptions.seconds\" [value]=\"second\">\r\n                {{second}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field>\r\n        </div>\r\n      </mat-tab>\r\n      <mat-tab label=\"Hourly\" *ngIf=\"!options.hideHourlyTab\">\r\n        <div class=\"\">\r\n          Every\r\n          <mat-form-field>\r\n            <mat-select class=\"hours\" [disabled]=\"disabled || activeTab !== 'hourly'\" (selectionChange)=\"regenerateCron()\"\r\n              [(ngModel)]=\"state.hourly.hours\" [ngClass]=\"options.formSelectClass\">\r\n              <mat-option *ngFor=\"let hour of selectOptions.hours\" [value]=\"hour\">\r\n                {{hour}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field> hour(s) on minute\r\n          <mat-form-field>\r\n            <mat-select class=\"minutes\" [disabled]=\"disabled || activeTab !== 'hourly'\" (selectionChange)=\"regenerateCron()\"\r\n              [(ngModel)]=\"state.hourly.minutes\" [ngClass]=\"options.formSelectClass\">\r\n              <mat-option *ngFor=\"let minute of selectOptions.fullMinutes\" [value]=\"minute\">\r\n                {{minute}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field>\r\n          <span *ngIf=\"!options.hideSeconds && isCronFlavorQuartz\">and second</span>\r\n          <mat-form-field *ngIf=\"!options.hideSeconds && isCronFlavorQuartz\">\r\n            <mat-select class=\"seconds\" [disabled]=\"disabled || activeTab !== 'hourly'\" (selectionChange)=\"regenerateCron()\"\r\n              [(ngModel)]=\"state.hourly.seconds\" [ngClass]=\"options.formSelectClass\">\r\n              <mat-option *ngFor=\"let second of selectOptions.seconds\" [value]=\"second\">\r\n                {{second}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field>\r\n        </div>\r\n      </mat-tab>\r\n      <mat-tab label=\"Daily\" *ngIf=\"!options.hideDailyTab\">\r\n        <div class=\"form-group\">\r\n          <mat-radio-group [(ngModel)]=\"state.daily.subTab\">\r\n            <mat-radio-button name=\"daily-radio\" value=\"everyDays\" [disabled]=\"disabled\" (change)=\"regenerateCron()\"\r\n              [ngClass]=\"state.formRadioClass\" checked=\"checked\">\r\n            </mat-radio-button>\r\n          </mat-radio-group>\r\n          <label>Every\r\n            <mat-form-field>\r\n              <mat-select class=\"days\" [disabled]=\"disabled || activeTab !== 'daily' || state.daily.subTab !== 'everyDays'\"\r\n                (selectionChange)=\"regenerateCron()\" [(ngModel)]=\"state.daily.everyDays.days\" [ngClass]=\"options.formSelectClass\">\r\n                <mat-option *ngFor=\"let monthDay of selectOptions.monthDays\" [value]=\"monthDay\">\r\n                  {{monthDay}}\r\n                </mat-option>\r\n              </mat-select>\r\n            </mat-form-field>\r\n          </label>&nbsp;\r\n          <label>day(s) at\r\n            <cron-time-picker [disabled]=\"disabled || activeTab !== 'daily' || state.daily.subTab !== 'everyDays'\"\r\n              (onChange)=\"regenerateCron()\" [(model)]=\"state.daily.everyDays\" [selectClass]=\"options.formSelectClass\"\r\n              [use24HourTime]=\"options.use24HourTime\" [hideSeconds]=\"options.hideSeconds|| !isCronFlavorQuartz\">\r\n            </cron-time-picker>\r\n          </label>\r\n        </div>\r\n\r\n        <div class=\"form-group\">\r\n          <mat-radio-group [(ngModel)]=\"state.daily.subTab\">\r\n            <mat-radio-button name=\"daily-radio\" value=\"everyWeekDay\" [disabled]=\"disabled\" (change)=\"regenerateCron()\"\r\n              [ngClass]=\"state.formRadioClass\">\r\n            </mat-radio-button>\r\n          </mat-radio-group>\r\n          Every working day at\r\n          <cron-time-picker [disabled]=\"disabled || activeTab !== 'daily' || state.daily.subTab !== 'everyWeekDay'\"\r\n            (onChange)=\"regenerateCron()\" [(model)]=\"state.daily.everyWeekDay\" [selectClass]=\"options.formSelectClass\"\r\n            [use24HourTime]=\"options.use24HourTime\" [hideSeconds]=\"options.hideSeconds || !isCronFlavorQuartz\">\r\n          </cron-time-picker>\r\n        </div>\r\n      </mat-tab>\r\n      <mat-tab label=\"Weekly\" *ngIf=\"!options.hideWeeklyTab\">\r\n        <div class=\"form-group\">\r\n          <div class=\"row\">\r\n            <div class=\"col-sm-6\">\r\n              <mat-checkbox [disabled]=\"disabled || activeTab !== 'weekly'\" (change)=\"regenerateCron()\" [(ngModel)]=\"state.weekly.MON\"\r\n                [ngClass]=\"options.formCheckboxClass\"> Monday</mat-checkbox>\r\n            </div>\r\n            <div class=\"col-sm-6\">\r\n              <mat-checkbox [disabled]=\"disabled || activeTab !== 'weekly'\" (change)=\"regenerateCron()\" [(ngModel)]=\"state.weekly.TUE\"\r\n                [ngClass]=\"options.formCheckboxClass\"> Tuesday</mat-checkbox>\r\n            </div>\r\n            <div class=\"col-sm-6\">\r\n              <mat-checkbox [disabled]=\"disabled || activeTab !== 'weekly'\" (change)=\"regenerateCron()\" [(ngModel)]=\"state.weekly.WED\"\r\n                [ngClass]=\"options.formCheckboxClass\"> Wednesday</mat-checkbox>\r\n            </div>\r\n            <div class=\"col-sm-6\">\r\n              <mat-checkbox [disabled]=\"disabled || activeTab !== 'weekly'\" (change)=\"regenerateCron()\" [(ngModel)]=\"state.weekly.THU\"\r\n                [ngClass]=\"options.formCheckboxClass\"> Thursday </mat-checkbox>\r\n            </div>\r\n            <div class=\"col-sm-6\">\r\n              <mat-checkbox [disabled]=\"disabled || activeTab !== 'weekly'\" (change)=\"regenerateCron()\" [(ngModel)]=\"state.weekly.FRI\"\r\n                [ngClass]=\"options.formCheckboxClass\"> Friday</mat-checkbox>\r\n            </div>\r\n            <div class=\"col-sm-6\">\r\n              <mat-checkbox type=\"checkbox\" [disabled]=\"disabled || activeTab !== 'weekly'\" (change)=\"regenerateCron()\"\r\n                [(ngModel)]=\"state.weekly.SAT\" [ngClass]=\"options.formCheckboxClass\"> Saturday</mat-checkbox>\r\n            </div>\r\n            <div class=\"col-sm-6\">\r\n              <mat-checkbox type=\"checkbox\" [disabled]=\"disabled || activeTab !== 'weekly'\" (change)=\"regenerateCron()\"\r\n                [(ngModel)]=\"state.weekly.SUN\" [ngClass]=\"options.formCheckboxClass\"> Sunday</mat-checkbox>\r\n            </div>\r\n          </div>\r\n          <div class=\"row\">\r\n            <div class=\"col-sm-6\">\r\n              at\r\n              <cron-time-picker [disabled]=\"disabled || activeTab !== 'weekly'\" (onChange)=\"regenerateCron()\" [(model)]=\"state.weekly\"\r\n                [selectClass]=\"options.formSelectClass\" [use24HourTime]=\"options.use24HourTime\" [hideSeconds]=\"options.hideSeconds|| !isCronFlavorQuartz\">\r\n              </cron-time-picker>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n      </mat-tab>\r\n      <mat-tab [label]=\"options.tMonthly || 'Monthly'\" *ngIf=\"!options.hideMonthlyTab\">\r\n        <div class=\"form-group\">\r\n          <mat-radio-group [(ngModel)]=\"state.monthly.subTab\">\r\n            <mat-radio-button name=\"monthly-radio\" value=\"specificDay\" [disabled]=\"disabled\" (change)=\"regenerateCron()\"\r\n                              [ngClass]=\"state.formRadioClass\">\r\n            </mat-radio-button>\r\n          </mat-radio-group>\r\n          {{options.tOnThe || 'On the'}} {{options.tDay}}\r\n          <mat-form-field *ngIf=\"isCronFlavorQuartz\">\r\n            <mat-select class=\"month-days\" [disabled]=\"disabled || activeTab !== 'monthly' || state.monthly.subTab !== 'specificDay'\"\r\n                        (selectionChange)=\"regenerateCron()\" [(ngModel)]=\"state.monthly.specificDay.day\" [ngClass]=\"options.formSelectClass\">\r\n              <mat-option *ngFor=\"let monthDaysWithLast of selectOptions.monthDaysWithLasts\" [value]=\"monthDaysWithLast\">\r\n                {{monthDayDisplay(monthDaysWithLast)}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field>\r\n\r\n          <mat-form-field *ngIf=\"isCronFlavorStandard\" style=\"width:50px\">\r\n            <mat-select class=\"month-days\" [disabled]=\"disabled || activeTab !== 'monthly' || state.monthly.subTab !== 'specificDay'\"\r\n                        (selectionChange)=\"regenerateCron()\" [(ngModel)]=\"state.monthly.specificDay.day\" [ngClass]=\"options.formSelectClass\">\r\n              <mat-option *ngFor=\"let monthDaysWithOutLast of selectOptions.monthDaysWithOutLasts\" [value]=\"monthDaysWithOutLast\">\r\n                {{monthDayDisplay(monthDaysWithOutLast)}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field>\r\n\r\n          {{options.tOfEvery || 'of every'}} \r\n          <mat-form-field style=\"width:50px\">\r\n            <mat-select class=\"months-small\" [disabled]=\"disabled || activeTab !== 'monthly' || state.monthly.subTab !== 'specificDay'\"\r\n                        (selectionChange)=\"regenerateCron()\" [(ngModel)]=\"state.monthly.specificDay.months\" [ngClass]=\"options.formSelectClass\">\r\n              <mat-option *ngFor=\"let month of selectOptions.months\" [value]=\"month\">\r\n                {{month}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field>\r\n          <span *ngIf=\"state.monthly.specificDay.months == 1\">{{options.tMonth || 'month'}} {{options.tAt || 'at'}}</span>\r\n          <span *ngIf=\"state.monthly.specificDay.months > 1\">{{options.tMonths || 'months'}} {{options.tAt || 'at'}}</span>\r\n\r\n          <cron-time-picker [disabled]=\"disabled || activeTab !== 'monthly' || state.monthly.subTab !== 'specificDay'\"\r\n                            (onChange)=\"regenerateCron()\" [(model)]=\"state.monthly.specificDay\" [selectClass]=\"options.formSelectClass\"\r\n                            [use24HourTime]=\"options.use24HourTime\" [hideSeconds]=\"options.hideSeconds || !isCronFlavorQuartz\">\r\n          </cron-time-picker>\r\n        </div>\r\n        <div class=\"\" *ngIf=\"!options.hideSpecificWeekDayTab\">\r\n          <mat-radio-group [(ngModel)]=\"state.monthly.subTab\">\r\n            <mat-radio-button name=\"monthly-radio\" value=\"specificWeekDay\" [disabled]=\"disabled\" (change)=\"regenerateCron()\"\r\n                              [ngClass]=\"state.formRadioClass\">\r\n            </mat-radio-button>\r\n          </mat-radio-group>\r\n          {{options.tOnThe ||  'On the'}}\r\n          <mat-form-field style=\"width:100px\">\r\n            <mat-select class=\"day-order-in-month\" [disabled]=\"disabled || activeTab !== 'monthly' || state.monthly.subTab !== 'specificWeekDay'\"\r\n                        (selectionChange)=\"regenerateCron()\" [(ngModel)]=\"state.monthly.specificWeekDay.monthWeek\" [ngClass]=\"options.formSelectClass\">\r\n              <mat-option *ngFor=\"let monthWeek of selectOptions.monthWeeks\" [value]=\"monthWeek\">\r\n                {{monthWeekDisplay(monthWeek)}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field>\r\n          {{options.tOf}}\r\n          <mat-form-field>\r\n            <mat-select class=\"week-days\" [disabled]=\"disabled || activeTab !== 'monthly' || state.monthly.subTab !== 'specificWeekDay'\"\r\n                        (selectionChange)=\"regenerateCron()\" [(ngModel)]=\"state.monthly.specificWeekDay.day\" [ngClass]=\"options.formSelectClass\">\r\n              <mat-option *ngFor=\"let day of selectOptions.days\" [value]=\"day\">\r\n                {{dayDisplay(day)}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field>\r\n          {{options.tOfEvery ||  'of every'}}\r\n          <mat-form-field style=\"width:50px\">\r\n            <mat-select class=\"months-small\" [disabled]=\"disabled || activeTab !== 'monthly' || state.monthly.subTab !== 'specificWeekDay'\"\r\n                        (selectionChange)=\"regenerateCron()\" [(ngModel)]=\"state.monthly.specificWeekDay.months\" [ngClass]=\"options.formSelectClass\">\r\n              <mat-option *ngFor=\"let month of selectOptions.months\" [value]=\"month\">\r\n                {{month}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field>\r\n          <span *ngIf=\"state.monthly.specificWeekDay.months == 1\">{{options.tMonth || 'month'}} {{options.tAt || 'at'}}</span>\r\n          <span *ngIf=\"state.monthly.specificWeekDay.months > 1\">{{options.tMonths || 'months'}} {{options.tAt || 'at'}}</span>\r\n          <cron-time-picker [disabled]=\"disabled || activeTab !== 'monthly' || state.monthly.subTab !== 'specificWeekDay'\"\r\n                            (onChange)=\"regenerateCron()\" [(model)]=\"state.monthly.specificWeekDay\" [selectClass]=\"options.formSelectClass\"\r\n                            [use24HourTime]=\"options.use24HourTime\" [hideSeconds]=\"options.hideSeconds || !isCronFlavorQuartz\">\r\n          </cron-time-picker>\r\n        </div>\r\n      </mat-tab>\r\n      <mat-tab [label]=\"options.tYearly || 'Yearly'\" *ngIf=\"!options.hideYearlyTab\">\r\n        <div class=\"form-group\">\r\n          <mat-radio-group [(ngModel)]=\"state.yearly.subTab\">\r\n            <mat-radio-button name=\"yearly-radio\" value=\"specificMonthDay\" [disabled]=\"disabled\" (change)=\"regenerateCron()\"\r\n                              [ngClass]=\"state.formRadioClass\">\r\n            </mat-radio-button>\r\n          </mat-radio-group>\r\n          {{ options.tEvery ||'Every'}}\r\n          <mat-form-field>\r\n            <mat-select class=\"months\" [disabled]=\"disabled || activeTab !== 'yearly' || state.yearly.subTab !== 'specificMonthDay'\"\r\n                        (selectionChange)=\"regenerateCron()\" [(ngModel)]=\"state.yearly.specificMonthDay.month\" [ngClass]=\"options.formSelectClass\">\r\n              <mat-option *ngFor=\"let month of selectOptions.months\" [value]=\"month\">\r\n                {{monthDisplay(month)}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field>\r\n          {{options.tOnThe2 || 'on the'}} {{options.tDay}}\r\n          <mat-form-field *ngIf=\"isCronFlavorQuartz\" class=\"month-days\">\r\n            <mat-select [disabled]=\"disabled || activeTab !== 'yearly' || state.yearly.subTab !== 'specificMonthDay'\"\r\n                        (selectionChange)=\"regenerateCron()\" [(ngModel)]=\"state.yearly.specificMonthDay.day\" [ngClass]=\"options.formSelectClass\">\r\n              <mat-option *ngFor=\"let monthDaysWithLast of selectOptions.monthDaysWithLasts\" [value]=\"monthDaysWithLast\">\r\n                {{monthDayDisplay(monthDaysWithLast)}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field>\r\n          <mat-form-field *ngIf=\"isCronFlavorStandard\">\r\n            <mat-select class=\"month-days\" [disabled]=\"disabled || activeTab !== 'yearly' || state.yearly.subTab !== 'specificMonthDay'\"\r\n                        (selectionChange)=\"regenerateCron()\" [(ngModel)]=\"state.yearly.specificMonthDay.day\" [ngClass]=\"options.formSelectClass\">\r\n              <mat-option *ngFor=\"let monthDaysWithOutLast of selectOptions.monthDaysWithOutLasts\" [value]=\"monthDaysWithOutLast\">\r\n                {{monthDayDisplay(monthDaysWithOutLast)}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field>\r\n          {{options.tAt || 'at'}}\r\n          <cron-time-picker [disabled]=\"disabled || activeTab !== 'yearly' || state.yearly.subTab !== 'specificMonthDay'\"\r\n                            (onChange)=\"regenerateCron()\" [(model)]=\"state.yearly.specificMonthDay\" [selectClass]=\"options.formSelectClass\"\r\n                            [use24HourTime]=\"options.use24HourTime\" [hideSeconds]=\"options.hideSeconds || !isCronFlavorQuartz\">\r\n          </cron-time-picker>\r\n        </div>\r\n        <div class=\"\" *ngIf=\"!options.hideSpecificMonthWeekTab\">\r\n          <mat-radio-group [(ngModel)]=\"state.yearly.subTab\">\r\n            <mat-radio-button name=\"yearly-radio\" value=\"specificMonthWeek\" [disabled]=\"disabled\" (change)=\"regenerateCron()\"\r\n                              [ngClass]=\"state.formRadioClass\">\r\n            </mat-radio-button>\r\n          </mat-radio-group>\r\n          {{options.tOnThe || 'On the'}}\r\n          <mat-form-field>\r\n            <mat-select class=\"day-order-in-month\" [disabled]=\"disabled || activeTab !== 'yearly' || state.yearly.subTab !== 'specificMonthWeek'\"\r\n                        (selectionChange)=\"regenerateCron()\" [(ngModel)]=\"state.yearly.specificMonthWeek.monthWeek\" [ngClass]=\"options.formSelectClass\">\r\n              <mat-option *ngFor=\"let monthWeek of selectOptions.monthWeeks\" [value]=\"monthWeek\">\r\n                {{monthWeekDisplay(monthWeek)}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field>\r\n          {{options.tOf}}\r\n          <mat-form-field>\r\n            <mat-select class=\"week-days\" [disabled]=\"disabled || activeTab !== 'yearly' || state.yearly.subTab !== 'specificMonthWeek'\"\r\n                        (selectionChange)=\"regenerateCron()\" [(ngModel)]=\"state.yearly.specificMonthWeek.day\" [ngClass]=\"options.formSelectClass\">\r\n              <mat-option *ngFor=\"let day of selectOptions.days\" [value]=\"day\">\r\n                {{dayDisplay(day)}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field>\r\n          {{options.tOf2 || 'of'}}\r\n          <mat-form-field>\r\n            <mat-select class=\"months\" [disabled]=\"disabled || activeTab !== 'yearly' || state.yearly.subTab !== 'specificMonthWeek'\"\r\n                        (selectionChange)=\"regenerateCron()\" [(ngModel)]=\"state.yearly.specificMonthWeek.month\" [ngClass]=\"options.formSelectClass\">\r\n              <mat-option *ngFor=\"let month of selectOptions.months\" [value]=\"month\">\r\n                {{monthDisplay(month)}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field>\r\n          {{options.tAt || 'at'}}\r\n          <cron-time-picker [disabled]=\"disabled || activeTab !== 'yearly' || state.yearly.subTab !== 'specificMonthWeek'\"\r\n                            (onChange)=\"regenerateCron()\" [(model)]=\"state.yearly.specificMonthWeek\" [selectClass]=\"options.formSelectClass\"\r\n                            [use24HourTime]=\"options.use24HourTime\" [hideSeconds]=\"options.hideSeconds || !isCronFlavorQuartz\">\r\n          </cron-time-picker>\r\n        </div>\r\n      </mat-tab>\r\n      <mat-tab label=\"Advanced\" *ngIf=\"!options.hideAdvancedTab\">\r\n        Cron Expression\r\n        <mat-form-field>\r\n          <input matInput type=\"text\" class=\"advanced-cron-editor-input\" ng-disabled=\"disabled || activeTab !== 'advanced'\"\r\n            (change)=\"regenerateCron()\" [(ngModel)]=\"state.advanced.expression\" [ngClass]=\"options.formInputClass\">\r\n        </mat-form-field>\r\n      </mat-tab>\r\n    </mat-tab-group>\r\n  </div>\r\n</div>\r\n",
                styles: [".cron-editor-main .cron-editor-container{margin-top:10px}.cron-editor-main .cron-editor-container .cron-editor-radio{display:inline-block;width:20px}.cron-editor-main .cron-editor-container .cron-editor-checkbox,.cron-editor-main .cron-editor-container .cron-editor-input,.cron-editor-main .cron-editor-container .cron-editor-select{display:inline-block}.cron-editor-main .cron-editor-container .well-time-wrapper{padding-left:20px}.cron-editor-main .cron-editor-container .inline-block{display:inline-block}.cron-editor-main .cron-editor-container .days,.cron-editor-main .cron-editor-container .hours,.cron-editor-main .cron-editor-container .minutes,.cron-editor-main .cron-editor-container .seconds{width:70px}.cron-editor-main .cron-editor-container .months{width:120px}.cron-editor-main .cron-editor-container .month-days{width:130px}.cron-editor-main .cron-editor-container .months-small{width:60px}.cron-editor-main .cron-editor-container .day-order-in-month{width:95px}.cron-editor-main .cron-editor-container .week-days{width:120px}.cron-editor-main .cron-editor-container .advanced-cron-editor-input{width:200px}.cron-editor-main .cron-editor-container .hour-types{width:70px}.nav-tabs li a{cursor:pointer}"]
            },] }
];
CronGenComponent.propDecorators = {
    disabled: [{ type: Input }],
    options: [{ type: Input }],
    cron: [{ type: Input }],
    cronChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Jvbi1lZGl0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC9jcm9uLWVkaXRvci9jcm9uLWVkaXRvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBb0MsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBR3ZHLE9BQU8sRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFPNUYsTUFBTSxPQUFPLGdCQUFnQjtJQUw3QjtRQVFVLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBaUI3Qiw0RUFBNEU7UUFDbEUsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbkMsa0JBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQWduQmpELENBQUM7SUEvbkJDLElBQWEsSUFBSTtRQUNmLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBRUQsSUFBSSxJQUFJLENBQUMsS0FBYTtRQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUV2QixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDdEM7SUFDSCxDQUFDO0lBV0QsOERBQThEO0lBQzlELHlDQUF5QztJQUNqQyxTQUFTO1FBQ2YsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBRWhCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRTtZQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3RCO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FB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OztZQTNvQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2dCQUN2Qiwwam9CQUEwQzs7YUFFM0M7Ozt1QkFNRSxLQUFLO3NCQUNMLEtBQUs7bUJBRUwsS0FBSzt5QkFhTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIE9uSW5pdCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBFdmVudEVtaXR0ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHtDcm9uT3B0aW9uc30gZnJvbSAnLi9Dcm9uT3B0aW9ucyc7XHJcbmltcG9ydCB7RGF5cywgTW9udGhXZWVrcywgTW9udGhzLE1vbnRoc1JPLCBDcm9uRmxhdm9yLCBNb250aFdlZWtzUk8sIERheXNST30gZnJvbSAnLi9lbnVtcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2Nyb24tZWRpdG9yJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY3Jvbi1lZGl0b3IudGVtcGxhdGUuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vY3Jvbi1lZGl0b3IuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDcm9uR2VuQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xyXG4gIHByaXZhdGUgX2FjdGl2ZVRhYjogc3RyaW5nO1xyXG4gIHByaXZhdGUgX3NlbGVjdGVkVGFiSW5kZXg6IG51bWJlcjtcclxuICBwcml2YXRlIF9pbml0aWFsaXppbmcgPSB0cnVlO1xyXG5cclxuICBASW5wdXQoKSBwdWJsaWMgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgcHVibGljIG9wdGlvbnM6IENyb25PcHRpb25zO1xyXG5cclxuICBASW5wdXQoKSBnZXQgY3JvbigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMubG9jYWxDcm9uO1xyXG4gIH1cclxuXHJcbiAgc2V0IGNyb24odmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5sb2NhbENyb24gPSB2YWx1ZTtcclxuXHJcbiAgICBpZiAoIXRoaXMuX2luaXRpYWxpemluZykge1xyXG4gICAgICB0aGlzLmNyb25DaGFuZ2UuZW1pdCh0aGlzLmxvY2FsQ3Jvbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyB0aGUgbmFtZSBpcyBhbiBBbmd1bGFyIGNvbnZlbnRpb24sIEBJbnB1dCB2YXJpYWJsZSBuYW1lICsgXCJDaGFuZ2VcIiBzdWZmaXhcclxuICBAT3V0cHV0KCkgY3JvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgcHVibGljIHNlbGVjdE9wdGlvbnMgPSB0aGlzLmdldFNlbGVjdE9wdGlvbnMoKTtcclxuICBwdWJsaWMgc3RhdGU6IGFueTtcclxuXHJcbiAgcHJpdmF0ZSBsb2NhbENyb246IHN0cmluZztcclxuICBwcml2YXRlIGlzRGlydHk6IGJvb2xlYW47XHJcblxyXG4gIC8vIEFuIG9yZGVyZWQgbGlzdCBvZiB0aGUgdGFicywgYmFzZWQgb24gd2hpY2ggb25lcyBhcmUgaGlkZGVuXHJcbiAgLy8gTXVzdCBjb3JyZXNwb25kIHRvIHRoZSBvcmRlciBpbiB0aGUgVUlcclxuICBwcml2YXRlIF90YWJzTGlzdCgpOiBzdHJpbmdbXSB7XHJcbiAgICBjb25zdCB0YWJzID0gW107XHJcblxyXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuaGlkZU1pbnV0ZXNUYWIpIHtcclxuICAgICAgdGFicy5wdXNoKCdtaW51dGVzJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuaGlkZUhvdXJseVRhYikge1xyXG4gICAgICB0YWJzLnB1c2goJ2hvdXJseScpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5vcHRpb25zLmhpZGVEYWlseVRhYikge1xyXG4gICAgICB0YWJzLnB1c2goJ2RhaWx5Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuaGlkZVdlZWtseVRhYikge1xyXG4gICAgICB0YWJzLnB1c2goJ3dlZWtseScpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5vcHRpb25zLmhpZGVNb250aGx5VGFiKSB7XHJcbiAgICAgIHRhYnMucHVzaCgnbW9udGhseScpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5vcHRpb25zLmhpZGVZZWFybHlUYWIpIHtcclxuICAgICAgdGFicy5wdXNoKCd5ZWFybHknKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMub3B0aW9ucy5oaWRlQWR2YW5jZWRUYWIpIHtcclxuICAgICAgdGFicy5wdXNoKCdhZHZhbmNlZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0YWJzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBzZWxlY3RlZFRhYkluZGV4KCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRUYWJJbmRleDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXQgc2VsZWN0ZWRUYWJJbmRleCh2YWw6IG51bWJlcikge1xyXG4gICAgdGhpcy5fc2VsZWN0ZWRUYWJJbmRleCA9IHZhbDtcclxuICAgIHRoaXMuX2FjdGl2ZVRhYiA9IHRoaXMuX3RhYnNMaXN0KClbdmFsXTtcclxuICAgIHRoaXMucmVnZW5lcmF0ZUNyb24oKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgYWN0aXZlVGFiKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlVGFiO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldCBhY3RpdmVUYWIodmFsOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2FjdGl2ZVRhYiA9IHZhbDtcclxuICAgIHRoaXMuX3NlbGVjdGVkVGFiSW5kZXggPSB0aGlzLl90YWJzTGlzdCgpLmluZGV4T2YodmFsKTtcclxuICAgIHRoaXMucmVnZW5lcmF0ZUNyb24oKTtcclxuICB9XHJcblxyXG4gIGdldCBpc0Nyb25GbGF2b3JRdWFydHooKSB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmNyb25GbGF2b3IgPT09IENyb25GbGF2b3IucXVhcnR6O1xyXG4gIH1cclxuXHJcbiAgZ2V0IGlzQ3JvbkZsYXZvclN0YW5kYXJkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5jcm9uRmxhdm9yID09PSBDcm9uRmxhdm9yLnN0YW5kYXJkO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHllYXJEZWZhdWx0Q2hhcigpIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuY3JvbkZsYXZvciA9PT0gQ3JvbkZsYXZvci5xdWFydHogPyAnKicgOiAnJztcclxuICB9XHJcblxyXG4gIGdldCB3ZWVrRGF5RGVmYXVsdENoYXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmNyb25GbGF2b3IgPT09IENyb25GbGF2b3IucXVhcnR6ID8gJz8nIDogJyonO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG1vbnRoRGF5RGVmYXVsdENoYXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmNyb25GbGF2b3IgPT09IENyb25GbGF2b3IucXVhcnR6ID8gJz8nIDogJyonO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIG5nT25Jbml0KCkge1xyXG4gICAgLy8gVGhpcyB3aWxsIGJlIGF1Z21lbnRlZCBiYXNlZCBvbiB0aGUgcGFyc2VkIGNyb25cclxuICAgIHRoaXMuc3RhdGUgPSB0aGlzLmdldERlZmF1bHRTdGF0ZSgpO1xyXG4gICAgdGhpcy5oYW5kbGVNb2RlbENoYW5nZSh0aGlzLmNyb24pO1xyXG5cclxuICAgIC8vIE1ha2Ugc3VyZSB3ZSBoYXZlIHNvbWV0aGluZyBzZWxlY3RlZFxyXG4gICAgaWYgKHRoaXMuX3NlbGVjdGVkVGFiSW5kZXggPT09IG51bGwgfHwgdGhpcy5fc2VsZWN0ZWRUYWJJbmRleCA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuc2VsZWN0ZWRUYWJJbmRleCA8IDApIHtcclxuICAgICAgLy8gRm9yY2UgdGhlIGZpcnN0IHRhYiBhcyBkZWZhdWx0XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRUYWJJbmRleCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZWdlbmVyYXRlQ3JvbigpO1xyXG4gICAgdGhpcy5faW5pdGlhbGl6aW5nID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgY29uc3QgbmV3Q3JvbiA9IGNoYW5nZXNbJ2Nyb24nXTtcclxuICAgIGlmIChuZXdDcm9uICYmICFuZXdDcm9uLmZpcnN0Q2hhbmdlKSB7XHJcbiAgICAgIHRoaXMuaGFuZGxlTW9kZWxDaGFuZ2UodGhpcy5jcm9uKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRBY3RpdmVUYWIodGFiOiBzdHJpbmcsIGV2ZW50OiBhbnkpIHtcclxuICAgIGV2ZW50OyAvLyBtYWtlcyB0aGUgY29tcGlsZXIgaGFwcHlcclxuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICB0aGlzLmFjdGl2ZVRhYiA9IHRhYjtcclxuICAgICAgdGhpcy5yZWdlbmVyYXRlQ3JvbigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGRheURpc3BsYXkoZGF5OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgdmFyIHIgPSBEYXlzW2RheV07XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLnRMYW5ndWFnZSA9PSAncm8nKVxyXG4gICAgICByID0gRGF5c1JPW2RheV07XHJcbiAgICByZXR1cm4gcjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBtb250aFdlZWtEaXNwbGF5KG1vbnRoV2Vla051bWJlcjogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIHZhciByID0gTW9udGhXZWVrc1ttb250aFdlZWtOdW1iZXJdO1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy50TGFuZ3VhZ2UgPT0gJ3JvJykge1xyXG4gICAgICByID0gTW9udGhXZWVrc1JPW21vbnRoV2Vla051bWJlcl07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBtb250aERpc3BsYXkobW9udGg6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICB2YXIgciA9IE1vbnRoc1ttb250aF07XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLnRMYW5ndWFnZSA9PSAncm8nKSB7XHJcbiAgICAgIHIgPSBNb250aHNST1ttb250aF07XHJcbiAgICB9ICAgIFxyXG4gICAgcmV0dXJuIHI7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbW9udGhEYXlEaXNwbGF5KG1vbnRoOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgaWYgKG1vbnRoID09PSAnTCcpIHtcclxuICAgICAgcmV0dXJuICdMYXN0IERheSc7XHJcbiAgICB9IGVsc2UgaWYgKG1vbnRoID09PSAnTFcnKSB7XHJcbiAgICAgIHJldHVybiAnTGFzdCBXZWVrZGF5JztcclxuICAgIH0gZWxzZSBpZiAobW9udGggPT09ICcxVycpIHtcclxuICAgICAgcmV0dXJuICdGaXJzdCBXZWVrZGF5JztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMudExhbmd1YWdlID09ICdybycpIHtcclxuICAgICAgICByZXR1cm4gbW9udGg7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGAke21vbnRofSR7dGhpcy5nZXRPcmRpbmFsU3VmZml4KG1vbnRoKX0gZGF5YDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlZ2VuZXJhdGVDcm9uKCkge1xyXG4gICAgdGhpcy5pc0RpcnR5ID0gdHJ1ZTtcclxuXHJcbiAgICAvLyBUaGlzIGlzIGNvbnN0cnVjdGVkIGluIHJldmVyc2Ugb3JkZXIgZnJvbSBzdGFuZGFyZDpcclxuICAgIC8vIGNyb25fcGFydHNbMF0gPSB5ZWFyIChxdWFydHogLS0gYmxhbmsgb3RoZXJ3aXNlKVxyXG4gICAgLy8gY3Jvbl9wYXJ0c1sxXSA9IGRheSBvZiB3ZWVrXHJcbiAgICAvLyBjcm9uX3BhcnRzWzJdID0gbW9udGhcclxuICAgIC8vIGNyb25fcGFydHNbM10gPSBkYXkgb2YgbW9udGhcclxuICAgIC8vIGNyb25fcGFydHNbNF0gPSBob3VyXHJcbiAgICAvLyBjcm9uX3BhcnRzWzVdID0gbWludXRlXHJcbiAgICAvLyBjcm9uX3BhcnRzWzZdID0gc2Vjb25kIChxdWFydHopXHJcbiAgICBsZXQgY3Jvbl9wYXJ0czogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICBzd2l0Y2ggKHRoaXMuYWN0aXZlVGFiKSB7XHJcbiAgICAgIGNhc2UgJ21pbnV0ZXMnOlxyXG4gICAgICAgIGNyb25fcGFydHMgPSBbXHJcbiAgICAgICAgICB0aGlzLnllYXJEZWZhdWx0Q2hhcixcclxuICAgICAgICAgIHRoaXMud2Vla0RheURlZmF1bHRDaGFyLFxyXG4gICAgICAgICAgJyonLFxyXG4gICAgICAgICAgJzEvMScsXHJcbiAgICAgICAgICBgMC8ke3RoaXMuc3RhdGUubWludXRlcy5taW51dGVzfWBcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pc0Nyb25GbGF2b3JRdWFydHopIHtcclxuICAgICAgICAgIGNyb25fcGFydHMucHVzaCh0aGlzLnN0YXRlLm1pbnV0ZXMuc2Vjb25kcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnaG91cmx5JzpcclxuICAgICAgICBjcm9uX3BhcnRzID0gW1xyXG4gICAgICAgICAgdGhpcy55ZWFyRGVmYXVsdENoYXIsXHJcbiAgICAgICAgICB0aGlzLndlZWtEYXlEZWZhdWx0Q2hhcixcclxuICAgICAgICAgICcqJyxcclxuICAgICAgICAgICcxLzEnLFxyXG4gICAgICAgICAgYDAvJHt0aGlzLnN0YXRlLmhvdXJseS5ob3Vyc31gLFxyXG4gICAgICAgICAgdGhpcy5zdGF0ZS5ob3VybHkubWludXRlc1xyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzQ3JvbkZsYXZvclF1YXJ0eikge1xyXG4gICAgICAgICAgY3Jvbl9wYXJ0cy5wdXNoKHRoaXMuc3RhdGUuaG91cmx5LnNlY29uZHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2RhaWx5JzpcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUuZGFpbHkuc3ViVGFiKSB7XHJcbiAgICAgICAgICBjYXNlICdldmVyeURheXMnOlxyXG4gICAgICAgICAgICBjcm9uX3BhcnRzID0gW1xyXG4gICAgICAgICAgICAgIHRoaXMueWVhckRlZmF1bHRDaGFyLFxyXG4gICAgICAgICAgICAgIHRoaXMud2Vla0RheURlZmF1bHRDaGFyLFxyXG4gICAgICAgICAgICAgICcqJyxcclxuICAgICAgICAgICAgICBgMS8ke3RoaXMuc3RhdGUuZGFpbHkuZXZlcnlEYXlzLmRheXN9YCxcclxuICAgICAgICAgICAgICB0aGlzLmhvdXJUb0Nyb24odGhpcy5zdGF0ZS5kYWlseS5ldmVyeURheXMuaG91cnMsIHRoaXMuc3RhdGUuZGFpbHkuZXZlcnlEYXlzLmhvdXJUeXBlKSxcclxuICAgICAgICAgICAgICB0aGlzLnN0YXRlLmRhaWx5LmV2ZXJ5RGF5cy5taW51dGVzXHJcbiAgICAgICAgICAgIF07XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0Nyb25GbGF2b3JRdWFydHopIHtcclxuICAgICAgICAgICAgICBjcm9uX3BhcnRzLnB1c2godGhpcy5zdGF0ZS5kYWlseS5ldmVyeURheXMuc2Vjb25kcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAnZXZlcnlXZWVrRGF5JzpcclxuICAgICAgICAgICAgY3Jvbl9wYXJ0cyA9IFtcclxuICAgICAgICAgICAgICB0aGlzLnllYXJEZWZhdWx0Q2hhcixcclxuICAgICAgICAgICAgICAnTU9OLUZSSScsXHJcbiAgICAgICAgICAgICAgJyonLFxyXG4gICAgICAgICAgICAgIHRoaXMubW9udGhEYXlEZWZhdWx0Q2hhcixcclxuICAgICAgICAgICAgICB0aGlzLmhvdXJUb0Nyb24odGhpcy5zdGF0ZS5kYWlseS5ldmVyeVdlZWtEYXkuaG91cnMsIHRoaXMuc3RhdGUuZGFpbHkuZXZlcnlXZWVrRGF5LmhvdXJUeXBlKSxcclxuICAgICAgICAgICAgICB0aGlzLnN0YXRlLmRhaWx5LmV2ZXJ5V2Vla0RheS5taW51dGVzXHJcbiAgICAgICAgICAgIF07XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0Nyb25GbGF2b3JRdWFydHopIHtcclxuICAgICAgICAgICAgICBjcm9uX3BhcnRzLnB1c2godGhpcy5zdGF0ZS5kYWlseS5ldmVyeVdlZWtEYXkuc2Vjb25kcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgdGhyb3cgJ0ludmFsaWQgY3JvbiBkYWlseSBzdWJ0YWIgc2VsZWN0aW9uJztcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3dlZWtseSc6XHJcbiAgICAgICAgY29uc3QgZGF5cyA9IHRoaXMuc2VsZWN0T3B0aW9ucy5kYXlzXHJcbiAgICAgICAgICAucmVkdWNlKChhY2MsIGRheSkgPT4gdGhpcy5zdGF0ZS53ZWVrbHlbZGF5XSA/IGFjYy5jb25jYXQoW2RheV0pIDogYWNjLCBbXSlcclxuICAgICAgICAgIC5qb2luKCcsJyk7XHJcblxyXG4gICAgICAgIGNyb25fcGFydHMgPSBbXHJcbiAgICAgICAgICB0aGlzLnllYXJEZWZhdWx0Q2hhcixcclxuICAgICAgICAgIGRheXMsXHJcbiAgICAgICAgICAnKicsXHJcbiAgICAgICAgICB0aGlzLm1vbnRoRGF5RGVmYXVsdENoYXIsXHJcbiAgICAgICAgICB0aGlzLmhvdXJUb0Nyb24odGhpcy5zdGF0ZS53ZWVrbHkuaG91cnMsIHRoaXMuc3RhdGUud2Vla2x5LmhvdXJUeXBlKSxcclxuICAgICAgICAgIHRoaXMuc3RhdGUud2Vla2x5Lm1pbnV0ZXMsXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNDcm9uRmxhdm9yUXVhcnR6KSB7XHJcbiAgICAgICAgICBjcm9uX3BhcnRzLnB1c2godGhpcy5zdGF0ZS53ZWVrbHkuc2Vjb25kcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnbW9udGhseSc6XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnN0YXRlLm1vbnRobHkuc3ViVGFiKSB7XHJcbiAgICAgICAgICBjYXNlICdzcGVjaWZpY0RheSc6XHJcbiAgICAgICAgICAgIGNyb25fcGFydHMgPSBbXHJcbiAgICAgICAgICAgICAgdGhpcy55ZWFyRGVmYXVsdENoYXIsXHJcbiAgICAgICAgICAgICAgdGhpcy53ZWVrRGF5RGVmYXVsdENoYXIsXHJcbiAgICAgICAgICAgICAgYDEvJHt0aGlzLnN0YXRlLm1vbnRobHkuc3BlY2lmaWNEYXkubW9udGhzfWAsXHJcbiAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5tb250aGx5LnNwZWNpZmljRGF5LmRheSxcclxuICAgICAgICAgICAgICB0aGlzLmhvdXJUb0Nyb24odGhpcy5zdGF0ZS5tb250aGx5LnNwZWNpZmljRGF5LmhvdXJzLCB0aGlzLnN0YXRlLm1vbnRobHkuc3BlY2lmaWNEYXkuaG91clR5cGUpLFxyXG4gICAgICAgICAgICAgIHRoaXMuc3RhdGUubW9udGhseS5zcGVjaWZpY0RheS5taW51dGVzXHJcbiAgICAgICAgICAgIF07XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0Nyb25GbGF2b3JRdWFydHopIHtcclxuICAgICAgICAgICAgICBjcm9uX3BhcnRzLnB1c2godGhpcy5zdGF0ZS5tb250aGx5LnNwZWNpZmljRGF5LnNlY29uZHMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgJ3NwZWNpZmljV2Vla0RheSc6XHJcbiAgICAgICAgICAgIGNyb25fcGFydHMgPSBbXHJcbiAgICAgICAgICAgICAgdGhpcy55ZWFyRGVmYXVsdENoYXIsXHJcbiAgICAgICAgICAgICAgYCR7dGhpcy5zdGF0ZS5tb250aGx5LnNwZWNpZmljV2Vla0RheS5kYXl9JHt0aGlzLnN0YXRlLm1vbnRobHkuc3BlY2lmaWNXZWVrRGF5Lm1vbnRoV2Vla31gLFxyXG4gICAgICAgICAgICAgIGAxLyR7dGhpcy5zdGF0ZS5tb250aGx5LnNwZWNpZmljV2Vla0RheS5tb250aHN9YCxcclxuICAgICAgICAgICAgICB0aGlzLm1vbnRoRGF5RGVmYXVsdENoYXIsXHJcbiAgICAgICAgICAgICAgdGhpcy5ob3VyVG9Dcm9uKHRoaXMuc3RhdGUubW9udGhseS5zcGVjaWZpY1dlZWtEYXkuaG91cnMsIHRoaXMuc3RhdGUubW9udGhseS5zcGVjaWZpY1dlZWtEYXkuaG91clR5cGUpLFxyXG4gICAgICAgICAgICAgIHRoaXMuc3RhdGUubW9udGhseS5zcGVjaWZpY1dlZWtEYXkubWludXRlc1xyXG4gICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNDcm9uRmxhdm9yUXVhcnR6KSB7XHJcbiAgICAgICAgICAgICAgY3Jvbl9wYXJ0cy5wdXNoKHRoaXMuc3RhdGUubW9udGhseS5zcGVjaWZpY1dlZWtEYXkuc2Vjb25kcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICB0aHJvdyAnSW52YWxpZCBjcm9uIG1vbnRobHkgc3VidGFiIHNlbGVjdGlvbic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd5ZWFybHknOlxyXG4gICAgICAgIHN3aXRjaCAodGhpcy5zdGF0ZS55ZWFybHkuc3ViVGFiKSB7XHJcbiAgICAgICAgICBjYXNlICdzcGVjaWZpY01vbnRoRGF5JzpcclxuICAgICAgICAgICAgY3Jvbl9wYXJ0cyA9IFtcclxuICAgICAgICAgICAgICB0aGlzLnllYXJEZWZhdWx0Q2hhcixcclxuICAgICAgICAgICAgICB0aGlzLndlZWtEYXlEZWZhdWx0Q2hhcixcclxuICAgICAgICAgICAgICB0aGlzLnN0YXRlLnllYXJseS5zcGVjaWZpY01vbnRoRGF5Lm1vbnRoLFxyXG4gICAgICAgICAgICAgIHRoaXMuc3RhdGUueWVhcmx5LnNwZWNpZmljTW9udGhEYXkuZGF5LFxyXG4gICAgICAgICAgICAgIHRoaXMuaG91clRvQ3Jvbih0aGlzLnN0YXRlLnllYXJseS5zcGVjaWZpY01vbnRoRGF5LmhvdXJzLCB0aGlzLnN0YXRlLnllYXJseS5zcGVjaWZpY01vbnRoRGF5LmhvdXJUeXBlKSxcclxuICAgICAgICAgICAgICB0aGlzLnN0YXRlLnllYXJseS5zcGVjaWZpY01vbnRoRGF5Lm1pbnV0ZXNcclxuICAgICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzQ3JvbkZsYXZvclF1YXJ0eikge1xyXG4gICAgICAgICAgICAgIGNyb25fcGFydHMucHVzaCh0aGlzLnN0YXRlLnllYXJseS5zcGVjaWZpY01vbnRoRGF5LnNlY29uZHMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgJ3NwZWNpZmljTW9udGhXZWVrJzpcclxuICAgICAgICAgICAgY3Jvbl9wYXJ0cyA9IFtcclxuICAgICAgICAgICAgICB0aGlzLnllYXJEZWZhdWx0Q2hhcixcclxuICAgICAgICAgICAgICB0aGlzLnN0YXRlLnllYXJseS5zcGVjaWZpY01vbnRoV2Vlay5tb250aFdlZWssXHJcbiAgICAgICAgICAgICAgdGhpcy5zdGF0ZS55ZWFybHkuc3BlY2lmaWNNb250aFdlZWsuZGF5LFxyXG4gICAgICAgICAgICAgIHRoaXMuc3RhdGUueWVhcmx5LnNwZWNpZmljTW9udGhXZWVrLm1vbnRoLFxyXG4gICAgICAgICAgICAgIHRoaXMubW9udGhEYXlEZWZhdWx0Q2hhcixcclxuICAgICAgICAgICAgICB0aGlzLmhvdXJUb0Nyb24odGhpcy5zdGF0ZS55ZWFybHkuc3BlY2lmaWNNb250aFdlZWsuaG91cnMsIHRoaXMuc3RhdGUueWVhcmx5LnNwZWNpZmljTW9udGhXZWVrLmhvdXJUeXBlKSxcclxuICAgICAgICAgICAgICB0aGlzLnN0YXRlLnllYXJseS5zcGVjaWZpY01vbnRoV2Vlay5taW51dGVzLFxyXG4gICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNDcm9uRmxhdm9yUXVhcnR6KSB7XHJcbiAgICAgICAgICAgICAgY3Jvbl9wYXJ0cy5wdXNoKHRoaXMuc3RhdGUueWVhcmx5LnNwZWNpZmljTW9udGhXZWVrLnNlY29uZHMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHRocm93ICdJbnZhbGlkIGNyb24geWVhcmx5IHN1YnRhYiBzZWxlY3Rpb24nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnYWR2YW5jZWQnOlxyXG4gICAgICAgIHRoaXMuY3JvbiA9IHRoaXMuc3RhdGUuYWR2YW5jZWQuZXhwcmVzc2lvbjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB0aHJvdyAnSW52YWxpZCBjcm9uIGFjdGl2ZSB0YWIgc2VsZWN0aW9uJztcclxuICAgIH1cclxuXHJcbiAgICAvLyBOb3JtYWxpemUgaXJyZWxpdmFudCAvJ3NcclxuICAgIC8vIGh0dHBzOi8vc2VydmVyZmF1bHQuY29tL3F1ZXN0aW9ucy81ODMxMTEvY3Jvbi1leHByZXNzaW9uLWRpZmZlcmVuY2UtYmV0d2Vlbi0wLTEtMS0xLWFuZC81ODMxMjEjNTgzMTIxXHJcbiAgICAvLyBjcm9uX3BhcnRzWzBdID0geWVhciAocXVhcnR6IC0tIGJsYW5rIG90aGVyd2lzZSlcclxuICAgIC8vIGNyb25fcGFydHNbMV0gPSBkYXkgb2Ygd2Vla1xyXG4gICAgLy8gY3Jvbl9wYXJ0c1syXSA9IG1vbnRoXHJcbiAgICAvLyBjcm9uX3BhcnRzWzNdID0gZGF5IG9mIG1vbnRoXHJcbiAgICAvLyBjcm9uX3BhcnRzWzRdID0gaG91clxyXG4gICAgLy8gY3Jvbl9wYXJ0c1s1XSA9IG1pbnV0ZVxyXG4gICAgLy8gY3Jvbl9wYXJ0c1s2XSA9IHNlY29uZCAocXVhcnR6KVxyXG4gICAgWzUsIDQsIDFdLmZvckVhY2goKGlkeCkgPT4ge1xyXG4gICAgICBpZiAoY3Jvbl9wYXJ0c1tpZHhdID09PSAnMC8xJykge1xyXG4gICAgICAgIGNyb25fcGFydHNbaWR4XSA9ICcqJztcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBbMiwgM10uZm9yRWFjaCgoaWR4KSA9PiB7XHJcbiAgICAgIGlmIChjcm9uX3BhcnRzW2lkeF0gPT09ICcxLzEnKSB7XHJcbiAgICAgICAgY3Jvbl9wYXJ0c1tpZHhdID0gJyonO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBHZW5lcmF0ZSBmaW5hbCBzdHJpbmdcclxuICAgIHRoaXMuY3JvbiA9IGNyb25fcGFydHMucmV2ZXJzZSgpLmpvaW4oJyAnKS50cmltKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldEFtUG1Ib3VyKGhvdXI6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy51c2UyNEhvdXJUaW1lID8gaG91ciA6IChob3VyICsgMTEpICUgMTIgKyAxO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRIb3VyVHlwZShob3VyOiBudW1iZXIpIHtcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMudXNlMjRIb3VyVGltZSA/IHVuZGVmaW5lZCA6IChob3VyID49IDEyID8gJ1BNJyA6ICdBTScpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBob3VyVG9Dcm9uKGhvdXI6IG51bWJlciwgaG91clR5cGU6IHN0cmluZykge1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy51c2UyNEhvdXJUaW1lKSB7XHJcbiAgICAgIHJldHVybiBob3VyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGhvdXJUeXBlID09PSAnQU0nID8gKGhvdXIgPT09IDEyID8gMCA6IGhvdXIpIDogKGhvdXIgPT09IDEyID8gMTIgOiBob3VyICsgMTIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVNb2RlbENoYW5nZShjcm9uOiBzdHJpbmcpIHtcclxuICAgIGlmICh0aGlzLmlzRGlydHkpIHtcclxuICAgICAgdGhpcy5pc0RpcnR5ID0gZmFsc2U7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaXNEaXJ0eSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5jcm9uSXNWYWxpZChjcm9uKSkge1xyXG4gICAgICBpZiAodGhpcy5pc0Nyb25GbGF2b3JRdWFydHopIHtcclxuICAgICAgICB0aHJvdyAnSW52YWxpZCBjcm9uIGV4cHJlc3Npb24sIHRoZXJlIG11c3QgYmUgNiBvciA3IHNlZ21lbnRzJztcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMuaXNDcm9uRmxhdm9yU3RhbmRhcmQpIHtcclxuICAgICAgICB0aHJvdyAnSW52YWxpZCBjcm9uIGV4cHJlc3Npb24sIHRoZXJlIG11c3QgYmUgNSBzZWdtZW50cyc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgb3JpZ0Nyb246IHN0cmluZyA9IGNyb247XHJcbiAgICBpZiAoY3Jvbi5zcGxpdCgnICcpLmxlbmd0aCA9PT0gNSAmJiB0aGlzLmlzQ3JvbkZsYXZvclN0YW5kYXJkKSB7XHJcbiAgICAgIGNyb24gPSBgMCAke2Nyb259ICpgO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IFtzZWNvbmRzLCBtaW51dGVzLCBob3VycywgZGF5T2ZNb250aCwgbW9udGgsIGRheU9mV2Vla10gPSBjcm9uLnNwbGl0KCcgJyk7XHJcblxyXG4gICAgaWYgKGNyb24ubWF0Y2goL1xcZCsgMFxcL1xcZCsgXFwqIDFcXC8xIFxcKiBbXFw/XFwqXSBcXCovKSkge1xyXG4gICAgICB0aGlzLmFjdGl2ZVRhYiA9ICdtaW51dGVzJztcclxuXHJcbiAgICAgIHRoaXMuc3RhdGUubWludXRlcy5taW51dGVzID0gcGFyc2VJbnQobWludXRlcy5zdWJzdHJpbmcoMikpO1xyXG4gICAgICB0aGlzLnN0YXRlLm1pbnV0ZXMuc2Vjb25kcyA9IHBhcnNlSW50KHNlY29uZHMpO1xyXG4gICAgfSBlbHNlIGlmIChjcm9uLm1hdGNoKC9cXGQrIFxcZCsgMFxcL1xcZCsgMVxcLzEgXFwqIFtcXD9cXCpdIFxcKi8pKSB7XHJcbiAgICAgIHRoaXMuYWN0aXZlVGFiID0gJ2hvdXJseSc7XHJcblxyXG4gICAgICB0aGlzLnN0YXRlLmhvdXJseS5ob3VycyA9IHBhcnNlSW50KGhvdXJzLnN1YnN0cmluZygyKSk7XHJcbiAgICAgIHRoaXMuc3RhdGUuaG91cmx5Lm1pbnV0ZXMgPSBwYXJzZUludChtaW51dGVzKTtcclxuICAgICAgdGhpcy5zdGF0ZS5ob3VybHkuc2Vjb25kcyA9IHBhcnNlSW50KHNlY29uZHMpO1xyXG4gICAgfSBlbHNlIGlmIChjcm9uLm1hdGNoKC9cXGQrIFxcZCsgXFxkKyAxXFwvXFxkKyBcXCogW1xcP1xcKl0gXFwqLykpIHtcclxuICAgICAgdGhpcy5hY3RpdmVUYWIgPSAnZGFpbHknO1xyXG5cclxuICAgICAgdGhpcy5zdGF0ZS5kYWlseS5zdWJUYWIgPSAnZXZlcnlEYXlzJztcclxuICAgICAgdGhpcy5zdGF0ZS5kYWlseS5ldmVyeURheXMuZGF5cyA9IHBhcnNlSW50KGRheU9mTW9udGguc3Vic3RyaW5nKDIpKTtcclxuICAgICAgY29uc3QgcGFyc2VkSG91cnMgPSBwYXJzZUludChob3Vycyk7XHJcbiAgICAgIHRoaXMuc3RhdGUuZGFpbHkuZXZlcnlEYXlzLmhvdXJzID0gdGhpcy5nZXRBbVBtSG91cihwYXJzZWRIb3Vycyk7XHJcbiAgICAgIHRoaXMuc3RhdGUuZGFpbHkuZXZlcnlEYXlzLmhvdXJUeXBlID0gdGhpcy5nZXRIb3VyVHlwZShwYXJzZWRIb3Vycyk7XHJcbiAgICAgIHRoaXMuc3RhdGUuZGFpbHkuZXZlcnlEYXlzLm1pbnV0ZXMgPSBwYXJzZUludChtaW51dGVzKTtcclxuICAgICAgdGhpcy5zdGF0ZS5kYWlseS5ldmVyeURheXMuc2Vjb25kcyA9IHBhcnNlSW50KHNlY29uZHMpO1xyXG4gICAgfSBlbHNlIGlmIChjcm9uLm1hdGNoKC9cXGQrIFxcZCsgXFxkKyBbXFw/XFwqXSBcXCogTU9OLUZSSSBcXCovKSkge1xyXG4gICAgICB0aGlzLmFjdGl2ZVRhYiA9ICdkYWlseSc7XHJcblxyXG4gICAgICB0aGlzLnN0YXRlLmRhaWx5LnN1YlRhYiA9ICdldmVyeVdlZWtEYXknO1xyXG4gICAgICBjb25zdCBwYXJzZWRIb3VycyA9IHBhcnNlSW50KGhvdXJzKTtcclxuICAgICAgdGhpcy5zdGF0ZS5kYWlseS5ldmVyeVdlZWtEYXkuaG91cnMgPSB0aGlzLmdldEFtUG1Ib3VyKHBhcnNlZEhvdXJzKTtcclxuICAgICAgdGhpcy5zdGF0ZS5kYWlseS5ldmVyeVdlZWtEYXkuaG91clR5cGUgPSB0aGlzLmdldEhvdXJUeXBlKHBhcnNlZEhvdXJzKTtcclxuICAgICAgdGhpcy5zdGF0ZS5kYWlseS5ldmVyeVdlZWtEYXkubWludXRlcyA9IHBhcnNlSW50KG1pbnV0ZXMpO1xyXG4gICAgICB0aGlzLnN0YXRlLmRhaWx5LmV2ZXJ5V2Vla0RheS5zZWNvbmRzID0gcGFyc2VJbnQoc2Vjb25kcyk7XHJcbiAgICB9IGVsc2UgaWYgKGNyb24ubWF0Y2goL1xcZCsgXFxkKyBcXGQrIFtcXD9cXCpdIFxcKiAoTU9OfFRVRXxXRUR8VEhVfEZSSXxTQVR8U1VOKSgsKE1PTnxUVUV8V0VEfFRIVXxGUkl8U0FUfFNVTikpKiBcXCovKSkge1xyXG4gICAgICB0aGlzLmFjdGl2ZVRhYiA9ICd3ZWVrbHknO1xyXG4gICAgICB0aGlzLnNlbGVjdE9wdGlvbnMuZGF5cy5mb3JFYWNoKHdlZWtEYXkgPT4gdGhpcy5zdGF0ZS53ZWVrbHlbd2Vla0RheV0gPSBmYWxzZSk7XHJcbiAgICAgIGRheU9mV2Vlay5zcGxpdCgnLCcpLmZvckVhY2god2Vla0RheSA9PiB0aGlzLnN0YXRlLndlZWtseVt3ZWVrRGF5XSA9IHRydWUpO1xyXG4gICAgICBjb25zdCBwYXJzZWRIb3VycyA9IHBhcnNlSW50KGhvdXJzKTtcclxuICAgICAgdGhpcy5zdGF0ZS53ZWVrbHkuaG91cnMgPSB0aGlzLmdldEFtUG1Ib3VyKHBhcnNlZEhvdXJzKTtcclxuICAgICAgdGhpcy5zdGF0ZS53ZWVrbHkuaG91clR5cGUgPSB0aGlzLmdldEhvdXJUeXBlKHBhcnNlZEhvdXJzKTtcclxuICAgICAgdGhpcy5zdGF0ZS53ZWVrbHkubWludXRlcyA9IHBhcnNlSW50KG1pbnV0ZXMpO1xyXG4gICAgICB0aGlzLnN0YXRlLndlZWtseS5zZWNvbmRzID0gcGFyc2VJbnQoc2Vjb25kcyk7XHJcbiAgICB9IGVsc2UgaWYgKGNyb24ubWF0Y2goL1xcZCsgXFxkKyBcXGQrIChcXGQrfEx8TFd8MVcpIDFcXC9cXGQrIFtcXD9cXCpdIFxcKi8pKSB7XHJcbiAgICAgIHRoaXMuYWN0aXZlVGFiID0gJ21vbnRobHknO1xyXG4gICAgICB0aGlzLnN0YXRlLm1vbnRobHkuc3ViVGFiID0gJ3NwZWNpZmljRGF5JztcclxuICAgICAgdGhpcy5zdGF0ZS5tb250aGx5LnNwZWNpZmljRGF5LmRheSA9IGRheU9mTW9udGg7XHJcbiAgICAgIHRoaXMuc3RhdGUubW9udGhseS5zcGVjaWZpY0RheS5tb250aHMgPSBwYXJzZUludChtb250aC5zdWJzdHJpbmcoMikpO1xyXG4gICAgICBjb25zdCBwYXJzZWRIb3VycyA9IHBhcnNlSW50KGhvdXJzKTtcclxuICAgICAgdGhpcy5zdGF0ZS5tb250aGx5LnNwZWNpZmljRGF5LmhvdXJzID0gdGhpcy5nZXRBbVBtSG91cihwYXJzZWRIb3Vycyk7XHJcbiAgICAgIHRoaXMuc3RhdGUubW9udGhseS5zcGVjaWZpY0RheS5ob3VyVHlwZSA9IHRoaXMuZ2V0SG91clR5cGUocGFyc2VkSG91cnMpO1xyXG4gICAgICB0aGlzLnN0YXRlLm1vbnRobHkuc3BlY2lmaWNEYXkubWludXRlcyA9IHBhcnNlSW50KG1pbnV0ZXMpO1xyXG4gICAgICB0aGlzLnN0YXRlLm1vbnRobHkuc3BlY2lmaWNEYXkuc2Vjb25kcyA9IHBhcnNlSW50KHNlY29uZHMpO1xyXG4gICAgfSBlbHNlIGlmIChjcm9uLm1hdGNoKC9cXGQrIFxcZCsgXFxkKyBbXFw/XFwqXSAxXFwvXFxkKyAoTU9OfFRVRXxXRUR8VEhVfEZSSXxTQVR8U1VOKSgoI1sxLTVdKXxMKSBcXCovKSkge1xyXG4gICAgICBjb25zdCBkYXkgPSBkYXlPZldlZWsuc3Vic3RyKDAsIDMpO1xyXG4gICAgICBjb25zdCBtb250aFdlZWsgPSBkYXlPZldlZWsuc3Vic3RyKDMpO1xyXG4gICAgICB0aGlzLmFjdGl2ZVRhYiA9ICdtb250aGx5JztcclxuICAgICAgdGhpcy5zdGF0ZS5tb250aGx5LnN1YlRhYiA9ICdzcGVjaWZpY1dlZWtEYXknO1xyXG4gICAgICB0aGlzLnN0YXRlLm1vbnRobHkuc3BlY2lmaWNXZWVrRGF5Lm1vbnRoV2VlayA9IG1vbnRoV2VlaztcclxuICAgICAgdGhpcy5zdGF0ZS5tb250aGx5LnNwZWNpZmljV2Vla0RheS5kYXkgPSBkYXk7XHJcbiAgICAgIHRoaXMuc3RhdGUubW9udGhseS5zcGVjaWZpY1dlZWtEYXkubW9udGhzID0gcGFyc2VJbnQobW9udGguc3Vic3RyaW5nKDIpKTtcclxuICAgICAgY29uc3QgcGFyc2VkSG91cnMgPSBwYXJzZUludChob3Vycyk7XHJcbiAgICAgIHRoaXMuc3RhdGUubW9udGhseS5zcGVjaWZpY1dlZWtEYXkuaG91cnMgPSB0aGlzLmdldEFtUG1Ib3VyKHBhcnNlZEhvdXJzKTtcclxuICAgICAgdGhpcy5zdGF0ZS5tb250aGx5LnNwZWNpZmljV2Vla0RheS5ob3VyVHlwZSA9IHRoaXMuZ2V0SG91clR5cGUocGFyc2VkSG91cnMpO1xyXG4gICAgICB0aGlzLnN0YXRlLm1vbnRobHkuc3BlY2lmaWNXZWVrRGF5Lm1pbnV0ZXMgPSBwYXJzZUludChtaW51dGVzKTtcclxuICAgICAgdGhpcy5zdGF0ZS5tb250aGx5LnNwZWNpZmljV2Vla0RheS5zZWNvbmRzID0gcGFyc2VJbnQoc2Vjb25kcyk7XHJcbiAgICB9IGVsc2UgaWYgKGNyb24ubWF0Y2goL1xcZCsgXFxkKyBcXGQrIChcXGQrfEx8TFd8MVcpIFxcZCsgW1xcP1xcKl0gXFwqLykpIHtcclxuICAgICAgdGhpcy5hY3RpdmVUYWIgPSAneWVhcmx5JztcclxuICAgICAgdGhpcy5zdGF0ZS55ZWFybHkuc3ViVGFiID0gJ3NwZWNpZmljTW9udGhEYXknO1xyXG4gICAgICB0aGlzLnN0YXRlLnllYXJseS5zcGVjaWZpY01vbnRoRGF5Lm1vbnRoID0gcGFyc2VJbnQobW9udGgpO1xyXG4gICAgICB0aGlzLnN0YXRlLnllYXJseS5zcGVjaWZpY01vbnRoRGF5LmRheSA9IGRheU9mTW9udGg7XHJcbiAgICAgIGNvbnN0IHBhcnNlZEhvdXJzID0gcGFyc2VJbnQoaG91cnMpO1xyXG4gICAgICB0aGlzLnN0YXRlLnllYXJseS5zcGVjaWZpY01vbnRoRGF5LmhvdXJzID0gdGhpcy5nZXRBbVBtSG91cihwYXJzZWRIb3Vycyk7XHJcbiAgICAgIHRoaXMuc3RhdGUueWVhcmx5LnNwZWNpZmljTW9udGhEYXkuaG91clR5cGUgPSB0aGlzLmdldEhvdXJUeXBlKHBhcnNlZEhvdXJzKTtcclxuICAgICAgdGhpcy5zdGF0ZS55ZWFybHkuc3BlY2lmaWNNb250aERheS5taW51dGVzID0gcGFyc2VJbnQobWludXRlcyk7XHJcbiAgICAgIHRoaXMuc3RhdGUueWVhcmx5LnNwZWNpZmljTW9udGhEYXkuc2Vjb25kcyA9IHBhcnNlSW50KHNlY29uZHMpO1xyXG4gICAgfSBlbHNlIGlmIChjcm9uLm1hdGNoKC9cXGQrIFxcZCsgXFxkKyBbXFw/XFwqXSBcXGQrIChNT058VFVFfFdFRHxUSFV8RlJJfFNBVHxTVU4pKCgjWzEtNV0pfEwpIFxcKi8pKSB7XHJcbiAgICAgIGNvbnN0IGRheSA9IGRheU9mV2Vlay5zdWJzdHIoMCwgMyk7XHJcbiAgICAgIGNvbnN0IG1vbnRoV2VlayA9IGRheU9mV2Vlay5zdWJzdHIoMyk7XHJcbiAgICAgIHRoaXMuYWN0aXZlVGFiID0gJ3llYXJseSc7XHJcbiAgICAgIHRoaXMuc3RhdGUueWVhcmx5LnN1YlRhYiA9ICdzcGVjaWZpY01vbnRoV2Vlayc7XHJcbiAgICAgIHRoaXMuc3RhdGUueWVhcmx5LnNwZWNpZmljTW9udGhXZWVrLm1vbnRoV2VlayA9IG1vbnRoV2VlaztcclxuICAgICAgdGhpcy5zdGF0ZS55ZWFybHkuc3BlY2lmaWNNb250aFdlZWsuZGF5ID0gZGF5O1xyXG4gICAgICB0aGlzLnN0YXRlLnllYXJseS5zcGVjaWZpY01vbnRoV2Vlay5tb250aCA9IHBhcnNlSW50KG1vbnRoKTtcclxuICAgICAgY29uc3QgcGFyc2VkSG91cnMgPSBwYXJzZUludChob3Vycyk7XHJcbiAgICAgIHRoaXMuc3RhdGUueWVhcmx5LnNwZWNpZmljTW9udGhXZWVrLmhvdXJzID0gdGhpcy5nZXRBbVBtSG91cihwYXJzZWRIb3Vycyk7XHJcbiAgICAgIHRoaXMuc3RhdGUueWVhcmx5LnNwZWNpZmljTW9udGhXZWVrLmhvdXJUeXBlID0gdGhpcy5nZXRIb3VyVHlwZShwYXJzZWRIb3Vycyk7XHJcbiAgICAgIHRoaXMuc3RhdGUueWVhcmx5LnNwZWNpZmljTW9udGhXZWVrLm1pbnV0ZXMgPSBwYXJzZUludChtaW51dGVzKTtcclxuICAgICAgdGhpcy5zdGF0ZS55ZWFybHkuc3BlY2lmaWNNb250aFdlZWsuc2Vjb25kcyA9IHBhcnNlSW50KHNlY29uZHMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5hY3RpdmVUYWIgPSAnYWR2YW5jZWQnO1xyXG4gICAgICB0aGlzLnN0YXRlLmFkdmFuY2VkLmV4cHJlc3Npb24gPSBvcmlnQ3JvbjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JvbklzVmFsaWQoY3Jvbjogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoY3Jvbikge1xyXG4gICAgICBjb25zdCBjcm9uUGFydHMgPSBjcm9uLnNwbGl0KCcgJyk7XHJcblxyXG4gICAgICByZXR1cm4gKHRoaXMuaXNDcm9uRmxhdm9yUXVhcnR6ICYmIChjcm9uUGFydHMubGVuZ3RoID09PSA2IHx8IGNyb25QYXJ0cy5sZW5ndGggPT09IDcpIHx8ICh0aGlzLmlzQ3JvbkZsYXZvclN0YW5kYXJkICYmIGNyb25QYXJ0cy5sZW5ndGggPT09IDUpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldERlZmF1bHRTdGF0ZSgpIHtcclxuICAgIGNvbnN0IFtkZWZhdWx0SG91cnMsIGRlZmF1bHRNaW51dGVzLCBkZWZhdWx0U2Vjb25kc10gPSB0aGlzLm9wdGlvbnMuZGVmYXVsdFRpbWUuc3BsaXQoJzonKS5tYXAoTnVtYmVyKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBtaW51dGVzOiB7XHJcbiAgICAgICAgbWludXRlczogMSxcclxuICAgICAgICBzZWNvbmRzOiAwXHJcbiAgICAgIH0sXHJcbiAgICAgIGhvdXJseToge1xyXG4gICAgICAgIGhvdXJzOiAxLFxyXG4gICAgICAgIG1pbnV0ZXM6IDAsXHJcbiAgICAgICAgc2Vjb25kczogMFxyXG4gICAgICB9LFxyXG4gICAgICBkYWlseToge1xyXG4gICAgICAgIHN1YlRhYjogJ2V2ZXJ5RGF5cycsXHJcbiAgICAgICAgZXZlcnlEYXlzOiB7XHJcbiAgICAgICAgICBkYXlzOiAxLFxyXG4gICAgICAgICAgaG91cnM6IHRoaXMuZ2V0QW1QbUhvdXIoZGVmYXVsdEhvdXJzKSxcclxuICAgICAgICAgIG1pbnV0ZXM6IGRlZmF1bHRNaW51dGVzLFxyXG4gICAgICAgICAgc2Vjb25kczogZGVmYXVsdFNlY29uZHMsXHJcbiAgICAgICAgICBob3VyVHlwZTogdGhpcy5nZXRIb3VyVHlwZShkZWZhdWx0SG91cnMpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBldmVyeVdlZWtEYXk6IHtcclxuICAgICAgICAgIGhvdXJzOiB0aGlzLmdldEFtUG1Ib3VyKGRlZmF1bHRIb3VycyksXHJcbiAgICAgICAgICBtaW51dGVzOiBkZWZhdWx0TWludXRlcyxcclxuICAgICAgICAgIHNlY29uZHM6IGRlZmF1bHRTZWNvbmRzLFxyXG4gICAgICAgICAgaG91clR5cGU6IHRoaXMuZ2V0SG91clR5cGUoZGVmYXVsdEhvdXJzKVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgd2Vla2x5OiB7XHJcbiAgICAgICAgTU9OOiB0cnVlLFxyXG4gICAgICAgIFRVRTogZmFsc2UsXHJcbiAgICAgICAgV0VEOiBmYWxzZSxcclxuICAgICAgICBUSFU6IGZhbHNlLFxyXG4gICAgICAgIEZSSTogZmFsc2UsXHJcbiAgICAgICAgU0FUOiBmYWxzZSxcclxuICAgICAgICBTVU46IGZhbHNlLFxyXG4gICAgICAgIGhvdXJzOiB0aGlzLmdldEFtUG1Ib3VyKGRlZmF1bHRIb3VycyksXHJcbiAgICAgICAgbWludXRlczogZGVmYXVsdE1pbnV0ZXMsXHJcbiAgICAgICAgc2Vjb25kczogZGVmYXVsdFNlY29uZHMsXHJcbiAgICAgICAgaG91clR5cGU6IHRoaXMuZ2V0SG91clR5cGUoZGVmYXVsdEhvdXJzKVxyXG4gICAgICB9LFxyXG4gICAgICBtb250aGx5OiB7XHJcbiAgICAgICAgc3ViVGFiOiAnc3BlY2lmaWNEYXknLFxyXG4gICAgICAgIHNwZWNpZmljRGF5OiB7XHJcbiAgICAgICAgICBkYXk6ICcxJyxcclxuICAgICAgICAgIG1vbnRoczogMSxcclxuICAgICAgICAgIGhvdXJzOiB0aGlzLmdldEFtUG1Ib3VyKGRlZmF1bHRIb3VycyksXHJcbiAgICAgICAgICBtaW51dGVzOiBkZWZhdWx0TWludXRlcyxcclxuICAgICAgICAgIHNlY29uZHM6IGRlZmF1bHRTZWNvbmRzLFxyXG4gICAgICAgICAgaG91clR5cGU6IHRoaXMuZ2V0SG91clR5cGUoZGVmYXVsdEhvdXJzKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3BlY2lmaWNXZWVrRGF5OiB7XHJcbiAgICAgICAgICBtb250aFdlZWs6ICcjMScsXHJcbiAgICAgICAgICBkYXk6ICdNT04nLFxyXG4gICAgICAgICAgbW9udGhzOiAxLFxyXG4gICAgICAgICAgaG91cnM6IHRoaXMuZ2V0QW1QbUhvdXIoZGVmYXVsdEhvdXJzKSxcclxuICAgICAgICAgIG1pbnV0ZXM6IGRlZmF1bHRNaW51dGVzLFxyXG4gICAgICAgICAgc2Vjb25kczogZGVmYXVsdFNlY29uZHMsXHJcbiAgICAgICAgICBob3VyVHlwZTogdGhpcy5nZXRIb3VyVHlwZShkZWZhdWx0SG91cnMpXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICB5ZWFybHk6IHtcclxuICAgICAgICBzdWJUYWI6ICdzcGVjaWZpY01vbnRoRGF5JyxcclxuICAgICAgICBzcGVjaWZpY01vbnRoRGF5OiB7XHJcbiAgICAgICAgICBtb250aDogMSxcclxuICAgICAgICAgIGRheTogJzEnLFxyXG4gICAgICAgICAgaG91cnM6IHRoaXMuZ2V0QW1QbUhvdXIoZGVmYXVsdEhvdXJzKSxcclxuICAgICAgICAgIG1pbnV0ZXM6IGRlZmF1bHRNaW51dGVzLFxyXG4gICAgICAgICAgc2Vjb25kczogZGVmYXVsdFNlY29uZHMsXHJcbiAgICAgICAgICBob3VyVHlwZTogdGhpcy5nZXRIb3VyVHlwZShkZWZhdWx0SG91cnMpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzcGVjaWZpY01vbnRoV2Vlazoge1xyXG4gICAgICAgICAgbW9udGhXZWVrOiAnIzEnLFxyXG4gICAgICAgICAgZGF5OiAnTU9OJyxcclxuICAgICAgICAgIG1vbnRoOiAxLFxyXG4gICAgICAgICAgaG91cnM6IHRoaXMuZ2V0QW1QbUhvdXIoZGVmYXVsdEhvdXJzKSxcclxuICAgICAgICAgIG1pbnV0ZXM6IGRlZmF1bHRNaW51dGVzLFxyXG4gICAgICAgICAgc2Vjb25kczogZGVmYXVsdFNlY29uZHMsXHJcbiAgICAgICAgICBob3VyVHlwZTogdGhpcy5nZXRIb3VyVHlwZShkZWZhdWx0SG91cnMpXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBhZHZhbmNlZDoge1xyXG4gICAgICAgIGV4cHJlc3Npb246IHRoaXMuaXNDcm9uRmxhdm9yUXVhcnR6ID8gJzAgMTUgMTAgTC0yICogPyAqJyA6ICcxNSAxMCAyICogKidcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0T3JkaW5hbFN1ZmZpeCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICBpZiAodmFsdWUubGVuZ3RoID4gMSkge1xyXG4gICAgICBjb25zdCBzZWNvbmRUb0xhc3REaWdpdCA9IHZhbHVlLmNoYXJBdCh2YWx1ZS5sZW5ndGggLSAyKTtcclxuICAgICAgaWYgKHNlY29uZFRvTGFzdERpZ2l0ID09PSAnMScpIHtcclxuICAgICAgICByZXR1cm4gJ3RoJztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGxhc3REaWdpdCA9IHZhbHVlLmNoYXJBdCh2YWx1ZS5sZW5ndGggLSAxKTtcclxuICAgIHN3aXRjaCAobGFzdERpZ2l0KSB7XHJcbiAgICAgIGNhc2UgJzEnOlxyXG4gICAgICAgIHJldHVybiAnc3QnO1xyXG4gICAgICBjYXNlICcyJzpcclxuICAgICAgICByZXR1cm4gJ25kJztcclxuICAgICAgY2FzZSAnMyc6XHJcbiAgICAgICAgcmV0dXJuICdyZCc7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuICd0aCc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFNlbGVjdE9wdGlvbnMoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBtb250aHM6IHRoaXMuZ2V0UmFuZ2UoMSwgMTIpLFxyXG4gICAgICBtb250aFdlZWtzOiBbJyMxJywgJyMyJywgJyMzJywgJyM0JywgJyM1JywgJ0wnXSxcclxuICAgICAgZGF5czogWydNT04nLCAnVFVFJywgJ1dFRCcsICdUSFUnLCAnRlJJJywgJ1NBVCcsICdTVU4nXSxcclxuICAgICAgbWludXRlczogdGhpcy5nZXRSYW5nZSgwLCA1OSksXHJcbiAgICAgIGZ1bGxNaW51dGVzOiB0aGlzLmdldFJhbmdlKDAsIDU5KSxcclxuICAgICAgc2Vjb25kczogdGhpcy5nZXRSYW5nZSgwLCA1OSksXHJcbiAgICAgIGhvdXJzOiB0aGlzLmdldFJhbmdlKDEsIDIzKSxcclxuICAgICAgbW9udGhEYXlzOiB0aGlzLmdldFJhbmdlKDEsIDMxKSxcclxuICAgICAgbW9udGhEYXlzV2l0aExhc3RzOiBbJzFXJywgLi4uWy4uLnRoaXMuZ2V0UmFuZ2UoMSwgMzEpLm1hcChTdHJpbmcpXSwgJ0xXJywgJ0wnXSxcclxuICAgICAgbW9udGhEYXlzV2l0aE91dExhc3RzOiBbLi4uWy4uLnRoaXMuZ2V0UmFuZ2UoMSwgMzEpLm1hcChTdHJpbmcpXV0sXHJcbiAgICAgIGhvdXJUeXBlczogWydBTScsICdQTSddXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRSYW5nZShzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlcik6IG51bWJlcltdIHtcclxuICAgIGNvbnN0IGxlbmd0aCA9IGVuZCAtIHN0YXJ0ICsgMTtcclxuICAgIHJldHVybiBBcnJheS5hcHBseShudWxsLCBBcnJheShsZW5ndGgpKS5tYXAoKF8sIGkpID0+IGkgKyBzdGFydCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==