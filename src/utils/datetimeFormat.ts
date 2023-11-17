export const datetimeFormat = (
  datetime: string,
  timeStyle: Intl.DateTimeFormatOptions['timeStyle'],
  dateStyle: Intl.DateTimeFormatOptions['dateStyle']
) => {
  return new Intl.DateTimeFormat('es-ES', {
    dateStyle,
    timeStyle,
    timeZone: 'America/Lima',
  }).format(new Date(datetime))
}
