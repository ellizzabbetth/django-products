import { Fragment, useContext, useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/user.context';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../contexts/cart.context'

import axios from 'axios';
import './navigation.styles.scss';

const Navigation = () => {

  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  let navigate = useNavigate();

  const signOutHandler = async (e) => {
    console.log(currentUser)
    // await signOutUser();
    // call to /logout
    e.preventDefault();
    await axios.post('logout', {
        // email,
        // password
    }, {withCredentials: true});
    setCurrentUser(null);
    return navigate("/auth");
      
 
  };

  return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
        <CrwnLogo className='logo' />
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            SHOP
          </Link>

          {currentUser ? (
            <span className='nav-link' onClick={signOutHandler}>
              {' '}
              SIGN OUT{' '}
            </span>
          ) : (
            <Link className='nav-link' to='/auth'>
              SIGN IN
            </Link>
          )}
          <CartIcon/>
        </div>
        {isCartOpen && <CartDropdown/>}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;