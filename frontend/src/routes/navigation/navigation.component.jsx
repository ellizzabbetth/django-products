import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { UserContext } from '../../contexts/user.context';
//import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import axios from 'axios';
import './navigation.styles.scss';

const Navigation = () => {

  const { currentUser, setCurrentUser } = useContext(UserContext);
  console.log(currentUser)
  const signOutHandler = async (e) => {
    // await signOutUser();
    // call to /logout
    e.preventDefault();
    await axios.post('logout', {
        // email,
        // password
    }, {withCredentials: true});
    setCurrentUser(null);
  };

  return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
        {/* //  <CrwnLogo className='logo' /> */}
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

        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;