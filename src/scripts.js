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
    .then(values => hotel = new Hotel("overLook", values[0], values[1], values[2]));
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
