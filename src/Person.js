class Person {
  returnBookingHistory(hotel, id = this.id) {
    if (!hotel.bookings.some(roomBooked => roomBooked.userID === id)) {
      return [];
    }
    return hotel.bookings.filter(room => room.userID === id);
  }

  
}
