import { Link } from 'react-router-dom';
import { Button, Navbar, Typography } from '@material-tailwind/react';

export default function NavBar() {
  const navList = (
    <ul className='mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6'>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='flex items-center gap-x-2 p-1 font-medium'
      >
        <svg
          width='20'
          height='20'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z'
            fill='#90A4AE'
          />
        </svg>

        <Link to='/tasks/create' className='flex items-center'>
          What to do?
        </Link>
      </Typography>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='flex items-center gap-x-2 p-1 font-medium'
      >
        <svg
          width='20'
          height='20'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75'
            fill='#90A4AE'
          />
        </svg>
        <Link to='/tasks/get' className='flex items-center'>
          Doing rn...
        </Link>
      </Typography>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='flex items-center gap-x-2 p-1 font-medium'
      >
        <svg
          width='20'
          height='20'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3'
            fill='#90A4AE'
          />
        </svg>
        <Link to='/tasks/update' className='flex items-center'>
          Changed my mind, I wanna...
        </Link>
      </Typography>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='flex items-center gap-x-2 p-1 font-medium'
      >
        <svg
          width='20'
          height='20'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
            fill='#90A4AE'
          />
        </svg>
        <Link to='/tasks/delete' className='flex items-center'>
          I don&apos;wanna...
        </Link>
      </Typography>
    </ul>
  );

  return (
    <Navbar className='mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4 bg-blue-600 hover:bg-red-500'>
      <div className='container mx-auto flex items-center justify-between text-blue-gray-900'>
        <Typography className='mr-4 cursor-pointer py-1.5 font-medium'>
          <Link to='/'>Tomomi :3</Link>
        </Typography>
        <div className='hidden lg:block'>{navList}</div>
        <div className='flex items-center gap-x-1'>
          <Link to='/'>
            <Button variant='text' size='sm' className='hidden lg:inline-block'>
              <span>Logout ?</span>
            </Button>
          </Link>
        </div>
      </div>
    </Navbar>
  );
}
