import chai from 'chai';
const expect = chai.expect;
import data from './test-data';
import Hotel from '../src/Hotel';
import Person from '../src/Person';

describe('Person behavior', () => {
  const chateauxBekker = new Hotel('Chateaux Bekker', data.rooms, data.bookings, data.customers)
  const person = new Person();
  const customerBookings = [
    {
      id: '5fwrgu4i7k55hl6tc',
      userID: 6,
      date: '2022/01/30',
      roomNumber: 13,
      roomServiceCharges: []
    },
    {
      id: '5fwrgu4i7k55hl6td',
      userID: 6,
      date: '2022/01/31',
      roomNumber: 18,
      roomServiceCharges: []
    },
    {
      id: '5fwrgu4i7k55hl6te',
      userID: 6,
      date: '2022/01/19',
      roomNumber: 8,
      roomServiceCharges: []
    }
  ]
  const roomsBooked = [
    {
      number: 13,
      roomType: 'single room',
      bidet: false,
      bedSize: 'queen',
      numBeds: 2,
      costPerNight: 423.92,
      dateBooked: "2022/01/30",
      bookingID: "5fwrgu4i7k55hl6tc"
    },
    {
      number: 18,
      roomType: 'junior suite',
      bidet: false,
      bedSize: 'king',
      numBeds: 2,
      costPerNight: 496.41,
      dateBooked: "2022/01/31",
      bookingID: "5fwrgu4i7k55hl6td"
    },
    {
      number: 8,
      roomType: 'junior suite',
      bidet: false,
      bedSize: 'king',
      numBeds: 1,
      costPerNight: 261.26,
      dateBooked: "2022/01/19",
      bookingID: "5fwrgu4i7k55hl6te"
    }
  ]

  it('Should instantiate a new Person', () => {
    expect(Person).to.be.a('function');
    expect(person).to.be.an.instanceOf(Person);
  });

  it('Should return all rooms booked for past and present based on id', () => {
    expect(person.returnBookingHistory(chateauxBekker, 33)).to.deep.equal([])
  });

  
})
