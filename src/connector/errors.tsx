export class NoExtensions extends Error {
  constructor() {
    super();
    this.name = 'NoExtensions';
    this.message = 'No Extensions Found';
  }
}
