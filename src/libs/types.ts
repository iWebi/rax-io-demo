export interface BaseEntity {
  hashKey: string;
  rangeKey?: string;
  created: string;
  updated: string;
}

export interface Device extends BaseEntity {
  tenantId: string;
  id: string;
  name: string;
  ip: string;
}

export interface AppError {
  body: string;
  statusCode: number;
  statusType: string;
}

export interface DynamoItemResponse<T> {
  body: T;
  statusCode: number;
  statusType: string;
}
