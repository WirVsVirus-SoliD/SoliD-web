import React from 'react';
import {Link} from 'react-router-dom';
import BaseButton from '../../components/Button/BaseButton';
import {Gradient} from '../../components/Gradient';
import {Logo} from '../../components/Logo';
import {Map} from '../../components/Map';
import {Title} from '../../components/Title';

const Home = (props) => {
  const isMobile = props.ua.isMobile;
  const logoSize = isMobile ? 60 : 80;

  return (
    <main className="h-100vh">
      <div className="relative z-10 bg-white flex justify-between p-2 pb-4">
        <div className="flex items-center">
          <Logo size={logoSize}/>
          <Title
            as="h1"
            className="text-3xl sm:text-4xl text-primary-dark ml-1"
            bold
          >
            FarmHelden
          </Title>
        </div>
        <Gradient
          height="15vh"
          className="absolute left-0 top-100perc z-20"
          block
        />
      </div>
      <div className="fixed inset-0">
        <div className="absolute top-0 z-20 flex items-center w-full px-2 h-full">
          <div className="block w-full md:text-center">
            <Link to="/boarding-farmer">
              <BaseButton
                className="font-title mb-4 py-2 md:w-64 text-xl md:mx-auto rounded-full bg-primary-light border-primary-light text-white"
                block
              >
                Ich suche Unterstützung
              </BaseButton>

            </Link>
            <Link to="/map">
              <BaseButton
                className="font-title py-2 md:w-64 text-xl md:mx-auto rounded-full bg-accent-dark border-accent-dark text-white"
                block
              >
                Ich möchte helfen
              </BaseButton>
            </Link>
          </div>
        </div>
        <div className="backdrop-blur fixed inset-0 z-0 h-100vh">
          <Map hideNavigationControl hideFullScreenControl blur={4}/>
        </div>
      </div>
    </main>
  );
};

export default Home;
