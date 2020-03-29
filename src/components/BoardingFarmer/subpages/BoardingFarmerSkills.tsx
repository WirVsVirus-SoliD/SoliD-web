import React from 'react';
import {BoardingFarmerProps} from '.';
import {updateArray} from '../../../lib/immutable';
import {Checkbox} from '../../Form/components';

type Props = BoardingFarmerProps;

const skillTypes = [
  {id: '1', title: 'Führerschein Klasse B'},
  {id: '2', title: 'Führerschein Klasse C1'},
  {id: '3', title: 'Führerschein Klasse C'}
];

const BoardingFarmerSupport = ({state, handleUpdate}: Props) => {
  return (
    <div>
      <p className="mb-2">
        Hier kannst Du notwendige Qualifikationen angeben, die deine Erntehelfer
        mitbringen sollten.
      </p>
      <ul>
        {skillTypes.map(({id, title}) => {
          return (
            <li key={id}>
              <Checkbox
                value={id}
                checked={state.requiredSkillsIds.includes(title)}
                onChange={() =>
                  handleUpdate(updateArray(title, state.requiredSkillsIds))
                }
                className="py-1 hover:bg-gray-100"
                block
              >
                {title}
              </Checkbox>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BoardingFarmerSupport;
