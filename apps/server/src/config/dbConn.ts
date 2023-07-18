import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const db= process.env.DATABASE;


const connectDB = async () => {
    try {
        if(db){
            await connect(db);
        }
    } catch (err) {
      console.log(err);
    }
  };
  export {connectDB}