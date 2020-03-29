export {default as BoardingFarmerContact} from './BoardingFarmerContact';
export {default as BoardingFarmerDateSelection} from './BoardingFarmerDateSelection';
export {default as BoardingFarmerIntroduction} from './BoardingFarmerIntroduction';
export {default as BoardingFarmerSupportData} from './BoardingFarmerSupportData';

export type NextStepProps = {
  triggerNextPage: () => void;
  stepIndicatorBar: React.ReactNode;
};
