import { Group, Leave, Role, Shift, TimeZone } from './interfaces/index.js';
import { Operation, OpFunctionFactory } from './ops.js';
import { GroupsQueryParams, LeaveQueryParams, RolesQueryParams, ShiftsQueryParams } from './rotacloud.js';

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
    shifts: Endpoint<Shift, ShiftsQueryParams, 'start_time' | 'end_time' | 'location'>;
    leave: Endpoint<Leave, LeaveQueryParams, 'users' | 'type' | 'start_date' | 'end_date'>;
    timezones: Endpoint<TimeZone>;
    groups: Endpoint<Group, GroupsQueryParams, 'name'>;
    roles: Endpoint<Role, RolesQueryParams, 'name'>;
  };
  /** Type mappings for v2 endpoints */
  v2: {};
}

/**
 * List of all supported service specifications
 * used to generate the SDK client
 */
export const SERVICES = {
  shift: {
    endpoint: 'shifts',
    endpointVersion: 'v1',
    operations: ['get', 'list', 'delete', 'create'],
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
  group: {
    endpoint: 'groups',
    endpointVersion: 'v1',
    operations: ['get', 'list', 'delete'],
  },
  roles: {
    endpoint: 'roles',
    endpointVersion: 'v1',
    operations: ['get', 'list', 'delete'],
  },
  timeZone: {
    endpoint: 'timezones',
    endpointVersion: 'v1',
    operations: ['get', 'list'],
  },
} satisfies Record<string, ServiceSpecification>;
