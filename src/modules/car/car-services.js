import { Car } from './car-model.js';

const createCar = async (req, res) => {
  const { make, model, color, registrationNo, category } = req.body;
  try {
    const newCar = new Car({
      category: category,
      color: color,
      model: model,
      make: make,
      registration_no: registrationNo,
    });
    await newCar.save();
    res.status(200).json({
      msg: 'Car was registered successfully!',
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const getAllCars = async (req, res) => {
  try {
    const { item, page } = req.body;
    const query = { category: item };
    const pageNumber = parseInt(page) || 1;
    const itemsPerPage = 4;
    const skip = (pageNumber - 1) * itemsPerPage;
    const totalCount = await Car.countDocuments(query);
    const cars = await Car.find(query).skip(skip).limit(itemsPerPage);

    if (!cars || cars.length === 0) {
      return res.status(400).json({ msg: 'No car available for the selected category' });
    }

    res.json({ cars, totalCount, msg: 'Cars' });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const deleteCar = async (req, res) => {
  try {
    const { _id } = req.body;
    console.log(_id);
    const deletedCar = await Car.findByIdAndDelete(_id);
    if (!deletedCar) return res.status(404).json({ msg: 'Car not found' });
    return res.json({ msg: 'Car deleted successfully' });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const updateCar = async (req, res) => {
  try {
    const { _id, updates } = req.body;
    const updatedCar = await Car.findByIdAndUpdate(_id, updates, { new: true });
    if (!updatedCar) return res.status(404).json({ msg: 'Car not found' });
    return res.json({ updatedCar, msg: 'Car updated successfully' });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
const getCar = async (req, res) => {
  try {
    const carId = req.params.id;
    const car = await Car.findById(carId);
    if (!car) return res.status(404).json({ msg: 'Car not found' });
    res.json({ car });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export { createCar, getCar, deleteCar, updateCar, getAllCars };
