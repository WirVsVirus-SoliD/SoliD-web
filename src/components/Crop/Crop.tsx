import React from "react";
import { ReactComponent as Asparagus } from "~/assets/icons/cultures/asparagus.svg";
import { ReactComponent as Basket } from "~/assets/icons/cultures/basket.svg";
import { ReactComponent as Cabbage } from "~/assets/icons/cultures/cabbage.svg";
import { ReactComponent as Cucumber } from "~/assets/icons/cultures/cucumber.svg";
import { ReactComponent as Grape } from "~/assets/icons/cultures/grape.svg";
import { ReactComponent as Hop } from "~/assets/icons/cultures/hop.svg";
import { ReactComponent as Lettuce } from "~/assets/icons/cultures/lettuce.svg";
import { ReactComponent as Radish } from "~/assets/icons/cultures/radish.svg";
import { ReactComponent as Strawberry } from "~/assets/icons/cultures/strawberry.svg";
import { ReactComponent as Vegetables } from "~/assets/icons/cultures/vegetables.svg";

const cropLookupMap = {
  Spargel: Asparagus,
  Erdbeeren: Strawberry,
  Hopfen: Hop,
  Weinbau: Grape,
  Obstbau: Basket,
  Salate: Lettuce,
  Gurken: Cucumber,
  Kohl: Cabbage,
  Radieschen: Radish,
  Sonstige: Vegetables
};

const CropIcon = ({ type, ...restProps }) => {
  const Component = cropLookupMap[type];
  return <Component {...restProps} />;
};

const Crop = ({ type, height = 30 }) => {
  return (
    <div className="flex flex-col items-center">
      <CropIcon type={type} className="mb-1" height={height} />
      {type}
    </div>
  );
};

export default Crop;
