export type Guard = {
  canActivate: () => boolean;
};
export type GuardFunction = () => Guard;
