import React, {Fragment, useState} from 'react';
import {Award, ChevronRight, MapPin, Star, Users} from 'react-feather';
import {NextStepProps} from '.';

import {Maybe, ValueOf} from '../../types';
import {PrimaryButton} from '../Button';
import BaseButton from '../Button/BaseButton';
import {FadingPillList} from '../Pill';
import {BoardingTitle, Title} from '../Title';
import {BoardingFarmerStepsHeader} from './steps';
import {BoardingFarmerHelpers, BoardingFarmerLocation, BoardingFarmerSkills, BoardingFarmerSupport} from './subpages';

type Props = {} & NextStepProps;
type RenderProps = {
  value: any;
};

const menuItems = [
  {
    index: 0,
    key: 'location',
    stateKey: 'location' as 'location',
    title: 'Standort eingeben',
    Icon: MapPin,
    Component: BoardingFarmerLocation,
    Render: ({value}: RenderProps) => <Fragment>{value}</Fragment>
  },
  {
    index: 1,
    key: 'support',
    stateKey: 'supportTypeIds' as 'supportTypeIds',
    title: 'Art der Unterstützung',
    Icon: Star,
    Component: BoardingFarmerSupport,
    Render: ({value}: RenderProps) => (
      <FadingPillList>
        {Pill => (
          <Fragment>
            {value.map(v => (
              <Pill key={v} className="mr-1">
                {v}
              </Pill>
            ))}
          </Fragment>
        )}
      </FadingPillList>
    )
  },
  {
    index: 2,
    key: 'helpers',
    stateKey: 'helpersNeededCount' as 'helpersNeededCount',
    title: 'Benötigte Helfer',
    Icon: Users,
    Component: BoardingFarmerHelpers,
    Render: ({value}: RenderProps) => <Fragment>{value}</Fragment>
  },
  {
    index: 3,
    key: 'skills',
    stateKey: 'requiredSkillsIds' as 'requiredSkillsIds',
    title: 'Qualifikationen (optional)',
    Icon: Award,
    Component: BoardingFarmerSkills,
    Render: ({value}: RenderProps) => (
      <FadingPillList>
        {Pill => (
          <Fragment>
            {value.map(v => (
              <Pill key={v} className="mr-1">
                {v}
              </Pill>
            ))}
          </Fragment>
        )}
      </FadingPillList>
    )
  }
  // {
  //   index: 4,
  //   key: "skills",
  //   stateKey: "requiredSkillsIds" as "requiredSkillsIds",
  //   title: "Schwierigkeitsgrad",
  //   Icon: MessageSquare,
  //   Component: BoardingFarmerSkills,
  //   Render: ({ value }: RenderProps) => <Fragment>{value}</Fragment>
  // }
];

const totalItems = menuItems.length;

export type State = {
  location: Maybe<string>;
  supportTypeIds: string[];
  helpersNeededCount: Maybe<number>;
  requiredSkillsIds: string[];
  difficulty: Maybe<number>;
};

function useBoardingFarmerState() {
  const initialState: State = {
    location: null,
    supportTypeIds: [],
    helpersNeededCount: null,
    requiredSkillsIds: [],
    difficulty: null
  };

  const [state, setState] = useState<State>(initialState);
  const updateState = (key: keyof State) => (value: ValueOf<typeof key>) =>
    setState({...state, [key]: value});

  return [state, updateState] as [typeof state, typeof updateState];
}

function hasValue(v: any) {
  const isNull = v === null;
  const emptyArray = Array.isArray(v) && v.length === 0;

  return !(isNull || emptyArray);
}

const BoardingFarmerSupportData = (props: Props) => {
  const [activeItem, setActiveItem] = useState<typeof menuItems[0]>(null);
  const [state, updateState] = useBoardingFarmerState();
  const reachedFinalStep = activeItem?.index === totalItems - 1;

  return (
    <Fragment>
      {activeItem === null ? (
        <div className="pt-4">
          {/* Header */}
          <BoardingFarmerStepsHeader handleGoBack={() => setActiveItem(null)}/>
          <BoardingTitle>Wobei benötigst Du Unterstützung?</BoardingTitle>

          {/* Overview */}
          <ul>
            {menuItems.map(item => {
              const stateValue = state[item.stateKey];
              const showValue = hasValue(stateValue);

              return (
                <li
                  key={item.key}
                  className="relative flex items-center justify-between border-b border-gray-200 px-1 py-2 cursor-pointer hover:text-primary-light"
                  onClick={() => setActiveItem(item)}
                >
                  <Fragment>
                    <div className="flex items-center w-full">
                      <item.Icon size={16} className="inline-block mr-2"/>
                      {showValue ? (
                        <item.Render value={stateValue}/>
                      ) : (
                        item.title
                      )}
                    </div>
                    <ChevronRight className="absolute right-0"/>
                  </Fragment>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="flex flex-col justify-between h-100vh py-4">
          <div>
            {/* Header */}
            <BoardingFarmerStepsHeader
              handleGoBack={() => setActiveItem(null)}
            />

            <div className="block">
              <Title as="h2" className="mb-2 text-xl text-primary-dark" bold>
                {activeItem.title}
              </Title>
            </div>

            {/* Subpage */}
            <div>
              {
                <activeItem.Component
                  key={activeItem.key}
                  handleUpdate={updateState(activeItem.stateKey)}
                  state={state}
                />
              }
            </div>
          </div>

          {/* Footer */}
          <div>
            {reachedFinalStep ? (
              <BaseButton
                className="bg-black text-white border-black"
                onClick={props.triggerNextPage}
                block
              >
                Zeitraum festlegen
              </BaseButton>
            ) : (
              <PrimaryButton
                onClick={() =>
                  !reachedFinalStep &&
                  setActiveItem(menuItems[activeItem.index + 1])
                }
                block
              >
                Fortfahren
              </PrimaryButton>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default BoardingFarmerSupportData;
