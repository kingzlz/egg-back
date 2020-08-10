import { Service } from 'egg';
export interface RegisterUser {
  name: string;
  password: string;
}
export default class AdminService extends Service {
  public async find(query = {}) {
    const { ctx } = this;
    const data = await ctx.model.User.find(query);
    return {
      data,
    };
  }


  public async register(params: RegisterUser) {
    const result = new this.app.model.User(params);
    await result.save();
    return result;
  }
}
