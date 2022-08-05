import './css/styles.css';
import Hotel from './Hotel';
import Guest from './Guest';
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
