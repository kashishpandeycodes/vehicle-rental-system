import React, { useEffect, useState } from 'react';
import axios from 'axios';

// 20 Premium Vehicles with Correct High-Res Unsplash Images
const initialVehicles = [
  { _id: "1", name: "Mahindra Thar 4x4", type: "Car", category: "SUV", pricePerDay: 2500, rating: 4.8, reviews: 142, image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&auto=format&fit=crop", isAvailable: true },
  { _id: "2", name: "Fortuner Legender", type: "Car", category: "SUV", pricePerDay: 4500, rating: 4.9, reviews: 98, image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&auto=format&fit=crop", isAvailable: true },
  { _id: "3", name: "Range Rover Defender", type: "Car", category: "Luxury SUV", pricePerDay: 12000, rating: 5.0, reviews: 65, image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&auto=format&fit=crop", isAvailable: true },
  { _id: "4", name: "Tata Harrier Dark", type: "Car", category: "SUV", pricePerDay: 2800, rating: 4.6, reviews: 88, image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop", isAvailable: false },
  
  { _id: "5", name: "BMW Z4 Convertible", type: "Car", category: "Sports", pricePerDay: 8500, rating: 4.9, reviews: 54, image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&auto=format&fit=crop", isAvailable: true },
  { _id: "6", name: "Mercedes-AMG G63", type: "Car", category: "Luxury SUV", pricePerDay: 15000, rating: 5.0, reviews: 40, image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?w=600&auto=format&fit=crop", isAvailable: true },
  { _id: "7", name: "Audi Q7 Matrix", type: "Car", category: "Luxury SUV", pricePerDay: 9500, rating: 4.7, reviews: 72, image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=600&auto=format&fit=crop", isAvailable: true },
  { _id: "8", name: "Porsche 911 Carrera", type: "Car", category: "Sports", pricePerDay: 18000, rating: 5.0, reviews: 31, image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop", isAvailable: false },
  { _id: "9", name: "Ford Mustang GT", type: "Car", category: "Sports", pricePerDay: 11000, rating: 4.9, reviews: 110, image: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=600&auto=format&fit=crop", isAvailable: true },

  { _id: "10", name: "Honda City Elegant", type: "Car", category: "Sedan", pricePerDay: 1800, rating: 4.5, reviews: 190, image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=600&auto=format&fit=crop", isAvailable: true },
  { _id: "11", name: "Hyundai Verna Turbo", type: "Car", category: "Sedan", pricePerDay: 2000, rating: 4.6, reviews: 135, image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&auto=format&fit=crop", isAvailable: true },

  { _id: "12", name: "Royal Enfield Bullet 350", type: "Bike", category: "Classic", pricePerDay: 900, rating: 4.8, reviews: 230, image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop", isAvailable: true },
  { _id: "13", name: "Royal Enfield Hunter 350", type: "Bike", category: "Cruiser", pricePerDay: 850, rating: 4.7, reviews: 160, image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop", isAvailable: true },
  { _id: "14", name: "Jawa Perak Bobber", type: "Bike", category: "Cruiser", pricePerDay: 1100, rating: 4.6, reviews: 94, image: "https://images.unsplash.com/photo-1558980827-067df45c48f6?w=600&auto=format&fit=crop", isAvailable: true },
  { _id: "15", name: "Harley-Davidson Iron 883", type: "Bike", category: "Cruiser", pricePerDay: 3500, rating: 4.9, reviews: 82, image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop", isAvailable: false },

  { _id: "16", name: "Kawasaki Ninja ZX-10R", type: "Bike", category: "Sports Bike", pricePerDay: 4500, rating: 4.9, reviews: 115, image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&auto=format&fit=crop", isAvailable: true },
  { _id: "17", name: "BMW S1000RR Superbike", type: "Bike", category: "Sports Bike", pricePerDay: 6000, rating: 5.0, reviews: 78, image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600&auto=format&fit=crop", isAvailable: true },
  { _id: "18", name: "KTM Duke 390", type: "Bike", category: "Sports Bike", pricePerDay: 1200, rating: 4.5, reviews: 210, image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&auto=format&fit=crop", isAvailable: true },
  { _id: "19", name: "Yamaha R15 V4", type: "Bike", category: "Sports Bike", pricePerDay: 800, rating: 4.6, reviews: 310, image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600&auto=format&fit=crop", isAvailable: true },
  { _id: "20", name: "Ducati Panigale V4", type: "Bike", category: "Sports Bike", pricePerDay: 7500, rating: 5.0, reviews: 45, image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&auto=format&fit=crop", isAvailable: true }
];

function App() {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(18000);
  const [sortBy, setSortBy] = useState('default');
  const [selectedCity, setSelectedCity] = useState('Delhi NCR');
  
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({ name: '', phone: '', pickupDate: '', returnDate: '' });
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [bookedSuccess, setBookedSuccess] = useState(false);
  const [myBookings, setMyBookings] = useState([]);
  const [showBookingsModal, setShowBookingsModal] = useState(false);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/vehicles')
      .then(res => {
        if (res.data && res.data.length >= 5) setVehicles(res.data);
      })
      .catch(() => console.log("Loaded local high quality dataset"));
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const calculateDays = () => {
    if (!bookingDetails.pickupDate || !bookingDetails.returnDate) return 1;
    const start = new Date(bookingDetails.pickupDate);
    const end = new Date(bookingDetails.returnDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
  };

  const calculateTotalCost = () => {
    if (!selectedVehicle) return 0;
    const baseCost = calculateDays() * selectedVehicle.pricePerDay;
    return discountApplied ? Math.round(baseCost * 0.9) : baseCost;
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'FIRSTDRIVE') {
      setDiscountApplied(true);
      triggerToast("🎉 10% Discount Applied!");
    } else {
      triggerToast("❌ Invalid Coupon Code. Try 'FIRSTDRIVE'");
    }
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const totalDays = calculateDays();
    const totalCost = calculateTotalCost();

    const newBooking = {
      id: Date.now(),
      vehicleName: selectedVehicle.name,
      price: totalCost,
      days: totalDays,
      city: selectedCity,
      pickupDate: bookingDetails.pickupDate,
      returnDate: bookingDetails.returnDate,
      customerName: bookingDetails.name
    };
    
    setMyBookings([...myBookings, newBooking]);
    setBookedSuccess(true);
    triggerToast(`Booking Confirmed for ${selectedVehicle.name}!`);
    
    setTimeout(() => {
      setBookedSuccess(false);
      setSelectedVehicle(null);
      setDiscountApplied(false);
      setCouponCode('');
      setBookingDetails({ name: '', phone: '', pickupDate: '', returnDate: '' });
    }, 2000);
  };

  const filteredVehicles = vehicles
    .filter(v => {
      const matchesFilter = filter === 'All' ? true : v.type === filter;
      const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            v.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = v.pricePerDay <= maxPrice;
      return matchesFilter && matchesSearch && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'lowToHigh') return a.pricePerDay - b.pricePerDay;
      if (sortBy === 'highToLow') return b.pricePerDay - a.pricePerDay;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div style={{ backgroundColor: '#090d16', color: '#f8fafc', minHeight: '100vh', fontFamily: "'Inter', system-ui, sans-serif", paddingBottom: '3rem' }}>
      
      {/* Toast Alert */}
      {toastMessage && (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: '#38bdf8', color: '#0f172a', padding: '0.8rem 1.5rem', borderRadius: '12px', fontWeight: 'bold', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', zIndex: 2000 }}>
          {toastMessage}
        </div>
      )}

      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1.2rem 4rem', backgroundColor: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid rgba(255,255,255,0.08)', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '1.8rem' }}>⚡</span>
          <h1 style={{ margin: 0, fontSize: '1.4rem', color: '#38bdf8', fontWeight: '800', letterSpacing: '-0.5px' }}>DriveEase <span style={{ color: '#fff', fontWeight: '300' }}>Rentals</span></h1>
        </div>

        {/* All States/UTs Location Selector & Bookings Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: '#1e293b', padding: '0.4rem 0.8rem', borderRadius: '20px', border: '1px solid #334155' }}>
            <span style={{ fontSize: '0.9rem' }}>📍</span>
            <select 
              value={selectedCity} 
              onChange={e => { setSelectedCity(e.target.value); triggerToast(`Location set to ${e.target.value}`); }}
              style={{ backgroundColor: '#1e293b', color: '#38bdf8', border: 'none', outline: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem' }}
            >
              <option value="Delhi NCR">Delhi NCR</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Jammu & Kashmir">Jammu & Kashmir</option>
              <option value="Ladakh">Ladakh</option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Puducherry">Puducherry</option>
              <option value="Andaman & Nicobar">Andaman & Nicobar</option>
            </select>
          </div>

          <button 
            onClick={() => setShowBookingsModal(true)}
            style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', border: '1px solid #38bdf8', padding: '0.6rem 1.4rem', borderRadius: '30px', color: '#38bdf8', fontWeight: '600', cursor: 'pointer' }}
          >
            📋 My Bookings ({myBookings.length})
          </button>
        </div>
      </nav>

      {/* Hero Banner */}
      <div style={{ textAlign: 'center', padding: '3.5rem 1rem 1.5rem 1rem', background: 'radial-gradient(circle at top, #1e293b 0%, #090d16 100%)' }}>
        <span style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
          🎁 Use coupon <strong style={{ color: '#fff' }}>FIRSTDRIVE</strong> for 10% OFF
        </span>
        <h2 style={{ fontSize: '2.8rem', margin: '0.8rem 0 0.4rem 0', fontWeight: '800', letterSpacing: '-1px' }}>Find Your Ride in {selectedCity}</h2>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 1.5rem auto' }}>Rent top-class cars & bikes at affordable daily rates.</p>

        {/* Search Bar */}
        <div style={{ maxWidth: '520px', margin: '0 auto 1.5rem auto' }}>
          <input 
            type="text" 
            placeholder="🔍 Search Thar, Defender, BMW, Bullet..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '0.85rem 1.2rem', borderRadius: '12px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', outline: 'none', fontSize: '1rem', boxShadow: '0 4px 20px rgba(0,0,0,0.4)', boxSizing: 'border-box' }}
          />
        </div>

        {/* Type Filter Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
          {['All', 'Car', 'Bike'].map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                backgroundColor: filter === cat ? '#38bdf8' : '#1e293b',
                color: filter === cat ? '#0f172a' : '#cbd5e1',
                border: 'none',
                padding: '0.6rem 1.6rem',
                borderRadius: '30px',
                cursor: 'pointer',
                fontWeight: '700'
              }}
            >
              {cat === 'All' ? '🔥 All Rides' : cat === 'Car' ? '🚗 Cars' : '🏍️ Bikes'}
            </button>
          ))}
        </div>

        {/* Price Slider & Sort Controls */}
        <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#0f172a', padding: '1rem 1.5rem', borderRadius: '12px', border: '1px solid #1e293b', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flex: 1, minWidth: '250px' }}>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Max Price: <strong style={{ color: '#38bdf8' }}>₹{maxPrice}</strong></span>
            <input 
              type="range" 
              min="800" 
              max="18000" 
              step="500" 
              value={maxPrice} 
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ flex: 1, accentColor: '#38bdf8', cursor: 'pointer' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Sort By:</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              style={{ backgroundColor: '#1e293b', color: '#fff', border: '1px solid #334155', padding: '0.4rem 0.8rem', borderRadius: '8px', cursor: 'pointer', outline: 'none' }}
            >
              <option value="default">Default</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
              <option value="rating">Top Rated ⭐</option>
            </select>
          </div>
        </div>
      </div>

      {/* Vehicle Grid */}
      <div style={{ padding: '2rem 4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        {filteredVehicles.map(v => (
          <div key={v._id} style={{ backgroundColor: '#0f172a', borderRadius: '16px', overflow: 'hidden', border: '1px solid #1e293b', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }}>
            
            <div style={{ position: 'relative' }}>
              <img src={v.image} alt={v.name} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
              <span style={{ position: 'absolute', top: '12px', right: '12px', fontSize: '0.75rem', padding: '0.3rem 0.8rem', borderRadius: '20px', backgroundColor: v.isAvailable ? 'rgba(16, 185, 129, 0.9)' : 'rgba(239, 68, 68, 0.9)', color: '#fff', fontWeight: 'bold' }}>
                {v.isAvailable ? 'Available' : 'Booked'}
              </span>
              <span style={{ position: 'absolute', bottom: '12px', left: '12px', fontSize: '0.75rem', padding: '0.25rem 0.7rem', borderRadius: '8px', backgroundColor: 'rgba(15, 23, 42, 0.85)', color: '#38bdf8', fontWeight: '600', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                {v.category}
              </span>
            </div>

            <div style={{ padding: '1.2rem' }}>
              <h3 style={{ margin: '0 0 0.3rem 0', fontSize: '1.15rem', fontWeight: '700' }}>{v.name}</h3>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.8rem' }}>
                <span style={{ color: '#f59e0b', fontSize: '0.85rem' }}>⭐ {v.rating}</span>
                <span style={{ color: '#64748b', fontSize: '0.8rem' }}>({v.reviews} reviews)</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.2rem' }}>
                <p style={{ color: '#38bdf8', fontSize: '1.4rem', fontWeight: '800', margin: 0 }}>
                  ₹{v.pricePerDay} <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 'normal' }}>/ day</span>
                </p>
              </div>

              <button 
                disabled={!v.isAvailable}
                onClick={() => setSelectedVehicle(v)}
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: v.isAvailable ? '#38bdf8' : '#334155',
                  color: v.isAvailable ? '#0f172a' : '#94a3b8',
                  fontWeight: '700',
                  cursor: v.isAvailable ? 'pointer' : 'not-allowed',
                  fontSize: '0.95rem'
                }}
              >
                {v.isAvailable ? 'Book This Ride' : 'Currently Rented'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Form Modal */}
      {selectedVehicle && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#0f172a', padding: '2rem', borderRadius: '20px', width: '90%', maxWidth: '440px', border: '1px solid #1e293b', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)' }}>
            {bookedSuccess ? (
              <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎉</div>
                <h2 style={{ fontSize: '1.6rem', color: '#10b981', margin: '0 0 0.5rem 0' }}>Booking Confirmed!</h2>
                <p style={{ color: '#94a3b8' }}>Your reservation for <strong>{selectedVehicle.name}</strong> in {selectedCity} is locked in.</p>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Book {selectedVehicle.name}</h3>
                  <button onClick={() => setSelectedVehicle(null)} style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>
                </div>
                
                <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'block', marginBottom: '0.3rem' }}>Full Name</label>
                    <input required type="text" value={bookingDetails.name} onChange={e => setBookingDetails({...bookingDetails, name: e.target.value})} placeholder="Your Name" style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#1e293b', color: '#fff', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'block', marginBottom: '0.3rem' }}>Phone Number</label>
                    <input required type="tel" value={bookingDetails.phone} onChange={e => setBookingDetails({...bookingDetails, phone: e.target.value})} placeholder="9876543210" style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#1e293b', color: '#fff', boxSizing: 'border-box' }} />
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                    <div>
                      <label style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'block', marginBottom: '0.3rem' }}>Pickup Date</label>
                      <input required type="date" value={bookingDetails.pickupDate} onChange={e => setBookingDetails({...bookingDetails, pickupDate: e.target.value})} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#1e293b', color: '#fff', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'block', marginBottom: '0.3rem' }}>Return Date</label>
                      <input required type="date" value={bookingDetails.returnDate} onChange={e => setBookingDetails({...bookingDetails, returnDate: e.target.value})} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#1e293b', color: '#fff', boxSizing: 'border-box' }} />
                    </div>
                  </div>

                  {/* Coupon Field */}
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.2rem' }}>
                    <input 
                      type="text" 
                      placeholder="Coupon (e.g. FIRSTDRIVE)" 
                      value={couponCode} 
                      onChange={e => setCouponCode(e.target.value)} 
                      style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#1e293b', color: '#fff', fontSize: '0.85rem' }} 
                    />
                    <button type="button" onClick={applyCoupon} style={{ backgroundColor: '#334155', color: '#38bdf8', border: 'none', padding: '0.5rem 0.9rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}>Apply</button>
                  </div>

                  {/* Bill Summary */}
                  <div style={{ backgroundColor: '#1e293b', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #334155', marginTop: '0.3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'block' }}>Total ({calculateDays()} Days):</span>
                      {discountApplied && <span style={{ fontSize: '0.75rem', color: '#10b981' }}>10% Coupon Discount Applied!</span>}
                    </div>
                    <span style={{ fontSize: '1.3rem', fontWeight: '800', color: '#38bdf8' }}>₹{calculateTotalCost()}</span>
                  </div>

                  <button type="submit" style={{ backgroundColor: '#38bdf8', color: '#0f172a', fontWeight: '800', border: 'none', padding: '0.85rem', borderRadius: '10px', cursor: 'pointer', marginTop: '0.3rem', fontSize: '1rem' }}>
                    Confirm Booking (₹{calculateTotalCost()})
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* My Bookings Modal */}
      {showBookingsModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#0f172a', padding: '2rem', borderRadius: '20px', width: '90%', maxWidth: '500px', border: '1px solid #1e293b' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0 }}>📋 Reserved Bookings</h3>
              <button onClick={() => setShowBookingsModal(false)} style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>
            </div>
            {myBookings.length === 0 ? (
              <p style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem 0' }}>No bookings made yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '350px', overflowY: 'auto' }}>
                {myBookings.map(b => (
                  <div key={b.id} style={{ backgroundColor: '#1e293b', padding: '1rem', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #334155' }}>
                    <div>
                      <h4 style={{ margin: '0 0 0.3rem 0', color: '#38bdf8' }}>{b.vehicleName}</h4>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#cbd5e1' }}>📍 {b.city} | {b.pickupDate} to {b.returnDate}</p>
                      <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.75rem', color: '#94a3b8' }}>Name: {b.customerName}</p>
                    </div>
                    <span style={{ fontWeight: 'bold', color: '#10b981', fontSize: '1.1rem' }}>₹{b.price}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default App;