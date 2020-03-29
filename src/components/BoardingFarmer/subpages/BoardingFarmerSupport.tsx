import React from 'react';
import {BoardingFarmerProps} from '.';
import {updateArray} from '../../../lib/immutable';
import {Checkbox} from '../../Form/components';

type Props = BoardingFarmerProps;

const supportTypes = [
  {id: '1', title: 'Ernte'},
  {id: '2', title: 'Verkauf'},
  {id: '3', title: 'Sortieren'},
  {id: '4', title: 'Pflanzarbeiten'},
  {id: '5', title: 'Schlepper fahren'},
  {id: '6', title: 'Melken'},
  {id: '7', title: 'Sonstige'}
];

const BoardingFarmerSupport = ({state, handleUpdate}: Props) => {
  return (
    <div>
      <p className="mb-2">
        Welche Form der Unterstützung wird benötigt? Es können mehrere Auswahlen
        getroffen werden.
      </p>
      <ul>
        {supportTypes.map(({id, title}) => {
          return (
            <li key={id}>
              <Checkbox
                value={id}
                checked={state.supportTypeIds.includes(title)}
                onChange={() =>
                  handleUpdate(updateArray(title, state.supportTypeIds))
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
