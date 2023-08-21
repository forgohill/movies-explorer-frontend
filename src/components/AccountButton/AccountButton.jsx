import React from 'react';
import { Link } from 'react-router-dom'
import './AccountButton.css';

const AccountButton = ({ isChecked, togleChecked }) => {
  return (
    <Link
      onClick={togleChecked}
      to='/profile'
      className='profile-btn__link
      profile-btn__link_account
      links__hover'>
      <div className='profile-btn__icon-account'></div>
      Аккаунт
    </Link>
  );
}

export default AccountButton;
