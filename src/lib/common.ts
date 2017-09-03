export class Format {

  public static formatTime(date: Date): string {
    return date.toTimeString().substring(3, 8);
  }

}
