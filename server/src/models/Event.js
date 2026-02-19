import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: String,
  type: String,
  date_time: Date,
  venue: String,
  description: String,
  status: { type: String, enum: ['upcoming', 'ended'], default: 'upcoming' },
  partners: [{ name: String, logo: String }],
  banner_image: String,
  images: [String],
  report_link: String,
  recording_link: String,
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'Society', required: true },
  created_at: { type: Date, default: Date.now },
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
