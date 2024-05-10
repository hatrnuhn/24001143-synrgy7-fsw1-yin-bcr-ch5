import mongoose from 'mongoose';

export const connectToDB = async (uri: string) => {
    try {
        // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
        await mongoose.connect(uri);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
      } catch (err) {
        // Ensures that the client will close when you error
        await mongoose.disconnect();
      }  
}