import React from 'react'
import { Link } from 'react-router-dom';
import "./FormRequest.css"; 

const FormRequest = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-16 ">
      <div className='w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 '>
        <h1 className='text-xl text-center font-bold text-gray-900 md:text-2xl '>
          Form Request Account
        </h1>
        <form className='space-y-6 mt-5' action='#'>
          <div className="flex justify-center items-center h-[50px] text-gray-900 font-medium">
            Are you Admin? <input type="checkbox" id="switch" class="switch-input" />
            <label for="switch" class="switch"></label>
          </div>
          <div>
            <label
              className='block mb-2 text-sm font-medium text-gray-900 '
            >
              Student name
            </label>
            <input
              type='text'
              name='email'
              id='email'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
              placeholder='Name.....'
              required={true}
            />
          </div>
          <div>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-900 '
            >
              ID Student
            </label>
            <input
              type='text'
              name='id'
              id='email'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
              placeholder='ITITIUXXXXX'
              required={true}
            />
          </div>
          <div>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-900 '
            >
              Email
            </label>
            <input
              type='email'
              name='email'
              id='email'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
              placeholder='name@gmail.com'
              required={true}
            />
          </div>
          <div>
            <label
              htmlFor='password'
              className='block mb-2 text-sm font-medium text-gray-900 '
            >
              Password
            </label>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='••••••••'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
              required={true}
            />
          </div>
          <div>
            <label
              htmlFor='confirm-password'
              className='block mb-2 text-sm font-medium text-gray-900 '
            >
              Confirm Password
            </label>
            <input
              type='confirm-password'
              name='confirm-password'
              id='confirm-password'
              placeholder='••••••••'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
              required={true}
            />
          </div>
          <div className='flex items-start'>
            <div className='flex items-center h-5'>
              <input
                id='terms'
                aria-describedby='terms'
                type='checkbox'
                className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                required={true}
              />
            </div>
            <div className='ml-3 text-sm'>
              <label
                htmlFor='terms'
                className='font-light text-gray-500 dark:text-gray-300'
              >
                I accept the{" "}
                <a
                  className='font-medium text-primary-600 text-blue-700 hover:underline dark:text-blue-500'
                  href='#'
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>
          <button
            type='submit'
            className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Send Request
          </button>
          <div className='text-sm font-medium text-gray-500 dark:text-gray-300'>
            Not registered?{" "}
            <Link
              to="/login"
              className='text-blue-700 hover:underline dark:text-blue-500'
            >
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormRequest