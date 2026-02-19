import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  name: String,
  email: String,
  whatsapp_number: String,
  cnic: String,
  qualification: String,
  designation: String,
  institute: String,
  field_of_study: String,
  reason_for_attending: String,
  consent: Boolean,
  attended: { type: Boolean, default: false },
  registered_at: { type: Date, default: Date.now },
});


const Registration = mongoose.model('Registration', registrationSchema);

export default Registration;
