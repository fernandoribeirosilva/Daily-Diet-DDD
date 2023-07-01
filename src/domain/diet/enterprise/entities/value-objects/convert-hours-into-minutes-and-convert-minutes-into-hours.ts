export class ConvertHoursIntoMinutesAndConvertMinutesIntoHours {
  public value: string

  constructor(value: string) {
    this.value = value
  }

  static convertHourStringToMinutes(hourString: string) {
    const [hours, minutes] = hourString.split(':').map(Number)

    const minutesAmount = hours * 60 + minutes

    return new ConvertHoursIntoMinutesAndConvertMinutesIntoHours(
      String(minutesAmount),
    )
  }

  static convertMinutesToHourString(minutesAmount: number) {
    const hours = Math.floor(minutesAmount / 60)
    const minutes = minutesAmount % 60

    const hoursAmount = `${String(hours).padStart(2, '0')}:${String(
      minutes,
    ).padStart(2, '0')}`

    return new ConvertHoursIntoMinutesAndConvertMinutesIntoHours(hoursAmount)
  }
}
