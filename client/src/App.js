import logo from './logo.svg';
import './App.css';
import logo2 from './Node.svg';

import { useEffect, useRef, useState } from 'react';
import InputMask from 'react-input-mask';

import Loader from '../src/components/Loader/Loader';

function App() {
  const controller = new AbortController();
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isFound, setisFound] = useState(true);
  const [user, setUser] = useState({});
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const abortControllerRef = useRef(null);
  const [emailErrorValidation, setEmailErrorValidation] = useState('');
  function checkValid(box) {
    return box == '' || box == '__-__-__' ? false : true;
  }
  function searchHandler() {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();
    setIsLoading(true);
    let userNumber = number.split('-').join('');
    const userEmail = email;
    let data = { email: userEmail, number: userNumber };

    try {
      fetch(`http://localhost:8000/api/user`, {
        signal: abortControllerRef.current.signal,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            setIsEmpty(true);
            setIsLoading(false);
            setisFound(false);
          } else {
            setUser(data.data);
            setisFound(true);
            setIsEmpty(false);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Предыдущий запрос отменен');
      } else {
        console.log('Ошибка при выполнении запроса:', error.message);
      }
    }
  }
  useEffect(() => {
    if (checkValid(number) && isEmailValid(email)) {
      setIsValid(true);
    } else {
      
      setIsValid(false);
    }
  }, [number, email]);
  const handleInput = ({ target: { value } }) => {
    setNumber(value);
  };
  function isEmailValid(value) {
    return EMAIL_REGEXP.test(value);
  }
  const handleInputEmail = ({ target: { value } }) => {
    setEmail(value);
    if (isEmailValid(value)) {
      setEmailErrorValidation('');
    } else {
      setEmailErrorValidation('Введите email');
    }
    
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <img src={logo2} className="App-logo" alt="logo" />
        <h1>Поиск user по email и number</h1>
      </header>
      <div className="container">
        <p className="instruction">Введите данные в поля</p>
        {isValid ? null : (
          <>
            <p>Оба поля не должны быть пустыми!</p>
          </>
        )}
        <form>
        <label for="email">{emailErrorValidation}</label>
          <div className="inputs">
           
            <input
              type="text"
              className="input mr-10"
              name="email"
              placeholder="Введите email"
              onChange={handleInputEmail}
            />
            <InputMask
              className="input"
              mask="99-99-99"
              value={number}
              onChange={handleInput}
              placeholder="Введите номер"></InputMask>
          </div>
          {isValid ? (
            <button type="button" className="form__button" onClick={searchHandler}>
              ПОИСК
            </button>
          ) : (
            <button type="button" disabled className="form__button" onClick={searchHandler}>
              ПОИСК
            </button>
          )}
        </form>
        {isLoading && <Loader />}
      </div>
      <div className="container">
        {isEmpty ? null : (
          <div>
            <h3>Информация о пользователе</h3>
            <p>Почта - {user.email}</p>
            <p>Номер - {user.number}</p>
          </div>
        )}
        {isFound ? null : (
          <>
            <h3>Пользователь не был найден</h3>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
