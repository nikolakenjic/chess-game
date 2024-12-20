class Car {
  private readonly make: string;
  private readonly model: string;
  private readonly year: number;

  constructor(make: string, model: string, year: number) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  public getCarInfo(): string {
    return `${this.year} ${this.make} ${this.model}`;
  }
}

const car1 = new Car('Tesla', 'Model S', 2024);
// console.log(car1.getCarInfo());

car1.make = 'BMW';
