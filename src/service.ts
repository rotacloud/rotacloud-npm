import { Settings } from 'http2';
import {
  Account,
  Attendance,
  Auth,
  Availability,
  DailyBudgets,
  DailyRevenue,
  DayNote,
  DaysOff,
  Group,
  Leave,
  Role,
  Shift,
  TimeZone,
  Document,
  LeaveEmbargo,
  LeaveRequest,
  LeaveType,
  Location,
  Pin,
  Terminal,
  ToilAccrual,
  ToilAllowance,
  UserClockedIn,
  User,
} from './interfaces/index.js';
import { Operation, OpFunctionFactory } from './ops.js';
import {
  AttendanceQueryParams,
  AvailabilityQueryParams,
  DailyBudgetsQueryParams,
  DailyRevenueQueryParams,
  DayNotesQueryParams,
  DaysOffQueryParams,
  DocumentsQueryParams,
  GroupsQueryParams,
  LeaveEmbargoesQueryParams,
  LeaveQueryParams,
  LeaveRequestsQueryParams,
  LocationsQueryParams,
  RolesQueryParams,
  SettingsQueryParams,
  ShiftsQueryParams,
  TerminalsQueryParams,
  ToilAccrualsQueryParams,
  ToilAllowanceQueryParams,
  UsersQueryParams,
} from './rotacloud.js';

type RequirementsOf<T, K extends keyof T> = Required<Pick<T, K>> & Partial<T>;
export type EndpointVersion = 'v1' | 'v2';
export interface Endpoint<
  Entity = unknown,
  QueryParameters extends object = any,
  RequiredFields extends keyof Entity = any,
> {
  type: Entity;
  queryParameters: QueryParameters;
  createType: RequirementsOf<Entity, RequiredFields>;
}
export type ServiceSpecification =
  | {
      /** URL of the endpoint */
      endpoint: keyof EndpointEntityMap['v1'];
      /** API version of the endpoint */
      endpointVersion: 'v1';
      /** Operations allowed and usable for the endpoint */
      operations: Operation[];
      /**
       * Operations unique to the serive
       * Can be used to override operations listed in {@see ServiceSpecification['operations']}
       */
      customOperations?: Record<string, OpFunctionFactory>;
    }
  | {
      /** URL of the endpoint */
      endpoint: keyof EndpointEntityMap['v2'];
      /** API version of the endpoint */
      endpointVersion: 'v2';
      /** Operations allowed and usable for the endpoint */
      operations: Operation[];
      /**
       * Operations unique to the serive
       * Can be used to override operations listed in {@see ServiceSpecification['operations']}
       */
      customOperations?: Record<string, OpFunctionFactory>;
    };

/** Mapping between a endpoint URL and it's associated entity type */
export interface EndpointEntityMap extends Record<EndpointVersion, Record<string, Endpoint>> {
  /** Type mappings for v1 endpoints  */
  v1: {
    accounts: Endpoint<Account>;
    attendance: Endpoint<Attendance, AttendanceQueryParams, 'user' | 'in_time'>;
    auth: Endpoint<Auth>;
    availability: Endpoint<Availability, AvailabilityQueryParams>;
    daily_budget: Endpoint<DailyBudgets, DailyBudgetsQueryParams>;
    daily_revenue: Endpoint<DailyRevenue, DailyRevenueQueryParams>;
    day_notes: Endpoint<DayNote, DayNotesQueryParams>;
    days_off: Endpoint<DaysOff, DaysOffQueryParams>;
    documents: Endpoint<Document, DocumentsQueryParams, 'name' | 'bucket' | 'key'>;
    groups: Endpoint<Group, GroupsQueryParams, 'name'>;
    leave_embargoes: Endpoint<LeaveEmbargo, LeaveEmbargoesQueryParams, 'start_date' | 'end_date' | 'users'>;
    leave_requests: Endpoint<LeaveRequest, LeaveRequestsQueryParams, 'start_date' | 'end_date' | 'type' | 'user'>;
    leave_types: Endpoint<LeaveType>;
    leave: Endpoint<Leave, LeaveQueryParams, 'users' | 'type' | 'start_date' | 'end_date'>;
    locations: Endpoint<Location, LocationsQueryParams, 'name'>;
    pins: Endpoint<Pin>;
    roles: Endpoint<Role, RolesQueryParams, 'name'>;
    settings: Endpoint<Settings, SettingsQueryParams>;
    shifts: Endpoint<Shift, ShiftsQueryParams, 'start_time' | 'end_time' | 'location'>;
    terminals: Endpoint<Terminal, TerminalsQueryParams, 'name' | 'timezone'>;
    terminals_active: Endpoint<Terminal>;
    timezones: Endpoint<TimeZone>;
    toil_accruals: Endpoint<ToilAccrual, ToilAccrualsQueryParams, 'duration_hours' | 'leave_year' | 'user_id'>;
    toil_allowance: Endpoint<ToilAllowance, ToilAllowanceQueryParams>;
    // TODO: fixup
    users_clocked_in: Endpoint<UserClockedIn, never, 'in_method'>;
    users: Endpoint<User, UsersQueryParams, 'first_name' | 'last_name'>;
  };
  /** Type mappings for v2 endpoints */
  v2: {};
}

/**
 * List of all supported service specifications
 * used to generate the SDK client
 */
export const SERVICES = {
  account: {
    endpoint: 'accounts',
    endpointVersion: 'v1',
    operations: ['get', 'list', 'listAll'],
  },
  attendance: {
    endpoint: 'attendance',
    endpointVersion: 'v1',
    operations: ['get', 'list', 'listAll', 'delete', 'create', 'update'],
  },
  auth: {
    endpoint: 'auth',
    endpointVersion: 'v1',
    operations: ['get'],
  },
  availability: {
    endpoint: 'availability',
    endpointVersion: 'v1',
    operations: ['update', 'create', 'delete', 'list', 'listAll'],
  },
  dailyBudget: {
    endpoint: 'daily_budget',
    endpointVersion: 'v1',
    operations: ['list', 'listAll', 'update'],
  },
  dailyRevenue: {
    endpoint: 'daily_revenue',
    endpointVersion: 'v1',
    operations: ['list', 'listAll', 'update'],
  },
  dayNote: {
    endpoint: 'day_notes',
    endpointVersion: 'v1',
    operations: ['get', 'create', 'list', 'listAll', 'update', 'delete'],
  },
  dayOff: {
    endpoint: 'days_off',
    endpointVersion: 'v1',
    operations: ['create', 'list', 'listAll', 'delete'],
  },
  document: {
    endpoint: 'documents',
    endpointVersion: 'v1',
    operations: ['create', 'get', 'list', 'listAll', 'update', 'delete'],
  },
  group: {
    endpoint: 'groups',
    endpointVersion: 'v1',
    operations: ['create', 'get', 'list', 'listAll', 'update', 'delete'],
  },
  leaveEmbargo: {
    endpoint: 'leave_embargoes',
    endpointVersion: 'v1',
    operations: ['create', 'get', 'list', 'listAll', 'update', 'delete'],
  },
  leaveRequest: {
    endpoint: 'leave_requests',
    endpointVersion: 'v1',
    operations: ['create', 'get', 'list', 'listAll', 'update', 'delete'],
  },
  leaveType: {
    endpoint: 'leave_types',
    endpointVersion: 'v1',
    operations: ['list', 'listAll'],
  },
  leave: {
    endpoint: 'leave',
    endpointVersion: 'v1',
    operations: ['get', 'list', 'delete', 'create'],
    customOperations: {
      // create:
      //   ({ client, request, service }) =>
      //   (entity: Partial<LeaveRequest>, opts?: Options) => {
      //     assert(request.headers !== undefined, 'Invalid create leave request');
      //     TODO: remove "Account" header
      //     request.headers.User = entity.user;
      //     // TODO: replace with "create" op
      //     return client.post<LeaveRequest>(service.endpoint, request);
      //   },
    },
  },
  location: {
    endpoint: 'locations',
    endpointVersion: 'v1',
    operations: ['create', 'get', 'list', 'listAll', 'update', 'delete'],
  },
  pin: {
    endpoint: 'pins',
    endpointVersion: 'v1',
    operations: ['get'],
  },
  role: {
    endpoint: 'roles',
    endpointVersion: 'v1',
    operations: ['get', 'list', 'delete'],
  },
  settings: {
    endpoint: 'settings',
    endpointVersion: 'v1',
    operations: ['list', 'listAll'],
  },
  shift: {
    endpoint: 'shifts',
    endpointVersion: 'v1',
    operations: ['create', 'get', 'list', 'listAll', 'update', 'delete'],
    customOperations: {
      //   acknowledge: () => undefined,
      //   publish: () => undefined,
      //   unpublish: () => undefined,
    },
  },
  terminal: {
    endpoint: 'terminals',
    endpointVersion: 'v1',
    operations: ['create', 'get', 'update', 'list', 'listAll'],
    customOperations: {
      // close: () => undefined
    },
  },
  terminalActive: {
    endpoint: 'terminals',
    endpointVersion: 'v1',
    operations: ['list', 'listAll'],
    customOperations: {
      // launch: () => undefined
      // ping: () => undefined
      // close: () => undefined
    },
  },
  timeZone: {
    endpoint: 'timezones',
    endpointVersion: 'v1',
    operations: ['get', 'list', 'listAll'],
  },
  toilAccrual: {
    endpoint: 'toil_accruals',
    endpointVersion: 'v1',
    operations: ['create', 'get', 'list', 'listAll', 'delete'],
  },
  toilAllowance: {
    endpoint: 'toil_allowance',
    endpointVersion: 'v1',
    operations: ['list', 'listAll'],
  },
  userClockIn: {
    endpoint: 'users_clocked_in',
    endpointVersion: 'v1',
    // TODO: check types
    operations: ['get', 'list', 'listAll'],
    customOperations: {
      // clockIn: () => undefined
      // clockOut: () => undefined
      // startBreak: () => undefined
      // endBreak: () => undefined
    },
  },
  user: {
    endpoint: 'users',
    endpointVersion: 'v1',
    operations: ['create', 'get', 'list', 'listAll', 'update', 'delete'],
  },
} satisfies Record<string, ServiceSpecification>;
