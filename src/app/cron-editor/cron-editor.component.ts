import {Component, Input, Output, OnInit, OnChanges, SimpleChanges, EventEmitter} from '@angular/core';

import {CronOptions} from './CronOptions';
import {Days, MonthWeeks, Months,MonthsRO, CronFlavor, MonthWeeksRO, DaysRO} from './enums';

@Component({
  selector: 'cron-editor',
  templateUrl: './cron-editor.template.html',
  styleUrls: ['./cron-editor.component.css']
})
export class CronGenComponent implements OnInit, OnChanges {
  private _activeTab: string;
  private _selectedTabIndex: number;
  private _initializing = true;

  @Input() public disabled: boolean;
  @Input() public options: CronOptions;

  @Input() get cron(): string {
    return this.localCron;
  }

  set cron(value: string) {
    this.localCron = value;

    if (!this._initializing) {
      this.cronChange.emit(this.localCron);
    }
  }

  // the name is an Angular convention, @Input variable name + "Change" suffix
  @Output() cronChange = new EventEmitter();

  public selectOptions = this.getSelectOptions();
  public state: any;

  private localCron: string;
  private isDirty: boolean;

  // An ordered list of the tabs, based on which ones are hidden
  // Must correspond to the order in the UI
  private _tabsList(): string[] {
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

  public get selectedTabIndex(): number {
    return this._selectedTabIndex;
  }

  public set selectedTabIndex(val: number) {
    this._selectedTabIndex = val;
    this._activeTab = this._tabsList()[val];
    this.regenerateCron();
  }

  public get activeTab(): string {
    return this._activeTab;
  }

  public set activeTab(val: string) {
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

  public async ngOnInit() {
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
  }

  public async ngOnChanges(changes: SimpleChanges) {
    const newCron = changes['cron'];
    if (newCron && !newCron.firstChange) {
      this.handleModelChange(this.cron);
    }
  }

  public setActiveTab(tab: string, event: any) {
    event; // makes the compiler happy
    if (!this.disabled) {
      this.activeTab = tab;
      this.regenerateCron();
    }
  }

  public dayDisplay(day: string): string {
    var r = Days[day];
    if (this.options.tLanguage == 'ro')
      r = DaysRO[day];
    return r;
  }

  public monthWeekDisplay(monthWeekNumber: number): string {
    var r = MonthWeeks[monthWeekNumber];
    if (this.options.tLanguage == 'ro') {
      r = MonthWeeksRO[monthWeekNumber];
    }
    return r;
  }

  public monthDisplay(month: number): string {
    var r = Months[month];
    if (this.options.tLanguage == 'ro') {
      r = MonthsRO[month];
    }    
    return r;
  }

  public monthDayDisplay(month: string): string {
    if (month === 'L') {
      return 'Last Day';
    } else if (month === 'LW') {
      return 'Last Weekday';
    } else if (month === '1W') {
      return 'First Weekday';
    } else {
      if (this.options.tLanguage == 'ro') {
        return month;
      }
      else {
        return `${month}${this.getOrdinalSuffix(month)} day`;
      }
    }
  }

  public regenerateCron() {
    this.isDirty = true;

    // This is constructed in reverse order from standard:
    // cron_parts[0] = year (quartz -- blank otherwise)
    // cron_parts[1] = day of week
    // cron_parts[2] = month
    // cron_parts[3] = day of month
    // cron_parts[4] = hour
    // cron_parts[5] = minute
    // cron_parts[6] = second (quartz)
    let cron_parts: string[] = [];

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

  private getAmPmHour(hour: number) {
    return this.options.use24HourTime ? hour : (hour + 11) % 12 + 1;
  }

  private getHourType(hour: number) {
    return this.options.use24HourTime ? undefined : (hour >= 12 ? 'PM' : 'AM');
  }

  private hourToCron(hour: number, hourType: string) {
    if (this.options.use24HourTime) {
      return hour;
    } else {
      return hourType === 'AM' ? (hour === 12 ? 0 : hour) : (hour === 12 ? 12 : hour + 12);
    }
  }

  private handleModelChange(cron: string) {
    if (this.isDirty) {
      this.isDirty = false;
      return;
    } else {
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

    var origCron: string = cron;
    if (cron.split(' ').length === 5 && this.isCronFlavorStandard) {
      cron = `0 ${cron} *`;
    }

    const [seconds, minutes, hours, dayOfMonth, month, dayOfWeek] = cron.split(' ');

    if (cron.match(/\d+ 0\/\d+ \* 1\/1 \* [\?\*] \*/)) {
      this.activeTab = 'minutes';

      this.state.minutes.minutes = parseInt(minutes.substring(2));
      this.state.minutes.seconds = parseInt(seconds);
    } else if (cron.match(/\d+ \d+ 0\/\d+ 1\/1 \* [\?\*] \*/)) {
      this.activeTab = 'hourly';

      this.state.hourly.hours = parseInt(hours.substring(2));
      this.state.hourly.minutes = parseInt(minutes);
      this.state.hourly.seconds = parseInt(seconds);
    } else if (cron.match(/\d+ \d+ \d+ 1\/\d+ \* [\?\*] \*/)) {
      this.activeTab = 'daily';

      this.state.daily.subTab = 'everyDays';
      this.state.daily.everyDays.days = parseInt(dayOfMonth.substring(2));
      const parsedHours = parseInt(hours);
      this.state.daily.everyDays.hours = this.getAmPmHour(parsedHours);
      this.state.daily.everyDays.hourType = this.getHourType(parsedHours);
      this.state.daily.everyDays.minutes = parseInt(minutes);
      this.state.daily.everyDays.seconds = parseInt(seconds);
    } else if (cron.match(/\d+ \d+ \d+ [\?\*] \* MON-FRI \*/)) {
      this.activeTab = 'daily';

      this.state.daily.subTab = 'everyWeekDay';
      const parsedHours = parseInt(hours);
      this.state.daily.everyWeekDay.hours = this.getAmPmHour(parsedHours);
      this.state.daily.everyWeekDay.hourType = this.getHourType(parsedHours);
      this.state.daily.everyWeekDay.minutes = parseInt(minutes);
      this.state.daily.everyWeekDay.seconds = parseInt(seconds);
    } else if (cron.match(/\d+ \d+ \d+ [\?\*] \* (MON|TUE|WED|THU|FRI|SAT|SUN)(,(MON|TUE|WED|THU|FRI|SAT|SUN))* \*/)) {
      this.activeTab = 'weekly';
      this.selectOptions.days.forEach(weekDay => this.state.weekly[weekDay] = false);
      dayOfWeek.split(',').forEach(weekDay => this.state.weekly[weekDay] = true);
      const parsedHours = parseInt(hours);
      this.state.weekly.hours = this.getAmPmHour(parsedHours);
      this.state.weekly.hourType = this.getHourType(parsedHours);
      this.state.weekly.minutes = parseInt(minutes);
      this.state.weekly.seconds = parseInt(seconds);
    } else if (cron.match(/\d+ \d+ \d+ (\d+|L|LW|1W) 1\/\d+ [\?\*] \*/)) {
      this.activeTab = 'monthly';
      this.state.monthly.subTab = 'specificDay';
      this.state.monthly.specificDay.day = dayOfMonth;
      this.state.monthly.specificDay.months = parseInt(month.substring(2));
      const parsedHours = parseInt(hours);
      this.state.monthly.specificDay.hours = this.getAmPmHour(parsedHours);
      this.state.monthly.specificDay.hourType = this.getHourType(parsedHours);
      this.state.monthly.specificDay.minutes = parseInt(minutes);
      this.state.monthly.specificDay.seconds = parseInt(seconds);
    } else if (cron.match(/\d+ \d+ \d+ [\?\*] 1\/\d+ (MON|TUE|WED|THU|FRI|SAT|SUN)((#[1-5])|L) \*/)) {
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
    } else if (cron.match(/\d+ \d+ \d+ (\d+|L|LW|1W) \d+ [\?\*] \*/)) {
      this.activeTab = 'yearly';
      this.state.yearly.subTab = 'specificMonthDay';
      this.state.yearly.specificMonthDay.month = parseInt(month);
      this.state.yearly.specificMonthDay.day = dayOfMonth;
      const parsedHours = parseInt(hours);
      this.state.yearly.specificMonthDay.hours = this.getAmPmHour(parsedHours);
      this.state.yearly.specificMonthDay.hourType = this.getHourType(parsedHours);
      this.state.yearly.specificMonthDay.minutes = parseInt(minutes);
      this.state.yearly.specificMonthDay.seconds = parseInt(seconds);
    } else if (cron.match(/\d+ \d+ \d+ [\?\*] \d+ (MON|TUE|WED|THU|FRI|SAT|SUN)((#[1-5])|L) \*/)) {
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
    } else {
      this.activeTab = 'advanced';
      this.state.advanced.expression = origCron;
    }
  }

  private cronIsValid(cron: string): boolean {
    if (cron) {
      const cronParts = cron.split(' ');

      return (this.isCronFlavorQuartz && (cronParts.length === 6 || cronParts.length === 7) || (this.isCronFlavorStandard && cronParts.length === 5));
    }

    return false;
  }

  private getDefaultState() {
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

  private getOrdinalSuffix(value: string) {
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

  private getSelectOptions() {
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

  private getRange(start: number, end: number): number[] {
    const length = end - start + 1;
    return Array.apply(null, Array(length)).map((_, i) => i + start);
  }
}
