import chai from 'chai';
const expect = chai.expect;
import data from './test-data';
import Hotel from '../src/Hotel';

describe('Hotel', () => {
  let chateauxBekker;

  beforeEach(() => {
    chateauxBekker = new Hotel('Chateaux Bekker', data.rooms, data.bookings, data.customers);
  })

  it('Should be an instance of Hotel', () => {
    expect(Hotel).to.be.a('function');
    expect(chateauxBekker).to.be.an.instanceOf(Hotel);
  });

  it('Should hold data on it\'s rooms, bookings, and customers', () => {
    expect(chateauxBekker.name).to.deep.equal('Chateaux Bekker');
    expect(chateauxBekker.rooms).to.deep.equal(data.rooms);
    expect(chateauxBekker.bookings).to.deep.equal(data.bookings);
    expect(chateauxBekker.customers).to.deep.equal(data.customers);
  });

  it('Should return rooms available by selected day', () => {
    expect(chateauxBekker.checkAvailableRooms("2022/07/78"))
    .to.deep.equal(chateauxBekker.rooms);
    //chateauxBekker.rooms.splice(5, 1);
    expect(chateauxBekker.checkAvailableRooms("2022/08/15"))
    .to.deep.equal(chateauxBekker.rooms);
  });

  it('Should let you know if no date was selected', () => {
  expect(chateauxBekker.checkAvailableRooms()).to.deep.equal(false)
});

it('Should return rooms by type if matched', () => {
  const suites = [
    {
      number: 2,
      roomType: 'suite',
      bidet: false,
      bedSize: 'full',
      numBeds: 2,
      costPerNight: 477.38
    },
    {
      number: 10,
      roomType: 'suite',
      bidet: false,
      bedSize: 'twin',
      numBeds: 1,
      costPerNight: 497.64
    }
  ];
  const suitesSearch = chateauxBekker.filterRoomsBySearchCriteria(chateauxBekker.rooms, ['suite'], 'roomType')
  expect(suitesSearch).to.deep.equal(suites);
});

it('Should return rooms with matching bed size', () => {
  const kingBeds = [
    {
      number: 3,
      roomType: 'single room',
      bidet: false,
      bedSize: 'king',
      numBeds: 1,
      costPerNight: 491.14
    },
    {
      number: 8,
      roomType: 'junior suite',
      bidet: false,
      bedSize: 'king',
      numBeds: 1,
      costPerNight: 261.26
    },
    {
      number: 18,
      roomType: 'junior suite',
      bidet: false,
      bedSize: 'king',
      numBeds: 2,
      costPerNight: 496.41
    }
  ]
  const kingBedSearch = chateauxBekker.filterRoomsBySearchCriteria(chateauxBekker.rooms, ['king'], 'bedSize');

  expect(kingBedSearch).to.deep.equal(kingBeds);
});

it('Should return all rooms if they have enough beds', () => {
 const roomsByBedNumber = chateauxBekker.rooms.filter(room => room.numBeds === 2);
 const bedNumSearch = chateauxBekker.filterRoomsBySearchCriteria(chateauxBekker.rooms, ['2'], 'numBeds');
 expect(bedNumSearch).to.deep.equal(roomsByBedNumber);
});

it('Should return all rooms if no search input entered', () => {
  expect(chateauxBekker.filterRoomsBySearchCriteria(chateauxBekker.rooms, [], 'roomType')).to.deep.equal(chateauxBekker.rooms)
  expect(chateauxBekker.filterRoomsBySearchCriteria(chateauxBekker.rooms, [], 'bedSize')).to.deep.equal(chateauxBekker.rooms)
  expect(chateauxBekker.filterRoomsBySearchCriteria(chateauxBekker.rooms, [], 'numBeds')).to.deep.equal(chateauxBekker.rooms)
  });

it('Should return filtered search results for all categories', () => {
  chateauxBekker.bookings = data.bookingsForSearch;
  const search = chateauxBekker.returnAllFilteredResults('2022/08/31', ["junior suite","suite"], ["full"], ["2"])

  expect(search).to.deep.equal([
        {
          number: 2,
          roomType: 'suite',
          bidet: false,
          bedSize: 'full',
          numBeds: 2,
          costPerNight: 477.38
        }
      ]);
    })

    it('Should not work if no date is selected', () => {
      const search = chateauxBekker.returnAllFilteredResults('', ["junior", "suite-suite"], "full", "2");
      expect(search).to.deep.equal(false);
    });

  })
