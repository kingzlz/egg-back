import { Application } from 'egg';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const menuSchema = new Schema(
    {
      pid: {
        type: String,
        default: '',
      },
      text: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
        required: true,
      },
      group: {
        type: Boolean,
        required: true,
        default: true,
      },
      hideInBreadcrumb: {
        type: Boolean,
        required: true,
        default: true,
      },
      children: {
        type: Array,
        default: [],
      },
      link: {
        type: String,
      },
      i18n: {
        type: String,
      },
      sort: {
        type: Number,
      },
      menuId: {
        type: String,
      },
    },
    {
      timestamps: true,
    },
  );
  return mongoose.model('Menus', menuSchema);
};
