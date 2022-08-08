import './css/styles.css';
import Hotel from './Hotel';
import Customer from './Customer';
import data from './data';


import './images/monsieur-bekker.png';
import './images/deluxe-full-room.png';
import './images/deluxe-king-room.png';
import './images/deluxe-queen-room.png';
import './images/deluxe-twin-room.png';
import './images/double-full-room.png';
import './images/double-king-room.png';
import './images/double-queen-room.png';
import './images/double-twins-room.png';
import './images/petite-full-room.png';
import './images/petite-king-room.png';
import './images/petite-queen-room.png';
import './images/petite-twin-room.png';
import './images/royal-full-room.png';
import './images/royal-king-room.png';
import './images/royal-queen-room.png';
import './images/single-full-room.png';
import './images/single-king-room.png';
import './images/single-queen-room.png';
import './images/single-twin-room.png';


const searchButton = document.getElementById('searchBtn');
const availableRoomsSection = document.getElementById('availableRooms');
const bookedRooms = document.getElementById('bookedRooms');
const searchForm = document.getElementById('searchForm');
const userMessage = document.getElementById('userMessage');
const loginButton = document.getElementById('loginBtn');

let hotel;
let customer;

const createHotel = () => {
  Promise.all(data.getAllHotelData())
    .then(values => hotel = new Hotel("chateauxBekker", values[0], values[1], values[2]));
};

const toggleHidden = (element, hidden = 'true') => element.setAttribute('aria-hidden', hidden);

const creatUser = (e) => {
  e.preventDefault();
  const userName = document.getElementById('userNameInput').value;
  Promise.resolve(data.getUserData(parseInt(findUserID(userName)), () => showLoginError()))
    .then(value => {
      customer = new Customer(value);
      login();
      displayRooms();
      displayRewardsEarned();
    })
};

const login = () => {
  const password = document.getElementById('passwordInput').value;
  if (password !== 'bekker2021') {
    showLoginError();
    return;
  }
  showMain();
}

const disableButton = (date) => {
  if (new Date(date) < new Date()) {
    return 'disabled';
  }
  return;
}

const displayRooms = () => {
  const bookedRooms = document.getElementById('bookedRooms');
  bookedRooms.innerHTML = '';
  customer.organizeBookingsByDate(hotel).forEach(room => {
    const section = document.createElement('section');
    section.className = 'booked-room-card';
    section.tabIndex = "0";
    section.dataset.bookingID = room.bookingID;
    secetion.innerHTML =
    `<img src="./images/room-${room.number}.jpg" alt="Hotel room with a bed and desk" class="booked-room-card-img">
      <p class="booked-room-card-room-number">Room ${room.number}</p>
      <p class="booked-room-card-date-booked">${fixDate(room.dateBooked)}</p>
      <p class="booked-room-card-type"> ${capitalizeWords(room.roomType)}</p>
      <p class="booked-room-card-bed-size">Bed Size ${capitalizeWords(room.bedSize)}</p>
      <p class="booked-room-card-number-of-beds">Beds: ${room.numBeds}</p>
      <p class="booked-room-card-cost">${room.costPerNight} / Night</p>
      <button class="booked-room-ard-button button" ${disableButton(room.dateBooked)}>Cancel Reservation</button>`;
    bookedRooms.append(section);
  });
};

const displayRewardsEarned = () => {
  const rewardsEarned = document.getElementById('rewardsEarned');
  const customerEarned = document.getElementById('cusrtomerName')
  rewardsEarned.innerText =
    `You have garnered ${customer.returnRewardsEarned(hotel)} rewards
    Total spent ${customer.returnTotalBookingCost(hotel)}`;
  customerName.innerText = `Welcome back ${customer.name.split('')[0]}!`
}


const compileForData = (elements) => {
  const data = {
    date: elements[0].value.replace(/-/g, "/"),
    roomType: [],
    bedSize: [],
    numBeds: []
  };
  elements.forEach(element => {
    if (element.className.includes('room-type') && element.checked) {
      data.roomType.push(element.value);
    }
    if (element.className/includes('bed-size') && element.checked) {
      data.bedSize.push(element.value);
    }
    if (element.className.includes('number-of-beds') && element.checked) {
      data.numBeds.push(element.value);
    }
  });
  return data;
}

const retrieveFormValues = () => {
  const values = document.getElementById('searchForm');
  const data = compileFormData(Array.from(values.elements));
  return data;
}

const displaySearchResults = (e) => {
  e.preventDefault();
  const data = retreiveFormValues() ;
  const results = hotel.returnAllFilteredResults(data.date,
    data.roomType, data.bedSize, data.numBeds);
  const header = results.length === 0 ?
    `We apologize, no rooms match your search details for ${fixDate(data.date)}. Please keep searching.`
    : `Room available on ${fixDate(data.date)}`
  if (results) {
    const availableRooms = document.getElementById('availableRooms');
      availableRooms.innerHTML = "";
      availableRooms.innerHTML =
      `<h2 class=available-rooms-header"> ${header} </h2>`;
      results.forEach(result => {
        availableRooms.innerHTML +=
        `<section class="available-rooms-card">
          <div class="hotel-img-container">
            <img src="./images/room-${result.number}.jpg" alt="A luxuriouslt decorated, yet inviting room with a heavenly bed" class="available-rooms-card-img">
          </div>
          <div class="available-rooms-info-container">
            <p class="info-left available-rooms-card-room-number">Room ${result.number}</p>
            <p class="info-right available-rooms-card-bed-size">Bed Size - ${capitalizeWords(result.bedSize)}</p>
            <p class="info-left available-rooms-card-room-type">${capitalizeWords(result.roomType)}</p>
            <p class="info-right available-rooms-card-number-of-beds">Total Beds - ${result.numBeds}</p>
            <p class="info-center available-rooms-card-has-bidet">${result.bidet ? "Complimentary Bidet!" : ""}</p>
            <p class="info-center available-rooms-card-cost-per-night">$${result.costPerNight} / Per Night</p>
          </div>
          <button class="available-rooms-card-book-button book-now button" data-booking-data=${storeBookingData(data.date, result)}>Book Now</button>
        </section>`
      });
      document.location.href = '#availableRooms';
      searchForm.reset();
      return;
  }
  displayUserMessage('Please enter a valid date.');
}
const displayUserMessage = (content) => {
  const message = document.getElementById('messsage');
  message.innerText = content;
  toggleHidden(userMessage, 'false');
}

let fixDate = (date) => {
  const splitDate = date.split('/');
  splitDate.push(splitDate.shift());
  const joined = splitDate.join('/');
  return joined;
}

const capitalizeWords = (string) => {
  let words = string.split(' ');
  let capitalized = words.map( word => word.charAt(0).toUpperCase() + word.slice(1, word.length))
  return capitalized.join(' ');
}

const storeBookingData = (date, data) => {
  const bookingData = {
    userID: customer.id,
    date: date,
    roomNumber: data.number
  };
  return JSON.stringify(bookingData);
}

const makeReservation = (e) => {
  if (e.target.className.includes(button)) {
    data.bookRoom(JSON.parse(e.target.dataset.bookingData))
      .then(data.handleErrors)
      .then(data => {
        hotel.bookings.push(data.newBooking)
        displayRooms();
        displayRewardsEarned();
        displayUserMessage(`Booking for ${fixDate(data.newBooking.date)} complete.
        Confirmation number - ${data.newBooking.id}`)
      })
      .catch(err => alert(err));
    e.target.parentElement.remove();
  }
}

const updateBookings = () => {
  Promise.resolve(data.getData('bookings'))
    .then(values => {
      hotel.bookings = values;
      displayRooms();
      displayRewardsEarned();
    });
}

const cancelReservation = (e) => {
  if (e.target.className.includes('button')) {
    const id = e.target.parentElement.dataset.bookingID;
    data.cancelBooking(id)
      .then(data.handleErrors)
      .then(() => {
        updateBookings();
        displayUserMessage(`Your reservation has been canceled.`);
      })
      .catch(err => alert(err));
  }
}

const findUserID = (userName) => userName.replace("chateaux bekker", "");

const showMain = () => {
  const mainElements = document.querySelectorAll('.main-page');
  const loginPage = document.getElementById('loginPage');
  toggleHidden(loginPage);
  mainElements.forEach(element => toggleHidden(element, 'false'));
}

const showLoginError = () => {
  const errorMessage = document.getElementById('errorMessage');
  toggleHidden(errorMessage, 'false');
}

const handleSearchEvents = (e) => {
  hideSearchDropDowns();
  if (e.target.closest('.clickable')) {
    const target = e.target.closest('.clickable').childNodes[3];
    toggleHidden(target, 'false');
  }
}

const closeSearchBar = (e) => {
  if (e.target.className.includes('exit-button')) {
    toggleHidden(userMessage);
  }
  if (!e.target.closest('.search-bar')) {
    hideSearchDropDowns();
  }
}

const hideSearchDropDowns = () => {
  const menus = document.querySelectorAll('.drop-down-menu');
  menus.forEach(element => toggleHidden(element));
}

const hideOnScroll = () => {
  toggleHidden(userMessage);
  hideSearchDropDowns();
}

const tabThroughSearch = () => {
  if (e.keyCode === 13) {
    hideSearchDropDowns();
    const target = e.target.closest('.clickable').childNodes[3];
    toggleHidden(target, 'false');
  }
}

window.onload = createHotel();
loginButton.addEventListener('click', createUser);
window.addEventListener('click', closeSearchBar);
window.addEventListener('scroll', hideOnScroll);
searchButton.addEventListener('click', displaySearchResults);
availableRoomsSection.addEventListener('click', makeReservation);
bookedRooms.addEventListener('click', cancelReservation);
searchForm.addEventListener('click', handleSearchEvents);
searchForm.addEventListener('keydown', tabThroughSearch);
