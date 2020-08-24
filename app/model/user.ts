import { Application } from 'egg';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const userSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
      },
      nickName: {
        type: String,
        default: '游客',
      },
      email: {
        type: String,
      },
      avatar: {
        type: String,
      },
      area: {
        type: String,
      },
    },
    {
      timestamps: true,
    },
  );
  return mongoose.model('Users', userSchema);
};
