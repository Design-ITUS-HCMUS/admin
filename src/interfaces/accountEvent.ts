export interface AccountEvent {
  eventID: number;
  roleID: number;
  teamID?: number;
  department?: string;
  userID: number;
}

export interface AccountEventID {
  eventID: number;
  userID: number;
}
