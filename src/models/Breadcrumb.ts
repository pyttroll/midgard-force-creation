export default class Breadcrumb {
  constructor(
    public label: string,
    public route: string,
  ) {
    this.label = label
    this.route = route
  }
}
