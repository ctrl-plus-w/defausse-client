interface Model {
  id: number;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface Script extends Model {
  content: string;

  modes: Mode[];
}

export interface PlayerInterval extends Model {
  min: number;
  max: number;

  scriptId: number;
}

export interface Location extends Model {
  name: string;

  playerIntervalId: number;
}

export interface RoleCombination extends Model {
  roles: Role[];
}

export interface Role extends Model {
  name: string;
  unique: boolean;
  required: boolean;
  gender: 1 | 2;

  roleCombinationId: number;
}

export interface Mode extends Model {
  name: string;
  description: string;
  summary: string;
}

export interface Quest extends Model {
  content: string;
}
