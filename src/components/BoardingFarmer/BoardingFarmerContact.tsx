import React from 'react';
import {useHistory} from 'react-router-dom';

import {NextStepProps} from '.';
import BaseButton from '../Button/BaseButton';
import {Input} from '../Form/components';

import {BoardingTitle} from '../Title';
import {BoardingFarmerStepsHeader} from './steps';

type Props = {} & Pick<NextStepProps, 'triggerNextPage'>;

const BoardingFarmerContact = (props: Props) => {
  let history = useHistory();

  return (
    <div className="flex flex-col justify-between h-100vh py-4">
      <div>
        <BoardingFarmerStepsHeader handleGoBack={() => {}}/>
        <BoardingTitle>Wie können Dich Erntehelfer erreichen?</BoardingTitle>
        <Input
          className="bg-gray-100 focus:bg-gray-200 mb-4"
          placeholder="Namen eingeben"
          block
          borderless
        />
        <Input
          className="bg-gray-100 focus:bg-gray-200 mb-4"
          placeholder="E-Mail-Adresse eingeben"
          block
          borderless
        />
        <Input
          className="bg-gray-100 focus:bg-gray-200 mb-4"
          placeholder="Telefonnummer eingeben"
          block
          borderless
        />
      </div>
      <BaseButton
        className="bg-black text-white border-black"
        onClick={() => history.push('/map')}
        block
      >
        Inserat veröffentlichen
      </BaseButton>
    </div>
  );
};

export default BoardingFarmerContact;
