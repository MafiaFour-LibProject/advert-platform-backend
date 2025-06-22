const app = require('./app');
const connectDB = require('./src/config/db');
const dotenv = require('dotenv');

dotenv.config();
connectDB();


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});