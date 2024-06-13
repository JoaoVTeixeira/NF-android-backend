const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

const reservaSchema = new mongoose.Schema({
  numero: { type: Number, required: true },
  barbeiro: { type: String, required: true },
  cliente: { type: String, required: true },
  corte: { type: String, required: true },
  data: { type: Date, required: true },
  horas: { type: String, required: true },
  valortotal: { type: Number, required: true },
  observacao: { type: String, required: true },
  unidade: { type: String, required: true },
  status: { type: String, required: true }
});

const ReservaModel = mongoose.model('Reservas', reservaSchema);

// Function to generate a random time within a given range
function generateRandomTime(startHour, endHour) {
  const randomHour = faker.number.int({ min: startHour, max: endHour });
  return `${randomHour}:00`;
}

// Function to generate random documents within the same day with different hours
async function generateRandomData() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/reservas', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const documents = [];

    const currentDate = new Date();

    for (let i = 0; i < 5; i++) {
      const randomHour = generateRandomTime(9, 21);
      const startTime = `${randomHour}`;

      const document = {
        numero: faker.number.int(),
        barbeiro: faker.person.firstName(),
        cliente: faker.person.firstName(),
        corte: faker.lorem.word(),
        data: currentDate,
        horas: `${startTime}`,
        valortotal: faker.number.int({ min: 50, max: 100 }),
        observacao: faker.lorem.sentence(),
        unidade: faker.lorem.word(),
        status: 'Active'
      };

      documents.push(document);
    }

    await ReservaModel.insertMany(documents);
    console.log('Random data generated successfully');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error generating random data:', error);
  }
}

generateRandomData();