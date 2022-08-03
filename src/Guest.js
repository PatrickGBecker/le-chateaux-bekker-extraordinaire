import Person from './Person'

class Guest extends Person {
  constructor(guest) {
    super()
    this.id = guest.id;
    this.name = guest.name;
  }
}


export default Guest;
