import chai from 'chai';
const expect = chai.expect;
import Guest from '../src/Guest.js';
import data from './test-data';
import Hotel from '../src/Hotel';

describe('Guest', () => {
  const guest = new Guest({id: 6, name: 'Fleta Schuppe'});
  const chateauxBekker = new Hotel('Chateaux Bekker', data.rooms, data.bookings, data.customers);


  it('Should instantiate a new Guest', () => {
    expect(guest).to.be.an.instanceOf(Guest);
    expect(Guest).to.be.a('function')
  });

  it('Should have an id and name', () => {
    expect(guest.name).to.deep.equal('Fleta Schuppe');
    expect(guest.id).to.deep.equal(6)
  });

  it('Should be able to see their booking history', () => {
    const roomsBooked = [
      {
        id: "5fwrgu4i7k55hl6tc",
        userID: 6,
        date: "2022/01/30",
        roomNumber: 13,
        roomServiceCharges: []
      },
      {
        id: "5fwrgu4i7k55hl6td",
        userID: 6,
        date: "2022/01/31",
        roomNumber: 18,
        roomServiceCharges: []
      },
      {
        id: "5fwrgu4i7k55hl6te",
        userID: 6,
        date: "2022/01/19",
        roomNumber: 8,
        roomServiceCharges: []
      },
    ]
    expect(guest.returnBookingHistory(chateauxBekker)).to.be.an('array');
    expect(guest.returnBookingHistory(chateauxBekker)).to.deep.equal(roomsBooked);
  })

  it('Should let you know if you have not booked rooms', () => {
    const guest = new Guest({id: 33, name: "Monsieur Patric Bekker"});
    expect(guest.returnBookingHistory(chateauxBekker)).to.deep.equal([]);
  })

});
