import React from 'react';
import {Logo} from './Logo';
import {Title} from './Title';

const Header = () => {
  return (
    <div className="flex justify-between items-center mt-4 mb-8">
      <div className="flex items-center">
        <Logo size={42} className="mr-2"/>
        <Title as="h1" className="text-2xl sm:text-4xl " bold>
          Farm-Helden.de
        </Title>
      </div>
    </div>
  );
};

export default Header;
