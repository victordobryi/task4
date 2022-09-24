import axios, { AxiosResponse } from 'axios';
import { IUser, IUserNoId } from '../store/reducers/auth';

export default class UserService {
  static async getUsers(): Promise<AxiosResponse<IUser[]>> {
    return axios.get<IUser[]>('https://server-task4.herokuapp.com/users');
  }
  static async getUser(id: string): Promise<AxiosResponse<IUser>> {
    return axios.get<IUser>(`https://server-task4.herokuapp.com/users/${id}`);
  }
  static async updateUser(
    newUser: IUser,
    id: number
  ): Promise<AxiosResponse<IUser>> {
    return axios.put(`https://server-task4.herokuapp.com/users/${id}`, newUser);
  }
  static async deleteUser(id: number): Promise<AxiosResponse<IUser>> {
    return axios.delete(`https://server-task4.herokuapp.com/users/${id}`);
  }
  static async addUser(newUser: IUserNoId): Promise<AxiosResponse<IUser>> {
    return axios.post('https://server-task4.herokuapp.com/users', newUser);
  }
}
