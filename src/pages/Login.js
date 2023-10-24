import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";


const Login = () => {
    const [loginData, setLoginData] = useState({})
    const [login, setLogin] = useState(null)

    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        setLoginData({
            ...loginData,
            [name]:value
        })
    }

    const onSubmit = async (e) => {
              e.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/login`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: 'POST',
                body: JSON.stringify(loginData)
            })
            const data = await response.json()

            if (data.token) {
                localStorage.setItem('loggedInUser', JSON.stringify(data.token))
                navigate('/home')
            }

            setLogin(data)
        } catch (error) {
            console.log(error)
        }
    }

    const redirectForLoginWithGithub = () => {
      window.location.href = `${process.env.REACT_APP_SERVER_BASE_URL}/auth/github`;
    }
    
  
//<button onClick={() => redirectHandler()}> </button>


  return (
    <>
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6" onSubmit={onSubmit}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            onChange={handleInputChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
            Password
          </label>
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            onChange={handleInputChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-sara-dark px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Accedi!
        </button>
      </div>
    </form>
    <button 
     className="flex w-full justify-center rounded-md bg-sara-dark px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => redirectForLoginWithGithub()}>
      Accedi con Github
    </button>
    </div>
    </>
  )
};

export default Login;
