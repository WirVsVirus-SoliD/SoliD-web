import React from 'react';
import {Link} from 'react-router-dom';

const NotFoundPage = () => {
  return <div>
    <img alt="404 Page not found"
         src={'http://www.404notfound.fr/assets/images/pages/img/androiddev101.jpg'}
    />
    <Link
      to='/'>
      <button>Startseite</button>
    </Link>
  </div>;
};

export default NotFoundPage;
