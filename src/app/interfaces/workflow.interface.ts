export interface Data {
  processInstanceId?: number;
  error?: any;
}

export interface Info {
  isRequestNew: () => boolean;
  getUserData: () => Promise<UserData>;
  getTaskData: () => Promise<TaskDataWC>;
  getPlatformData: () => Promise<PlatformData>;
  getInfoFromProcessVariables: () => Promise<ProcessVariables[]>;
}

interface UserData {
  description: string;
  email: string;
  fullname: string;
  id: string;
  locale: string;
  subject: string;
  tenantName: string;
  username: string;
}

interface TaskDataWC {
  processName: string;
  taskName: string;
}

interface PlatformData {
  serviceUrl: string;
  odataUrl: string;
  token: Token;
}
interface Token {
  token_type: string;
  access_token: string;
}

interface ProcessVariables {
  key: string;
  value: string;
}
