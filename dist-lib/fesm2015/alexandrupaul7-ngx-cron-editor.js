import { __awaiter } from 'tslib';
import { EventEmitter, Component, Input, Output, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const Days = {
    'SUN': 'Sunday',
    'MON': 'Monday',
    'TUE': 'Tuesday',
    'WED': 'Wednesday',
    'THU': 'Thursday',
    'FRI': 'Friday',
    'SAT': 'Saturday'
};
const DaysRO = {
    'SUN': 'duminică',
    'MON': 'luni',
    'TUE': 'marți',
    'WED': 'miercuri',
    'THU': 'joi',
    'FRI': 'vineri',
    'SAT': 'sâmbătă'
};
const MonthWeeks = {
    '#1': 'First',
    '#2': 'Second',
    '#3': 'Third',
    '#4': 'Fourth',
    '#5': 'Fifth',
    'L': 'Last'
};
const MonthWeeksRO = {
    '#1': 'prima zi',
    '#2': 'a doua zi',
    '#3': 'a treia zi',
    '#4': 'a patra zi',
    '#5': 'a cincea zi',
    'L': 'ultima zi'
};
var Months;
(function (Months) {
    Months[Months["January"] = 1] = "January";
    Months[Months["February"] = 2] = "February";
    Months[Months["March"] = 3] = "March";
    Months[Months["April"] = 4] = "April";
    Months[Months["May"] = 5] = "May";
    Months[Months["June"] = 6] = "June";
    Months[Months["July"] = 7] = "July";
    Months[Months["August"] = 8] = "August";
    Months[Months["September"] = 9] = "September";
    Months[Months["October"] = 10] = "October";
    Months[Months["November"] = 11] = "November";
    Months[Months["December"] = 12] = "December";
})(Months || (Months = {}));
var MonthsRO;
(function (MonthsRO) {
    MonthsRO[MonthsRO["Ianuarie"] = 1] = "Ianuarie";
    MonthsRO[MonthsRO["Februarie"] = 2] = "Februarie";
    MonthsRO[MonthsRO["Martie"] = 3] = "Martie";
    MonthsRO[MonthsRO["Aprilie"] = 4] = "Aprilie";
    MonthsRO[MonthsRO["Mai"] = 5] = "Mai";
    MonthsRO[MonthsRO["Iunie"] = 6] = "Iunie";
    MonthsRO[MonthsRO["Iulie"] = 7] = "Iulie";
    MonthsRO[MonthsRO["August"] = 8] = "August";
    MonthsRO[MonthsRO["Septembrie"] = 9] = "Septembrie";
    MonthsRO[MonthsRO["Octombrie"] = 10] = "Octombrie";
    MonthsRO[MonthsRO["Noviembrie"] = 11] = "Noviembrie";
    MonthsRO[MonthsRO["Decembrie"] = 12] = "Decembrie";
})(MonthsRO || (MonthsRO = {}));
var CronFlavor;
(function (CronFlavor) {
    CronFlavor["quartz"] = "quartz";
    CronFlavor["standard"] = "standard";
})(CronFlavor || (CronFlavor = {}));

class CronGenComponent {
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

class TimePickerComponent {
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

class CronEditorModule {
}
CronEditorModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    MatTabsModule,
                    MatSelectModule,
                    MatFormFieldModule,
                    MatRadioModule,
                    MatCheckboxModule,
                    MatInputModule,
                    BrowserAnimationsModule
                ],
                exports: [
                    CronGenComponent,
                    TimePickerComponent
                ],
                declarations: [
                    CronGenComponent,
                    TimePickerComponent
                ]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { CronEditorModule, CronGenComponent, TimePickerComponent as ɵa };
//# sourceMappingURL=alexandrupaul7-ngx-cron-editor.js.map
