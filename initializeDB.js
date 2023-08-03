const mongoose = require('mongoose');
const OrderCustomerStatus = require('./src/models/orderCustomerStatus');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

async function initializeDB() {
    try {
        mongoose
            .connect(process.env.MONGODB_URI)
            .then(() => console.log("Connected to MongoDB Atlas"))
            .catch((error) => console.error(error));

        // orderCustomerStatus 
        await OrderCustomerStatus.deleteMany({});
        await OrderCustomerStatus.create({ name: 'Created', dateCreated: new Date(), createdBy: 0 });
        await OrderCustomerStatus.create({ name: 'Removed', dateCreated: new Date(), createdBy: 0 });
        await OrderCustomerStatus.create({ name: 'Getting ready', dateCreated: new Date(), createdBy: 0 });
        await OrderCustomerStatus.create({ name: 'On the way', dateCreated: new Date(), createdBy: 0 });
        await OrderCustomerStatus.create({ name: 'Delivered', dateCreated: new Date(), createdBy: 0 });

        console.log('Database initialized');
    } catch (error) {
        console.error(error);
    } finally {
        mongoose.connection.close();
    }
}

initializeDB();
