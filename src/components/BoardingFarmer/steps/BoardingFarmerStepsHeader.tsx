import React from 'react';
import {ChevronLeft} from 'react-feather';
import {useHistory} from 'react-router-dom';

import {Title} from '../../Title';

type Props = {
  handleGoBack: () => void;
};

const BoardingFarmerStepsHeader = ({handleGoBack}: Props) => {
  let history = useHistory();
  return (
    <div className="flex justify-between items-end mb-4 w-full">
      <span
        className="flex items-center text-primary-dark cursor-pointer"
        onClick={handleGoBack}
      >
        <ChevronLeft className="mr-1" size={16}/>
        Zurück
      </span>
      <Title as="h6" className="text-md">
        Unterstützung suchen
      </Title>
      <span className="text-gray-500 hover:text-gray-600">
        <div onClick={() => history.push('/')}>Abbrechen</div>
      </span>
    </div>
  );
};

export default BoardingFarmerStepsHeader;
