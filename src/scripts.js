import './css/imports.scss';
import Hotel from './Hotel';
import Customer from './Customer';
import data from './data';

import './images/login-background.png';
import './images/mountain-backdrop.png';
import './images/exit-icon.png';
import './images/search-icon.png'
import './images/monsieur-bekker.png';
import './images/room-1.png';
import './images/room-2.png';
import './images/room-3.png';
import './images/room-4.png';
import './images/room-5.png';
import './images/room-6.png';
import './images/room-7.png';
import './images/room-8.png';
import './images/room-9.png';
import './images/room-10.png';
import './images/room-11.png';
import './images/room-12.png';
import './images/room-13.png';
import './images/room-14.png';
import './images/room-15.png';
import './images/room-16.png';
import './images/room-17.png';
import './images/room-18.png';
import './images/room-19.png';
import './images/room-20.png';
import './images/room-21.png';
import './images/room-22.png';
import './images/room-23.png';
import './images/room-24.png';
import './images/room-25.png';

const searchButton = document.getElementById('searchBtn');
const availableRoomsSection = document.getElementById('availableRooms');
const bookedRooms = document.getElementById('bookedRooms');
const searchForm = document.getElementById('searchForm');

let hotel;
let customer;

const createHotel = () => {
  Promise.all(data.getAllHotelData())
    .then(values => hotel = new Hotel("overLook", values[0], values[1], values[2]))
};

const createUser = (e) => {
  e.preventDefault();
  const userName = document.getElementById('userNameInput').value;

  Promise.resolve(data.getUserData(parseInt(findUserID(userName)), () => showLoginError()))
  .then(value => {
      customer = new Customer(value);
      login();
      displayRooms();
      displayPointsEarned();
    })
};

const login = () => {
  const password = document.getElementById('passwordInput').value;
  if (password !== 'bekker2022') {
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
    section.className = 'booked-room__card';
    section.tabIndex = "0";
    section.dataset.bookingID = room.bookingID;
    section.innerHTML =
    `<img src="./images/room-${room.number}.png" alt="Hotel room with a bed and desk" class="booked-room__card__img">
      <p class="booked-room__card__room-number">Room ${room.number}</p>
      <p class="booked-room__card__date-booked">${fixDate(room.dateBooked)}</p>
      <p class="booked-room__card__type"> ${capitalizeWords(room.roomType)}</p>
      <p class="booked-room__card__bed-size">Bed Size ${capitalizeWords(room.bedSize)}</p>
      <p class="booked-room__card__number-of-beds">Beds: ${room.numBeds}</p>
      <p class="booked-room__card__cost">${room.costPerNight} / Night</p>
      <button class="booked-room__card__btn btn" ${disableButton(room.dateBooked)}>Cancel Reservation</button>`;
    bookedRooms.append(section);
  });
};

const displayRewardsEarned = () => {
  const rewardsEarned = document.getElementById('rewardsEarned');
  const customerName = document.getElementById('customerName')
  rewardsEarned.innerText =
    `You have garnered ${customer.returnRewardsEarned(hotel)} points
    Total spent $${customer.returnTotalBookingCost(hotel)}`;
  customerName.innerText = `Welcome back ${customer.name.split('')[0]}!`
}


const compileFormData = (elements) => {
  const data = {
    date: elements[0].value.replace(/-/g, "/"),
    roomType: [],
    bedSize: [],
    numBeds: []
  };
  elements.forEach(element => {
    if(element.className.includes('room-type') && element.checked) {
      data.roomType.push(element.value);
    }
    if(element.className.includes('bed-size') && element.checked) {
      data.bedSize.push(element.value);
    }
    if(element.className.includes('number-of-beds') && element.checked) {
      data.numBeds.push(element.value);
    }
  });
  return data;
}

const retrieveFormValues = (e) => {
  const values = document.getElementById('searchForm');
  const data = compileFormData(Array.from(values.elements));
  return data;
}

const displaySearchResults = (e) => {
  e.preventDefault();
  const data = retrieveFormValues();
  const results = hotel.returnAllFilteredResults(data.date,
    data.roomType, data.bedSize, data.numBeds);
  const availableRooms = document.getElementById('availableRooms');
  availableRooms.innerHTML = "";
  availableRooms.innerHTML =
  `<h2 class="available-rooms__header"> Rooms available on ${data.date}</h2>`;
  results.forEach(result => {
    availableRooms.innerHTML +=
    `<section class="available-rooms__card" data-booking-data=${storeBookingData(data.date, result)} >
      <img src="./images/room-1.jpg" alt="Your next hotel room" class="available-rooms__card__img">
      <p class="available-rooms__card__room-number">Room ${result.number}</p>
      <p class="available-rooms__card__room-type">${result.roomType}</p>
      <p class="available-rooms__card__bed-size">${result.bedSize}</p>
      <p class="available-rooms__card__number-of-beds">${result.numBeds}</p>
      <p class="available-rooms__card__has-bidet">${result.bidet ? "Complimentary Bidet!" : ""}</p>
      <button class="available-rooms__card__book-btn book-now btn">Book Now</button>
    </section>`
  });
  document.location.href = '#availableRooms'
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
  if(e.target.className.includes('btn')) {
    data.bookRoom(JSON.parse(e.target.parentElement.dataset.bookingData))
      .then(response => response.json())
      .then(data => {
          hotel.bookings.push(data.newBooking)
          displayRooms();
          displayPointsEarned();
      })
      .catch(err => alert(err));
    e.target.parentElement.remove();
  }
}

const cancelReservation = (e) => {
  if(e.target.className.includes('btn')) {
    const id = e.target.parentElement.dataset.bookingID;
    data.cancelBooking(id)
      .then(response => response.json())
      .then(data =>  data)
      .catch(err => alert(err));
  }
  Promise.resolve(data.getData('bookings'))
    .then(values => {
      hotel.bookings = values;
      displayRooms();
      displayPointsEarned();
    });
}

const findUserID = (userName) => userName.replace("chateaux bekker", "");

const showMain = () => {
  const mainElements = document.querySelectorAll('.main-page');
  document.getElementById('loginPage').setAttribute('aria-hidden', 'true');
  mainElements.forEach(element => element.setAttribute('aria-hidden', 'false'));
}

const showLoginError = () => {
  const errorMessage = document.getElementById('errorMessage');
  errorMessage.setAttribute('aria-hidden', 'false');
}

const handleSearchEvents = (e) => {
  hideSearchDropDowns();
  if (e.target.closest('.clickable')) {
    const target = e.target.closest('.clickable').childNodes[3];
    target.setAttribute('aria-hidden', 'false');
  }
}


const closeSearchBar = (e) => {
  if (!e.target.closest('.search-bar')) {
    hideSearchDropDowns()
  }
}

const hideSearchDropDowns = () => {
  const menus = document.querySelectorAll('.drop-down-menu')
  menus.forEach(element => element.setAttribute('aria-hidden', 'true'))
}

document.getElementById('loginBtn').addEventListener('click', createUser)
window.onload = () =>  createHotel();
window.addEventListener('click', closeSearchBar);
window.addEventListener('scroll', hideSearchDropDowns);
searchButton.addEventListener('click', displaySearchResults);
availableRoomsSection.addEventListener('click', makeReservation);
bookedRooms.addEventListener('click', cancelReservation)
searchForm.addEventListener('click', handleSearchEvents)
