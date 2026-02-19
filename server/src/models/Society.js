import mongoose from 'mongoose';

const societySchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  name: String,
  logo: String,      
  banner: String,     
  about: String,
  mission: String,
  faculty_advisor: String,
  team: [
    {
      name: String,
      role: String,
      email: String,
      contact: String,
      image: String,  
    }
  ],
});

const Society = mongoose.model('Society', societySchema);

export default Society;