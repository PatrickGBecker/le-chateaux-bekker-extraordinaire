import Person from './Person'

class Customer extends Person {
  constructor(customer) {
    super()
    this.id = customer.id;
    this.name = customer.name;
  }
}


export default Customer;
