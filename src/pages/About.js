import { Fragment } from 'react';

const About = () => {
  return (
    <Fragment>
      <h1 className='text-6xl mb-4'>Github Spotter</h1>
      <p className='mb-4 text-2xl font-light'>
        A Front end React application to search GitHub profiles and see profile
        details. 
       <br></br>
        This project is a reboot of my
        <a href='https://github.com/GregPetropoulos/github-finder'>
          {' '}
          Github-Finder
        </a>{' '}
        using TailwindUI and daisyUI and the Context API with Hooks.
        <strong>
          <a href='https://www.gregpetropoulos.dev'> Greg Petropoulos</a>
        </strong>
        .
      </p>
      <p className='text-lg text-gray-400'>
        Version <span className='text-white'>1.0.0</span>
      </p>
    </Fragment>
  );
};

export default About;
