import {CronFlavor} from './enums';

export interface CronOptions {
  formInputClass: string;
  formSelectClass: string;
  formRadioClass: string;
  formCheckboxClass: string;

  defaultTime: string,

  hideMinutesTab: boolean;
  hideHourlyTab: boolean;
  hideDailyTab: boolean;
  hideWeeklyTab: boolean;
  hideMonthlyTab: boolean;
  hideYearlyTab: boolean;
  hideAdvancedTab: boolean;
  hideSpecificWeekDayTab: boolean;
  hideSpecificMonthWeekTab: boolean;

  use24HourTime: boolean;
  hideSeconds: boolean;

  //translate
  tYearly: string;
  tJanuary: string;
  tMonthly: string;
  tOnThe: string;
  tOnThe2: string;
  tDay: string;
  tOfEvery: string;
  tMonth: string;
  tMonths: string;
  tAt: string;
  tLanguage: string;
  tOf: string;
  tOf2: string;
  tEvery: string,

  

  cronFlavor: CronFlavor;
}
