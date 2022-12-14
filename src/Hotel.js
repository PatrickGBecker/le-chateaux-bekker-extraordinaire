class Hotel {
  constructor(name, rooms, bookings, customers) {
    this.name = name;
    this.rooms = rooms;
    this.bookings = bookings;
    this.customers = customers
  }

  checkAvailableRooms(checkIn) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (!checkIn || new Date(checkIn) < today) {
      return false
    }
    const unavailable = this.bookings.filter(room => room.date === checkIn)
      .map(room => room.roomNumber);
    return this.rooms.filter(room => !unavailable.includes(room.number));
  }

  filterRoomsBySearchCriteria(availableRooms, searchInput, type) {
    if (searchInput.length === 0) {
      return availableRooms;
    }
    const results = searchInput.reduce((foundRooms, keyword) => {
      availableRooms.forEach(room => {
        if (room[type].toString() === keyword && !foundRooms.includes(room)) {
          foundRooms.push(room);
        }
      });
      return foundRooms;
    }, []);
    return results;
  }

  returnAllFilteredResults(date, typeOfRoom, sizeOfBed, numberOfBeds) {
    const availableRooms = this.checkAvailableRooms(date)
    if (availableRooms === false) {
      return false
    }
    const byType = this.filterRoomsBySearchCriteria(availableRooms, typeOfRoom, 'roomType');
    const byBedSize = this.filterRoomsBySearchCriteria(byType, sizeOfBed, 'bedSize');
    const byNumberOfBeds = this.filterRoomsBySearchCriteria(byBedSize, numberOfBeds, 'numBeds');
    const finalResult = byNumberOfBeds;
    return finalResult;
  }

}

export default Hotel;
