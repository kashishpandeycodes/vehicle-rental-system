const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/vehicleRentalDB')
  .then(() => console.log('MongoDB Connected Successfully!'))
  .catch(err => console.log(err));

// Vehicle Schema & Model
const vehicleSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  image: String
});
const Vehicle = mongoose.model('Vehicle', vehicleSchema);

// Booking Schema & Model
const bookingSchema = new mongoose.Schema({
  vehicleName: String,
  userName: String,
  rentalDays: Number,
  totalPrice: Number
});
const Booking = mongoose.model('Booking', bookingSchema);

// 1. Get all vehicles API
app.get('/api/vehicles', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    if (vehicles.length === 0) {
      const defaultVehicles = [
        { name: 'Royal Enfield Bullet 350', type: 'Motorcycle', price: 1200, image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39' },
        { name: 'Honda City', type: 'Car', price: 2500, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d' },
        { name: 'Yamaha R15', type: 'Sportbike', price: 1500, image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87' }
      ];
      await Vehicle.insertMany(defaultVehicles);
      return res.json(defaultVehicles);
    }
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Book a vehicle API
app.post('/api/bookings', async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json({ message: 'Booking successful!', newBooking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});