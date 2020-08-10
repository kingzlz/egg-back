import { Application } from 'egg';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const videoSchema = new Schema(
    {
      uid: {
        type: String,
        required: true,
      },
      videoName: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    },
  );
  return mongoose.model('Videos', videoSchema);
};
