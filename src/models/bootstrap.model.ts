export interface BootstrapAlert {
  id: string
  type: BootstrapColorOptions
  message: string
  timestamp?: number
}

export type NewAlert = Omit<BootstrapAlert, 'id'>

export enum BootstrapColor {
  primary,
  secondary,
  success,
  danger,
  warning,
  info,
  light,
  dark,
}

export type BootstrapColorOptions = keyof typeof BootstrapColor
