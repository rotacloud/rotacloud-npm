import { ApiShift, ApiTerminalLocation } from '../interfaces/index.js';

export interface ApiUserClockedIn {
  user: number;
  location: number;
  role: number;
  in_time: number;
  minutes_late: number;
  shift: Pick<ApiShift, 'id' | 'start_time' | 'end_time' | 'minutes_break' | 'location' | 'role'>;
  in_method: string;
  in_location: ApiTerminalLocation;
  in_device: string | null;
  in_terminal: number | null;
}
