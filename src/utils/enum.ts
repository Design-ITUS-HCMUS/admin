export const STATUS_CODE: any = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};
export const ROLE: {
  [key: string]: number;
} = {
  ADMIN: 1,
  MEMBER: 2,
  CONTESTANT: 3,
};

export const ROLE_NAME: {
  [key: number]: string;
} = {
  [ROLE.ADMIN]: 'Admin',
  [ROLE.MEMBER]: 'Member',
  [ROLE.CONTESTANT]: 'Contestant',
};

export const TYPE_OTP: {
  [key: string]: number;
} = {
  REGISTER: 1,
  RESET_PASSWORD: 2,
};

export enum DEPARTMENT {
  content = 'content',
  drawing = 'drawing',
  graphic = 'graphic',
  ghotography = 'photography',
  video = 'video',
}

export enum POSITION {
  CN = 'Chủ nhiệm',
  PCN = 'Phó chủ nhiệm',
  BCN = 'Thành viên BCN',
  TB = 'Trưởng ban',
  TV = 'Thành viên',
}
