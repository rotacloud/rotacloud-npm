import { ApiSettings, PayCodes } from '../interfaces';

export class Settings {
  public attendance_record_breaks: string;
  public automatically_clock_in_to_consecutive_shifts: boolean;
  public availability_employees_can_edit: boolean;
  public availability_managers_can_edit: boolean;
  public breaks_paid: boolean;
  public clock_in_out_reminders_minutes: number;
  public clock_in_without_shift_allowed: string;
  public currency_symbol: string;
  public dashboard_show_unpublished_shifts: boolean;
  public early_clock_ins_paid_from: string;
  public early_clock_in_minutes: number;
  public employee_shift_note_visibility: string;
  public employees_can_edit_timesheets: boolean;
  public employees_can_only_see_self: boolean;
  public employees_can_see_all_locations: boolean;
  public employees_can_see_everyones_leave: boolean;
  public flag_in_out_discrepancies_minutes: number;
  public holiday_accrual_rate: number;
  public late_clock_outs_paid_until: string;
  public lateness_added_after_minutes: number;
  public leave_can_request_over_allowance: boolean;
  public leave_prorate_allowances: boolean;
  public leave_requests_enabled: boolean;
  public leave_requests_notice_days: number;
  public leave_year_start_day: number;
  public leave_year_start_month: number;
  public metadata_enabled: boolean;
  public mobile_clocking_enabled: boolean;
  public no_show_notifications_minutes: number;
  public open_shift_claiming_enabled: boolean;
  public public_holiday_affects_allowance: boolean;
  public reminders_enabled: boolean;
  public rota_grouping: string;
  public rota_salaried_cost_method: string;
  public rota_show_employee_photos: boolean;
  public round_breaks: string;
  public round_breaks_direction: string;
  public round_currency: string;
  public round_currency_direction: string;
  public round_hours: string;
  public round_hours_direction: string;
  public shift_acknowledgement_enabled: boolean;
  public shift_swaps_across_locations_enabled: boolean;
  public shift_swaps_enabled: boolean;
  public shift_swaps_notice_hours: number;
  public shift_swaps_require_approval: boolean;
  public shift_swaps_shift_range_days: number;
  public show_open_shifts_from_other_locations: boolean;
  public show_shifts_from_other_locations: boolean;
  public time_format: string;
  public unavailability_notice_hours: number;
  public unavailability_requests_enabled: boolean;
  public unpaid_leave_types_included_in_accrual: number[];
  public paid_leave_types_included_in_accrual: number[];
  public week_starts: string;
  public pay_codes: PayCodes;
  public webhook_signing_secret: string;

  constructor(settings: ApiSettings) {
    this.attendance_record_breaks = settings.attendance_record_breaks;
  }
}
