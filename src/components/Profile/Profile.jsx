import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = ({ onAuth }) => {
  return (
    <div>
      <b>Profile</b> — компонент страницы изменения профиля.
      <Link
        to='/'
        className='login__link'
        onClick={onAuth}
      >
        ВЫЙТИ
      </Link>
    </div>
  );
}

export default Profile;
