export class Photo {
  public value: any

  static uploadImage(img: any) {
    return new Photo(img)
  }

  constructor(value: any) {
    this.value = value
  }
}
