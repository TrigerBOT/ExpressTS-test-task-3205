import { Request, Response } from 'express';

const dataUsers = require('../data.json');
interface User {
  email: String;
  number: String;
}
/**
 * 
 * @route POST /api/user/
 * @desc Получить пользователя
 * @access Public
 */
const getUser = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    setTimeout(() => {
      const { email, number } = req.body;

      if (!email || !number) {
        return res.status(400).json({ message: 'Пожалуйста, заполните обязятельные поля!' });
      }

      const foundUser: User = dataUsers.find(
        (user: any) => user.email==email && user.number==number
      );
      if (foundUser==undefined) {
        return res.status(404).json({ message: 'Такой пользователь не был найден!' });
      }
      res.status(200).json(
       {data: foundUser }
      );
    }, 5000);
  } catch {
    return res.status(500).json({ message: 'Произошла ошибка на сервере' });
  }
};
export default getUser;
