import { Application } from 'egg';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const fileSchema = new Schema(
    {
      uid: {
        type: String,
        default: '',
      },
      fileUrl: {
        type: String,
      },
      fileName: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    },
  );
  return mongoose.model('File', fileSchema);
};
