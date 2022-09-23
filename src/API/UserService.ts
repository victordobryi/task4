import axios, { AxiosResponse } from 'axios';
import { IUser, IUserNoId } from '../store/reducers/auth';

export default class UserService {
  static async getUsers(): Promise<AxiosResponse<IUser[]>> {
    return axios.get<IUser[]>('http://localhost:5000/users');
  }
  static async getUser(id: string): Promise<AxiosResponse<IUser>> {
    return axios.get<IUser>(`http://localhost:5000/users/${id}`);
  }
  static async updateUser(
    newUser: IUser,
    id: number
  ): Promise<AxiosResponse<IUser>> {
    return axios.put(`http://localhost:5000/users/${id}`, newUser);
  }
  static async deleteUser(id: number): Promise<AxiosResponse<IUser>> {
    return axios.delete(`http://localhost:5000/users/${id}`);
  }
  static async addUser(newUser: IUserNoId): Promise<AxiosResponse<IUser>> {
    return axios.post('http://localhost:5000/users/', newUser);
  }
}
