(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common'), require('@angular/material/tabs'), require('@angular/material/select'), require('@angular/material/form-field'), require('@angular/material/radio'), require('@angular/material/checkbox'), require('@angular/material/input'), require('@angular/platform-browser/animations')) :
    typeof define === 'function' && define.amd ? define('@alexandrupaul7/ngx-cron-editor', ['exports', '@angular/core', '@angular/forms', '@angular/common', '@angular/material/tabs', '@angular/material/select', '@angular/material/form-field', '@angular/material/radio', '@angular/material/checkbox', '@angular/material/input', '@angular/platform-browser/animations'], factory) :
    (global = global || self, factory((global.alexandrupaul7 = global.alexandrupaul7 || {}, global.alexandrupaul7['ngx-cron-editor'] = {}), global.ng.core, global.ng.forms, global.ng.common, global.ng.material.tabs, global.ng.material.select, global.ng.material.formField, global.ng.material.radio, global.ng.material.checkbox, global.ng.material.input, global.ng.platformBrowser.animations));
}(this, (function (exports, core, forms, common, tabs, select, formField, radio, checkbox, input, animations) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, exports) {
        for (var p in m)
            if (p !== "default" && !exports.hasOwnProperty(p))
                __createBinding(exports, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (Object.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var Days = {
        'SUN': 'Sunday',
        'MON': 'Monday',
        'TUE': 'Tuesday',
        'WED': 'Wednesday',
        'THU': 'Thursday',
        'FRI': 'Friday',
        'SAT': 'Saturday'
    };
    var DaysRO = {
        'SUN': 'duminică',
        'MON': 'luni',
        'TUE': 'marți',
        'WED': 'miercuri',
        'THU': 'joi',
        'FRI': 'vineri',
        'SAT': 'sâmbătă'
    };
    var MonthWeeks = {
        '#1': 'First',
        '#2': 'Second',
        '#3': 'Third',
        '#4': 'Fourth',
        '#5': 'Fifth',
        'L': 'Last'
    };
    var MonthWeeksRO = {
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

    var CronGenComponent = /** @class */ (function () {
        function CronGenComponent() {
            this._initializing = true;
            // the name is an Angular convention, @Input variable name + "Change" suffix
            this.cronChange = new core.EventEmitter();
            this.selectOptions = this.getSelectOptions();
        }
        Object.defineProperty(CronGenComponent.prototype, "cron", {
            get: function () {
                return this.localCron;
            },
            set: function (value) {
                this.localCron = value;
                if (!this._initializing) {
                    this.cronChange.emit(this.localCron);
                }
            },
            enumerable: false,
            configurable: true
        });
        // An ordered list of the tabs, based on which ones are hidden
        // Must correspond to the order in the UI
        CronGenComponent.prototype._tabsList = function () {
            var tabs = [];
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
        };
        Object.defineProperty(CronGenComponent.prototype, "selectedTabIndex", {
            get: function () {
                return this._selectedTabIndex;
            },
            set: function (val) {
                this._selectedTabIndex = val;
                this._activeTab = this._tabsList()[val];
                this.regenerateCron();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CronGenComponent.prototype, "activeTab", {
            get: function () {
                return this._activeTab;
            },
            set: function (val) {
                this._activeTab = val;
                this._selectedTabIndex = this._tabsList().indexOf(val);
                this.regenerateCron();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CronGenComponent.prototype, "isCronFlavorQuartz", {
            get: function () {
                return this.options.cronFlavor === CronFlavor.quartz;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CronGenComponent.prototype, "isCronFlavorStandard", {
            get: function () {
                return this.options.cronFlavor === CronFlavor.standard;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CronGenComponent.prototype, "yearDefaultChar", {
            get: function () {
                return this.options.cronFlavor === CronFlavor.quartz ? '*' : '';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CronGenComponent.prototype, "weekDayDefaultChar", {
            get: function () {
                return this.options.cronFlavor === CronFlavor.quartz ? '?' : '*';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CronGenComponent.prototype, "monthDayDefaultChar", {
            get: function () {
                return this.options.cronFlavor === CronFlavor.quartz ? '?' : '*';
            },
            enumerable: false,
            configurable: true
        });
        CronGenComponent.prototype.ngOnInit = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
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
                    return [2 /*return*/];
                });
            });
        };
        CronGenComponent.prototype.ngOnChanges = function (changes) {
            return __awaiter(this, void 0, void 0, function () {
                var newCron;
                return __generator(this, function (_a) {
                    newCron = changes['cron'];
                    if (newCron && !newCron.firstChange) {
                        this.handleModelChange(this.cron);
                    }
                    return [2 /*return*/];
                });
            });
        };
        CronGenComponent.prototype.setActiveTab = function (tab, event) {
            event; // makes the compiler happy
            if (!this.disabled) {
                this.activeTab = tab;
                this.regenerateCron();
            }
        };
        CronGenComponent.prototype.dayDisplay = function (day) {
            var r = Days[day];
            if (this.options.tLanguage == 'ro')
                r = DaysRO[day];
            return r;
        };
        CronGenComponent.prototype.monthWeekDisplay = function (monthWeekNumber) {
            var r = MonthWeeks[monthWeekNumber];
            if (this.options.tLanguage == 'ro') {
                r = MonthWeeksRO[monthWeekNumber];
            }
            return r;
        };
        CronGenComponent.prototype.monthDisplay = function (month) {
            var r = Months[month];
            if (this.options.tLanguage == 'ro') {
                r = MonthsRO[month];
            }
            return r;
        };
        CronGenComponent.prototype.monthDayDisplay = function (month) {
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
                    return "" + month + this.getOrdinalSuffix(month) + " day";
                }
            }
        };
        CronGenComponent.prototype.regenerateCron = function () {
            var _this = this;
            this.isDirty = true;
            // This is constructed in reverse order from standard:
            // cron_parts[0] = year (quartz -- blank otherwise)
            // cron_parts[1] = day of week
            // cron_parts[2] = month
            // cron_parts[3] = day of month
            // cron_parts[4] = hour
            // cron_parts[5] = minute
            // cron_parts[6] = second (quartz)
            var cron_parts = [];
            switch (this.activeTab) {
                case 'minutes':
                    cron_parts = [
                        this.yearDefaultChar,
                        this.weekDayDefaultChar,
                        '*',
                        '1/1',
                        "0/" + this.state.minutes.minutes
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
                        "0/" + this.state.hourly.hours,
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
                                "1/" + this.state.daily.everyDays.days,
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
                    var days = this.selectOptions.days
                        .reduce(function (acc, day) { return _this.state.weekly[day] ? acc.concat([day]) : acc; }, [])
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
                                "1/" + this.state.monthly.specificDay.months,
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
                                "" + this.state.monthly.specificWeekDay.day + this.state.monthly.specificWeekDay.monthWeek,
                                "1/" + this.state.monthly.specificWeekDay.months,
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
            [5, 4, 1].forEach(function (idx) {
                if (cron_parts[idx] === '0/1') {
                    cron_parts[idx] = '*';
                }
            });
            [2, 3].forEach(function (idx) {
                if (cron_parts[idx] === '1/1') {
                    cron_parts[idx] = '*';
                }
            });
            // Generate final string
            this.cron = cron_parts.reverse().join(' ').trim();
        };
        CronGenComponent.prototype.getAmPmHour = function (hour) {
            return this.options.use24HourTime ? hour : (hour + 11) % 12 + 1;
        };
        CronGenComponent.prototype.getHourType = function (hour) {
            return this.options.use24HourTime ? undefined : (hour >= 12 ? 'PM' : 'AM');
        };
        CronGenComponent.prototype.hourToCron = function (hour, hourType) {
            if (this.options.use24HourTime) {
                return hour;
            }
            else {
                return hourType === 'AM' ? (hour === 12 ? 0 : hour) : (hour === 12 ? 12 : hour + 12);
            }
        };
        CronGenComponent.prototype.handleModelChange = function (cron) {
            var _this = this;
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
                cron = "0 " + cron + " *";
            }
            var _a = __read(cron.split(' '), 6), seconds = _a[0], minutes = _a[1], hours = _a[2], dayOfMonth = _a[3], month = _a[4], dayOfWeek = _a[5];
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
                var parsedHours = parseInt(hours);
                this.state.daily.everyDays.hours = this.getAmPmHour(parsedHours);
                this.state.daily.everyDays.hourType = this.getHourType(parsedHours);
                this.state.daily.everyDays.minutes = parseInt(minutes);
                this.state.daily.everyDays.seconds = parseInt(seconds);
            }
            else if (cron.match(/\d+ \d+ \d+ [\?\*] \* MON-FRI \*/)) {
                this.activeTab = 'daily';
                this.state.daily.subTab = 'everyWeekDay';
                var parsedHours = parseInt(hours);
                this.state.daily.everyWeekDay.hours = this.getAmPmHour(parsedHours);
                this.state.daily.everyWeekDay.hourType = this.getHourType(parsedHours);
                this.state.daily.everyWeekDay.minutes = parseInt(minutes);
                this.state.daily.everyWeekDay.seconds = parseInt(seconds);
            }
            else if (cron.match(/\d+ \d+ \d+ [\?\*] \* (MON|TUE|WED|THU|FRI|SAT|SUN)(,(MON|TUE|WED|THU|FRI|SAT|SUN))* \*/)) {
                this.activeTab = 'weekly';
                this.selectOptions.days.forEach(function (weekDay) { return _this.state.weekly[weekDay] = false; });
                dayOfWeek.split(',').forEach(function (weekDay) { return _this.state.weekly[weekDay] = true; });
                var parsedHours = parseInt(hours);
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
                var parsedHours = parseInt(hours);
                this.state.monthly.specificDay.hours = this.getAmPmHour(parsedHours);
                this.state.monthly.specificDay.hourType = this.getHourType(parsedHours);
                this.state.monthly.specificDay.minutes = parseInt(minutes);
                this.state.monthly.specificDay.seconds = parseInt(seconds);
            }
            else if (cron.match(/\d+ \d+ \d+ [\?\*] 1\/\d+ (MON|TUE|WED|THU|FRI|SAT|SUN)((#[1-5])|L) \*/)) {
                var day = dayOfWeek.substr(0, 3);
                var monthWeek = dayOfWeek.substr(3);
                this.activeTab = 'monthly';
                this.state.monthly.subTab = 'specificWeekDay';
                this.state.monthly.specificWeekDay.monthWeek = monthWeek;
                this.state.monthly.specificWeekDay.day = day;
                this.state.monthly.specificWeekDay.months = parseInt(month.substring(2));
                var parsedHours = parseInt(hours);
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
                var parsedHours = parseInt(hours);
                this.state.yearly.specificMonthDay.hours = this.getAmPmHour(parsedHours);
                this.state.yearly.specificMonthDay.hourType = this.getHourType(parsedHours);
                this.state.yearly.specificMonthDay.minutes = parseInt(minutes);
                this.state.yearly.specificMonthDay.seconds = parseInt(seconds);
            }
            else if (cron.match(/\d+ \d+ \d+ [\?\*] \d+ (MON|TUE|WED|THU|FRI|SAT|SUN)((#[1-5])|L) \*/)) {
                var day = dayOfWeek.substr(0, 3);
                var monthWeek = dayOfWeek.substr(3);
                this.activeTab = 'yearly';
                this.state.yearly.subTab = 'specificMonthWeek';
                this.state.yearly.specificMonthWeek.monthWeek = monthWeek;
                this.state.yearly.specificMonthWeek.day = day;
                this.state.yearly.specificMonthWeek.month = parseInt(month);
                var parsedHours = parseInt(hours);
                this.state.yearly.specificMonthWeek.hours = this.getAmPmHour(parsedHours);
                this.state.yearly.specificMonthWeek.hourType = this.getHourType(parsedHours);
                this.state.yearly.specificMonthWeek.minutes = parseInt(minutes);
                this.state.yearly.specificMonthWeek.seconds = parseInt(seconds);
            }
            else {
                this.activeTab = 'advanced';
                this.state.advanced.expression = origCron;
            }
        };
        CronGenComponent.prototype.cronIsValid = function (cron) {
            if (cron) {
                var cronParts = cron.split(' ');
                return (this.isCronFlavorQuartz && (cronParts.length === 6 || cronParts.length === 7) || (this.isCronFlavorStandard && cronParts.length === 5));
            }
            return false;
        };
        CronGenComponent.prototype.getDefaultState = function () {
            var _a = __read(this.options.defaultTime.split(':').map(Number), 3), defaultHours = _a[0], defaultMinutes = _a[1], defaultSeconds = _a[2];
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
        };
        CronGenComponent.prototype.getOrdinalSuffix = function (value) {
            if (value.length > 1) {
                var secondToLastDigit = value.charAt(value.length - 2);
                if (secondToLastDigit === '1') {
                    return 'th';
                }
            }
            var lastDigit = value.charAt(value.length - 1);
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
        };
        CronGenComponent.prototype.getSelectOptions = function () {
            return {
                months: this.getRange(1, 12),
                monthWeeks: ['#1', '#2', '#3', '#4', '#5', 'L'],
                days: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
                minutes: this.getRange(0, 59),
                fullMinutes: this.getRange(0, 59),
                seconds: this.getRange(0, 59),
                hours: this.getRange(1, 23),
                monthDays: this.getRange(1, 31),
                monthDaysWithLasts: __spread(['1W'], __spread(this.getRange(1, 31).map(String)), ['LW', 'L']),
                monthDaysWithOutLasts: __spread(this.getRange(1, 31).map(String)),
                hourTypes: ['AM', 'PM']
            };
        };
        CronGenComponent.prototype.getRange = function (start, end) {
            var length = end - start + 1;
            return Array.apply(null, Array(length)).map(function (_, i) { return i + start; });
        };
        return CronGenComponent;
    }());
    CronGenComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'cron-editor',
                    template: "<div class=\"card cron-editor-main\">\r\n\r\n  <div class=\"card-header\">\r\n    <!-- Tabs -->\r\n    <mat-tab-group [(selectedIndex)]=\"selectedTabIndex\">\r\n      <mat-tab label=\"Minutes\" *ngIf=\"!options.hideMinutesTab\">\r\n        <div class=\"\">\r\n          Every\r\n          <mat-form-field>\r\n            <mat-select class=\"minutes\" [disabled]=\"disabled || activeTab !== 'minutes'\" (selectionChange)=\"regenerateCron()\"\r\n              [(ngModel)]=\"state.minutes.minutes\" [ngClass]=\"options.formSelectClass\">\r\n              <mat-option *ngFor=\"let minute of selectOptions.minutes\" [value]=\"minute\">\r\n                {{minute}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field>minute(s)\r\n          <span *ngIf=\"!options.hideSeconds && isCronFlavorQuartz\">on second</span>\r\n          <mat-form-field *ngIf=\"!options.hideSeconds && isCronFlavorQuartz\">\r\n            <mat-select class=\"seconds\" [disabled]=\"disabled || activeTab !== 'minutes'\" (selectionChange)=\"regenerateCron()\"\r\n              [(ngModel)]=\"state.minutes.seconds\" [ngClass]=\"options.formSelectClass\">\r\n              <mat-option *ngFor=\"let second of selectOptions.seconds\" [value]=\"second\">\r\n                {{second}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field>\r\n        </div>\r\n      </mat-tab>\r\n      <mat-tab label=\"Hourly\" *ngIf=\"!options.hideHourlyTab\">\r\n        <div class=\"\">\r\n          Every\r\n          <mat-form-field>\r\n            <mat-select class=\"hours\" [disabled]=\"disabled || activeTab !== 'hourly'\" (selectionChange)=\"regenerateCron()\"\r\n              [(ngModel)]=\"state.hourly.hours\" [ngClass]=\"options.formSelectClass\">\r\n              <mat-option *ngFor=\"let hour of selectOptions.hours\" [value]=\"hour\">\r\n                {{hour}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field> hour(s) on minute\r\n          <mat-form-field>\r\n            <mat-select class=\"minutes\" [disabled]=\"disabled || activeTab !== 'hourly'\" (selectionChange)=\"regenerateCron()\"\r\n              [(ngModel)]=\"state.hourly.minutes\" [ngClass]=\"options.formSelectClass\">\r\n              <mat-option *ngFor=\"let minute of selectOptions.fullMinutes\" [value]=\"minute\">\r\n                {{minute}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field>\r\n          <span *ngIf=\"!options.hideSeconds && isCronFlavorQuartz\">and second</span>\r\n          <mat-form-field *ngIf=\"!options.hideSeconds && isCronFlavorQuartz\">\r\n            <mat-select class=\"seconds\" [disabled]=\"disabled || activeTab !== 'hourly'\" (selectionChange)=\"regenerateCron()\"\r\n              [(ngModel)]=\"state.hourly.seconds\" [ngClass]=\"options.formSelectClass\">\r\n              <mat-option *ngFor=\"let second of selectOptions.seconds\" [value]=\"second\">\r\n                {{second}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field>\r\n        </div>\r\n      </mat-tab>\r\n      <mat-tab label=\"Daily\" *ngIf=\"!options.hideDailyTab\">\r\n        <div class=\"form-group\">\r\n          <mat-radio-group [(ngModel)]=\"state.daily.subTab\">\r\n            <mat-radio-button name=\"daily-radio\" value=\"everyDays\" [disabled]=\"disabled\" (change)=\"regenerateCron()\"\r\n              [ngClass]=\"state.formRadioClass\" checked=\"checked\">\r\n            </mat-radio-button>\r\n          </mat-radio-group>\r\n          <label>Every\r\n            <mat-form-field>\r\n              <mat-select class=\"days\" [disabled]=\"disabled || activeTab !== 'daily' || state.daily.subTab !== 'everyDays'\"\r\n                (selectionChange)=\"regenerateCron()\" [(ngModel)]=\"state.daily.everyDays.days\" [ngClass]=\"options.formSelectClass\">\r\n                <mat-option *ngFor=\"let monthDay of selectOptions.monthDays\" [value]=\"monthDay\">\r\n                  {{monthDay}}\r\n                </mat-option>\r\n              </mat-select>\r\n            </mat-form-field>\r\n          </label>&nbsp;\r\n          <label>day(s) at\r\n            <cron-time-picker [disabled]=\"disabled || activeTab !== 'daily' || state.daily.subTab !== 'everyDays'\"\r\n              (onChange)=\"regenerateCron()\" [(model)]=\"state.daily.everyDays\" [selectClass]=\"options.formSelectClass\"\r\n              [use24HourTime]=\"options.use24HourTime\" [hideSeconds]=\"options.hideSeconds|| !isCronFlavorQuartz\">\r\n            </cron-time-picker>\r\n          </label>\r\n        </div>\r\n\r\n        <div class=\"form-group\">\r\n          <mat-radio-group [(ngModel)]=\"state.daily.subTab\">\r\n            <mat-radio-button name=\"daily-radio\" value=\"everyWeekDay\" [disabled]=\"disabled\" (change)=\"regenerateCron()\"\r\n              [ngClass]=\"state.formRadioClass\">\r\n            </mat-radio-button>\r\n          </mat-radio-group>\r\n          Every working day at\r\n          <cron-time-picker [disabled]=\"disabled || activeTab !== 'daily' || state.daily.subTab !== 'everyWeekDay'\"\r\n            (onChange)=\"regenerateCron()\" [(model)]=\"state.daily.everyWeekDay\" [selectClass]=\"options.formSelectClass\"\r\n            [use24HourTime]=\"options.use24HourTime\" [hideSeconds]=\"options.hideSeconds || !isCronFlavorQuartz\">\r\n          </cron-time-picker>\r\n        </div>\r\n      </mat-tab>\r\n      <mat-tab label=\"Weekly\" *ngIf=\"!options.hideWeeklyTab\">\r\n        <div class=\"form-group\">\r\n          <div class=\"row\">\r\n            <div class=\"col-sm-6\">\r\n              <mat-checkbox [disabled]=\"disabled || activeTab !== 'weekly'\" (change)=\"regenerateCron()\" [(ngModel)]=\"state.weekly.MON\"\r\n                [ngClass]=\"options.formCheckboxClass\"> Monday</mat-checkbox>\r\n            </div>\r\n            <div class=\"col-sm-6\">\r\n              <mat-checkbox [disabled]=\"disabled || activeTab !== 'weekly'\" (change)=\"regenerateCron()\" [(ngModel)]=\"state.weekly.TUE\"\r\n                [ngClass]=\"options.formCheckboxClass\"> Tuesday</mat-checkbox>\r\n            </div>\r\n            <div class=\"col-sm-6\">\r\n              <mat-checkbox [disabled]=\"disabled || activeTab !== 'weekly'\" (change)=\"regenerateCron()\" [(ngModel)]=\"state.weekly.WED\"\r\n                [ngClass]=\"options.formCheckboxClass\"> Wednesday</mat-checkbox>\r\n            </div>\r\n            <div class=\"col-sm-6\">\r\n              <mat-checkbox [disabled]=\"disabled || activeTab !== 'weekly'\" (change)=\"regenerateCron()\" [(ngModel)]=\"state.weekly.THU\"\r\n                [ngClass]=\"options.formCheckboxClass\"> Thursday </mat-checkbox>\r\n            </div>\r\n            <div class=\"col-sm-6\">\r\n              <mat-checkbox [disabled]=\"disabled || activeTab !== 'weekly'\" (change)=\"regenerateCron()\" [(ngModel)]=\"state.weekly.FRI\"\r\n                [ngClass]=\"options.formCheckboxClass\"> Friday</mat-checkbox>\r\n            </div>\r\n            <div class=\"col-sm-6\">\r\n              <mat-checkbox type=\"checkbox\" [disabled]=\"disabled || activeTab !== 'weekly'\" (change)=\"regenerateCron()\"\r\n                [(ngModel)]=\"state.weekly.SAT\" [ngClass]=\"options.formCheckboxClass\"> Saturday</mat-checkbox>\r\n            </div>\r\n            <div class=\"col-sm-6\">\r\n              <mat-checkbox type=\"checkbox\" [disabled]=\"disabled || activeTab !== 'weekly'\" (change)=\"regenerateCron()\"\r\n                [(ngModel)]=\"state.weekly.SUN\" [ngClass]=\"options.formCheckboxClass\"> Sunday</mat-checkbox>\r\n            </div>\r\n          </div>\r\n          <div class=\"row\">\r\n            <div class=\"col-sm-6\">\r\n              at\r\n              <cron-time-picker [disabled]=\"disabled || activeTab !== 'weekly'\" (onChange)=\"regenerateCron()\" [(model)]=\"state.weekly\"\r\n                [selectClass]=\"options.formSelectClass\" [use24HourTime]=\"options.use24HourTime\" [hideSeconds]=\"options.hideSeconds|| !isCronFlavorQuartz\">\r\n              </cron-time-picker>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n      </mat-tab>\r\n      <mat-tab [label]=\"options.tMonthly || 'Monthly'\" *ngIf=\"!options.hideMonthlyTab\">\r\n        <div class=\"form-group\">\r\n          <mat-radio-group [(ngModel)]=\"state.monthly.subTab\">\r\n            <mat-radio-button name=\"monthly-radio\" value=\"specificDay\" [disabled]=\"disabled\" (change)=\"regenerateCron()\"\r\n                              [ngClass]=\"state.formRadioClass\">\r\n            </mat-radio-button>\r\n          </mat-radio-group>\r\n          {{options.tOnThe || 'On the'}} {{options.tDay}}\r\n          <mat-form-field *ngIf=\"isCronFlavorQuartz\">\r\n            <mat-select class=\"month-days\" [disabled]=\"disabled || activeTab !== 'monthly' || state.monthly.subTab !== 'specificDay'\"\r\n                        (selectionChange)=\"regenerateCron()\" [(ngModel)]=\"state.monthly.specificDay.day\" [ngClass]=\"options.formSelectClass\">\r\n              <mat-option *ngFor=\"let monthDaysWithLast of selectOptions.monthDaysWithLasts\" [value]=\"monthDaysWithLast\">\r\n                {{monthDayDisplay(monthDaysWithLast)}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field>\r\n\r\n          <mat-form-field *ngIf=\"isCronFlavorStandard\" style=\"width:50px\">\r\n            <mat-select class=\"month-days\" [disabled]=\"disabled || activeTab !== 'monthly' || state.monthly.subTab !== 'specificDay'\"\r\n                        (selectionChange)=\"regenerateCron()\" [(ngModel)]=\"state.monthly.specificDay.day\" [ngClass]=\"options.formSelectClass\">\r\n              <mat-option *ngFor=\"let monthDaysWithOutLast of selectOptions.monthDaysWithOutLasts\" [value]=\"monthDaysWithOutLast\">\r\n                {{monthDayDisplay(monthDaysWithOutLast)}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field>\r\n\r\n          {{options.tOfEvery || 'of every'}} \r\n          <mat-form-field style=\"width:50px\">\r\n            <mat-select class=\"months-small\" [disabled]=\"disabled || activeTab !== 'monthly' || state.monthly.subTab !== 'specificDay'\"\r\n                        (selectionChange)=\"regenerateCron()\" [(ngModel)]=\"state.monthly.specificDay.months\" [ngClass]=\"options.formSelectClass\">\r\n              <mat-option *ngFor=\"let month of selectOptions.months\" [value]=\"month\">\r\n                {{month}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field>\r\n          <span *ngIf=\"state.monthly.specificDay.months == 1\">{{options.tMonth || 'month'}} {{options.tAt || 'at'}}</span>\r\n          <span *ngIf=\"state.monthly.specificDay.months > 1\">{{options.tMonths || 'months'}} {{options.tAt || 'at'}}</span>\r\n\r\n          <cron-time-picker [disabled]=\"disabled || activeTab !== 'monthly' || state.monthly.subTab !== 'specificDay'\"\r\n                            (onChange)=\"regenerateCron()\" [(model)]=\"state.monthly.specificDay\" [selectClass]=\"options.formSelectClass\"\r\n                            [use24HourTime]=\"options.use24HourTime\" [hideSeconds]=\"options.hideSeconds || !isCronFlavorQuartz\">\r\n          </cron-time-picker>\r\n        </div>\r\n        <div class=\"\" *ngIf=\"!options.hideSpecificWeekDayTab\">\r\n          <mat-radio-group [(ngModel)]=\"state.monthly.subTab\">\r\n            <mat-radio-button name=\"monthly-radio\" value=\"specificWeekDay\" [disabled]=\"disabled\" (change)=\"regenerateCron()\"\r\n                              [ngClass]=\"state.formRadioClass\">\r\n            </mat-radio-button>\r\n          </mat-radio-group>\r\n          {{options.tOnThe ||  'On the'}}\r\n          <mat-form-field style=\"width:100px\">\r\n            <mat-select class=\"day-order-in-month\" [disabled]=\"disabled || activeTab !== 'monthly' || state.monthly.subTab !== 'specificWeekDay'\"\r\n                        (selectionChange)=\"regenerateCron()\" [(ngModel)]=\"state.monthly.specificWeekDay.monthWeek\" [ngClass]=\"options.formSelectClass\">\r\n              <mat-option *ngFor=\"let monthWeek of selectOptions.monthWeeks\" [value]=\"monthWeek\">\r\n                {{monthWeekDisplay(monthWeek)}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field>\r\n          {{options.tOf}}\r\n          <mat-form-field>\r\n            <mat-select class=\"week-days\" [disabled]=\"disabled || activeTab !== 'monthly' || state.monthly.subTab !== 'specificWeekDay'\"\r\n                        (selectionChange)=\"regenerateCron()\" [(ngModel)]=\"state.monthly.specificWeekDay.day\" [ngClass]=\"options.formSelectClass\">\r\n              <mat-option *ngFor=\"let day of selectOptions.days\" [value]=\"day\">\r\n                {{dayDisplay(day)}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field>\r\n          {{options.tOfEvery ||  'of every'}}\r\n          <mat-form-field style=\"width:50px\">\r\n            <mat-select class=\"months-small\" [disabled]=\"disabled || activeTab !== 'monthly' || state.monthly.subTab !== 'specificWeekDay'\"\r\n                        (selectionChange)=\"regenerateCron()\" [(ngModel)]=\"state.monthly.specificWeekDay.months\" [ngClass]=\"options.formSelectClass\">\r\n              <mat-option *ngFor=\"let month of selectOptions.months\" [value]=\"month\">\r\n                {{month}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field>\r\n          <span *ngIf=\"state.monthly.specificWeekDay.months == 1\">{{options.tMonth || 'month'}} {{options.tAt || 'at'}}</span>\r\n          <span *ngIf=\"state.monthly.specificWeekDay.months > 1\">{{options.tMonths || 'months'}} {{options.tAt || 'at'}}</span>\r\n          <cron-time-picker [disabled]=\"disabled || activeTab !== 'monthly' || state.monthly.subTab !== 'specificWeekDay'\"\r\n                            (onChange)=\"regenerateCron()\" [(model)]=\"state.monthly.specificWeekDay\" [selectClass]=\"options.formSelectClass\"\r\n                            [use24HourTime]=\"options.use24HourTime\" [hideSeconds]=\"options.hideSeconds || !isCronFlavorQuartz\">\r\n          </cron-time-picker>\r\n        </div>\r\n      </mat-tab>\r\n      <mat-tab [label]=\"options.tYearly || 'Yearly'\" *ngIf=\"!options.hideYearlyTab\">\r\n        <div class=\"form-group\">\r\n          <mat-radio-group [(ngModel)]=\"state.yearly.subTab\">\r\n            <mat-radio-button name=\"yearly-radio\" value=\"specificMonthDay\" [disabled]=\"disabled\" (change)=\"regenerateCron()\"\r\n                              [ngClass]=\"state.formRadioClass\">\r\n            </mat-radio-button>\r\n          </mat-radio-group>\r\n          {{ options.tEvery ||'Every'}}\r\n          <mat-form-field>\r\n            <mat-select class=\"months\" [disabled]=\"disabled || activeTab !== 'yearly' || state.yearly.subTab !== 'specificMonthDay'\"\r\n                        (selectionChange)=\"regenerateCron()\" [(ngModel)]=\"state.yearly.specificMonthDay.month\" [ngClass]=\"options.formSelectClass\">\r\n              <mat-option *ngFor=\"let month of selectOptions.months\" [value]=\"month\">\r\n                {{monthDisplay(month)}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field>\r\n          {{options.tOnThe2 || 'on the'}} {{options.tDay}}\r\n          <mat-form-field *ngIf=\"isCronFlavorQuartz\" class=\"month-days\">\r\n            <mat-select [disabled]=\"disabled || activeTab !== 'yearly' || state.yearly.subTab !== 'specificMonthDay'\"\r\n                        (selectionChange)=\"regenerateCron()\" [(ngModel)]=\"state.yearly.specificMonthDay.day\" [ngClass]=\"options.formSelectClass\">\r\n              <mat-option *ngFor=\"let monthDaysWithLast of selectOptions.monthDaysWithLasts\" [value]=\"monthDaysWithLast\">\r\n                {{monthDayDisplay(monthDaysWithLast)}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field>\r\n          <mat-form-field *ngIf=\"isCronFlavorStandard\">\r\n            <mat-select class=\"month-days\" [disabled]=\"disabled || activeTab !== 'yearly' || state.yearly.subTab !== 'specificMonthDay'\"\r\n                        (selectionChange)=\"regenerateCron()\" [(ngModel)]=\"state.yearly.specificMonthDay.day\" [ngClass]=\"options.formSelectClass\">\r\n              <mat-option *ngFor=\"let monthDaysWithOutLast of selectOptions.monthDaysWithOutLasts\" [value]=\"monthDaysWithOutLast\">\r\n                {{monthDayDisplay(monthDaysWithOutLast)}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field>\r\n          {{options.tAt || 'at'}}\r\n          <cron-time-picker [disabled]=\"disabled || activeTab !== 'yearly' || state.yearly.subTab !== 'specificMonthDay'\"\r\n                            (onChange)=\"regenerateCron()\" [(model)]=\"state.yearly.specificMonthDay\" [selectClass]=\"options.formSelectClass\"\r\n                            [use24HourTime]=\"options.use24HourTime\" [hideSeconds]=\"options.hideSeconds || !isCronFlavorQuartz\">\r\n          </cron-time-picker>\r\n        </div>\r\n        <div class=\"\" *ngIf=\"!options.hideSpecificMonthWeekTab\">\r\n          <mat-radio-group [(ngModel)]=\"state.yearly.subTab\">\r\n            <mat-radio-button name=\"yearly-radio\" value=\"specificMonthWeek\" [disabled]=\"disabled\" (change)=\"regenerateCron()\"\r\n                              [ngClass]=\"state.formRadioClass\">\r\n            </mat-radio-button>\r\n          </mat-radio-group>\r\n          {{options.tOnThe || 'On the'}}\r\n          <mat-form-field>\r\n            <mat-select class=\"day-order-in-month\" [disabled]=\"disabled || activeTab !== 'yearly' || state.yearly.subTab !== 'specificMonthWeek'\"\r\n                        (selectionChange)=\"regenerateCron()\" [(ngModel)]=\"state.yearly.specificMonthWeek.monthWeek\" [ngClass]=\"options.formSelectClass\">\r\n              <mat-option *ngFor=\"let monthWeek of selectOptions.monthWeeks\" [value]=\"monthWeek\">\r\n                {{monthWeekDisplay(monthWeek)}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field>\r\n          {{options.tOf}}\r\n          <mat-form-field>\r\n            <mat-select class=\"week-days\" [disabled]=\"disabled || activeTab !== 'yearly' || state.yearly.subTab !== 'specificMonthWeek'\"\r\n                        (selectionChange)=\"regenerateCron()\" [(ngModel)]=\"state.yearly.specificMonthWeek.day\" [ngClass]=\"options.formSelectClass\">\r\n              <mat-option *ngFor=\"let day of selectOptions.days\" [value]=\"day\">\r\n                {{dayDisplay(day)}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field>\r\n          {{options.tOf2 || 'of'}}\r\n          <mat-form-field>\r\n            <mat-select class=\"months\" [disabled]=\"disabled || activeTab !== 'yearly' || state.yearly.subTab !== 'specificMonthWeek'\"\r\n                        (selectionChange)=\"regenerateCron()\" [(ngModel)]=\"state.yearly.specificMonthWeek.month\" [ngClass]=\"options.formSelectClass\">\r\n              <mat-option *ngFor=\"let month of selectOptions.months\" [value]=\"month\">\r\n                {{monthDisplay(month)}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field>\r\n          {{options.tAt || 'at'}}\r\n          <cron-time-picker [disabled]=\"disabled || activeTab !== 'yearly' || state.yearly.subTab !== 'specificMonthWeek'\"\r\n                            (onChange)=\"regenerateCron()\" [(model)]=\"state.yearly.specificMonthWeek\" [selectClass]=\"options.formSelectClass\"\r\n                            [use24HourTime]=\"options.use24HourTime\" [hideSeconds]=\"options.hideSeconds || !isCronFlavorQuartz\">\r\n          </cron-time-picker>\r\n        </div>\r\n      </mat-tab>\r\n      <mat-tab label=\"Advanced\" *ngIf=\"!options.hideAdvancedTab\">\r\n        Cron Expression\r\n        <mat-form-field>\r\n          <input matInput type=\"text\" class=\"advanced-cron-editor-input\" ng-disabled=\"disabled || activeTab !== 'advanced'\"\r\n            (change)=\"regenerateCron()\" [(ngModel)]=\"state.advanced.expression\" [ngClass]=\"options.formInputClass\">\r\n        </mat-form-field>\r\n      </mat-tab>\r\n    </mat-tab-group>\r\n  </div>\r\n</div>\r\n",
                    styles: [".cron-editor-main .cron-editor-container{margin-top:10px}.cron-editor-main .cron-editor-container .cron-editor-radio{display:inline-block;width:20px}.cron-editor-main .cron-editor-container .cron-editor-checkbox,.cron-editor-main .cron-editor-container .cron-editor-input,.cron-editor-main .cron-editor-container .cron-editor-select{display:inline-block}.cron-editor-main .cron-editor-container .well-time-wrapper{padding-left:20px}.cron-editor-main .cron-editor-container .inline-block{display:inline-block}.cron-editor-main .cron-editor-container .days,.cron-editor-main .cron-editor-container .hours,.cron-editor-main .cron-editor-container .minutes,.cron-editor-main .cron-editor-container .seconds{width:70px}.cron-editor-main .cron-editor-container .months{width:120px}.cron-editor-main .cron-editor-container .month-days{width:130px}.cron-editor-main .cron-editor-container .months-small{width:60px}.cron-editor-main .cron-editor-container .day-order-in-month{width:95px}.cron-editor-main .cron-editor-container .week-days{width:120px}.cron-editor-main .cron-editor-container .advanced-cron-editor-input{width:200px}.cron-editor-main .cron-editor-container .hour-types{width:70px}.nav-tabs li a{cursor:pointer}"]
                },] }
    ];
    CronGenComponent.propDecorators = {
        disabled: [{ type: core.Input }],
        options: [{ type: core.Input }],
        cron: [{ type: core.Input }],
        cronChange: [{ type: core.Output }]
    };

    var TimePickerComponent = /** @class */ (function () {
        function TimePickerComponent() {
            this.onChange = new core.EventEmitter();
        }
        TimePickerComponent.prototype.ngOnInit = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.hours = this.use24HourTime ? this.range(0, 23) : this.range(0, 12);
                    this.minutes = this.range(0, 59);
                    this.seconds = this.range(0, 59);
                    this.hourTypes = ['AM', 'PM'];
                    return [2 /*return*/];
                });
            });
        };
        TimePickerComponent.prototype.changeEmit = function () {
            console.log('changeEmit');
            this.onChange.emit();
        };
        TimePickerComponent.prototype.range = function (start, end) {
            var length = end - start + 1;
            return Array.apply(undefined, Array(length)).map(function (_, i) { return i + start; });
        };
        return TimePickerComponent;
    }());
    TimePickerComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'cron-time-picker',
                    template: "<!-- hour -->\r\n<mat-form-field style=\"width: 50px;\">\r\n  <mat-select style=\"width: 20px; display: inline;\" (selectionChange)=\"changeEmit()\" [(ngModel)]=\"model.hours\" [disabled]=\"disabled\"\r\n    [ngClass]=\"selectClass\">\r\n    <mat-option *ngFor=\"let hour of hours\" [value]=\"hour\">{{hour}}</mat-option>\r\n  </mat-select>\r\n</mat-form-field>\r\n\r\n<!-- minute -->\r\n<mat-form-field style=\"width: 50px;\">\r\n  <mat-select style=\"width: 20px; display: inline;\" (selectionChange)=\"changeEmit()\" [(ngModel)]=\"model.minutes\" [disabled]=\"disabled\"\r\n    [ngClass]=\"selectClass\">\r\n    <mat-option *ngFor=\"let minute of minutes\" [value]=\"minute\">{{minute}}</mat-option>\r\n  </mat-select>\r\n</mat-form-field>\r\n\r\n<!-- second -->\r\n<mat-form-field *ngIf=\"!hideSeconds\" style=\"width: 50px;\">\r\n  <mat-select style=\"width: 20px; display: inline;\" (selectionChange)=\"changeEmit()\" [(ngModel)]=\"model.seconds\" [disabled]=\"disabled\"\r\n     [ngClass]=\"selectClass\">\r\n    <mat-option *ngFor=\"let second of seconds\" [value]=\"second\">{{second}}</mat-option>\r\n  </mat-select>\r\n</mat-form-field>\r\n\r\n<!-- am/pm -->\r\n<mat-form-field *ngIf=\"!use24HourTime\" style=\"width: 50px;\">\r\n  <mat-select style=\"width: 20px; display: inline;\" (selectionChange)=\"changeEmit()\" [(ngModel)]=\"model.hourType\" [disabled]=\"disabled\"\r\n     [ngClass]=\"selectClass\">\r\n    <mat-option *ngFor=\"let hourType of hourTypes\" [value]=\"hourType\">{{hourType}}</mat-option>\r\n  </mat-select>\r\n</mat-form-field>\r\n"
                },] }
    ];
    TimePickerComponent.propDecorators = {
        onChange: [{ type: core.Output }],
        disabled: [{ type: core.Input }],
        model: [{ type: core.Input }],
        selectClass: [{ type: core.Input }],
        use24HourTime: [{ type: core.Input }],
        hideSeconds: [{ type: core.Input }]
    };

    var CronEditorModule = /** @class */ (function () {
        function CronEditorModule() {
        }
        return CronEditorModule;
    }());
    CronEditorModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common.CommonModule,
                        forms.FormsModule,
                        tabs.MatTabsModule,
                        select.MatSelectModule,
                        formField.MatFormFieldModule,
                        radio.MatRadioModule,
                        checkbox.MatCheckboxModule,
                        input.MatInputModule,
                        animations.BrowserAnimationsModule
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

    exports.CronEditorModule = CronEditorModule;
    exports.CronGenComponent = CronGenComponent;
    exports.ɵa = TimePickerComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=alexandrupaul7-ngx-cron-editor.umd.js.map
