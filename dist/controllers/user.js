"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataUsers = require('../data.json');
/**
 *
 * @route POST /api/user/
 * @desc Получить пользователя
 * @access Public
 */
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        setTimeout(() => {
            const { email, number } = req.body;
            if (!email || !number) {
                return res.status(400).json({ message: 'Пожалуйста, заполните обязятельные поля!' });
            }
            const foundUser = dataUsers.find((user) => user.email == email && user.number == number);
            if (foundUser == undefined) {
                return res.status(404).json({ message: 'Такой пользователь не был найден!' });
            }
            res.status(200).json({ data: foundUser });
        }, 5000);
    }
    catch (_a) {
        return res.status(500).json({ message: 'Произошла ошибка на сервере' });
    }
});
exports.default = getUser;
