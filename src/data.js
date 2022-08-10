const data = {
  getData(type) {
    return fetch(`https://overlook-hotel.herokuapp.com/api/v1/${type}`)
      .then(data.handleErrors)
      .then(data => data[type])
      .catch(err => alert(err));
  },
  getAllHotelData() {
    const dataTypes = ['rooms', 'bookings', 'customers'];
    return dataTypes.map(this.getData);
  },
  getUserData(customerID, callback) {
    return fetch(`http://localhost:3001/api/v1/customers/${customerID}`)
      .then(data.handleErrors)
      .then(data => data)
      .catch(callback)
  },
  handleErrors(response) {
    if (!response.ok) {
      throw Error('Our apologies, something went wrong. Please try again.');
    }
    return response.json()
  }
}

export default data;
