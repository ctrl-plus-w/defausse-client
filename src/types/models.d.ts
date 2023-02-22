interface Model {
  id: number;

  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Script extends Model {
  content: string;

  modes: Mode[];
  playerIntervals?: PlayerInterval[];
}

export interface PlayerInterval extends Model {
  min: number;
  max: number;

  locations?: Location[];

  scriptId: number;
}

export interface Location extends Model {
  name: string;

  roleCombinations?: RoleCombination[];

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
