import React, { Fragment } from "react";
import { MapPin, Clock, Globe, ArrowLeft, Share2, Heart } from "react-feather";

import { Title } from "~/components/Title";
import { ReactComponent as OrganicAgriculture } from "~/assets/icons/OrganicAgriculture.svg";
import { ReactComponent as Asparagus } from "~/assets/icons/cultures/asparagus.svg";
import { ReactComponent as Strawberry } from "~/assets/icons/cultures/strawberry.svg";
import { ReactComponent as Vegetables } from "~/assets/icons/cultures/vegetables.svg";
import { PrimaryButton } from "~/components/Button";
import { InfoIcon } from "~/components/Icon";

type Props = {};

const ProviderDetails = () => {
  const isOrganicFarm = true;

  return (
    <div className="h-full">
      <div className="relative">
        <div className="flex justify-between absolute top-0 left-0 right-0 p-2 text-brand">
          <button className="rounded-full bg-white-primary p-2">
            <ArrowLeft size={20} />
          </button>
          <div>
            <button className="rounded-full bg-white-primary p-2 mr-2">
              <Heart size={20} />
            </button>

            <button className="rounded-full bg-white-primary p-2">
              <Share2 size={20} />
            </button>
          </div>
        </div>
        <img alt="A placeholder" src="https://picsum.photos/360/178" />
      </div>
      <div className="px-4 pt-4">
        <Title as="h2" className="text-2xl mb-2">
          Bauernhof Müller
        </Title>
        <ul className="text-sm mb-4">
          {[
            [MapPin, "Am Hof 1, 80384 Milbertshofen"],
            [MapPin, "Abholung möglich bei max. 20 km Distanz"],
            [Clock, "Mindestbeschäftigung: 1 Woche"],
            [MapPin, "9,35 € / Stunde"],
            [MapPin, "Übernachtungsmöglichkeit: 5 € / Nacht"]
          ].map(([Icon, text], i) => (
            <li key={i} className="flex items-center mb-2">
              <Icon size={16} className="mr-2" />
              {text}
            </li>
          ))}
        </ul>
        <ul className="flex items-center text-xs mb-4">
          {isOrganicFarm && (
            <li className="inline-block text-center border-r border-gray-400 pr-4 mr-4">
              <OrganicAgriculture className="mx-auto mb-1" />
              Biologischer <br />
              Anbau
            </li>
          )}
          {[
            ["Spargel", Asparagus],
            ["Erdbeeren", Strawberry],
            ["Sonstige", Vegetables]
          ].map(([type, Icon]) => (
            <li key={type as string} className="inline-block mr-4">
              <Icon height={30} className="mx-auto mb-1" />
              {type}
            </li>
          ))}
        </ul>
        <div className="mb-4 text-center">
          <a
            href="https://www.google.com"
            rel="noopener noreferrer"
            className="inline-flex items-center text-brand hover:text-white hover:bg-brand px-2 py-1 rounded"
          >
            <Globe className="mr-1" />
            Webseite
          </a>
        </div>
        {[
          ["Tätigkeiten"],
          ["Arbeitsbeginn"],
          ["Übernachtungsmöglichkeiten"],
          ["Versorgung"],
          ["Sprachen"]
        ].map(([title]) => (
          <Fragment key={title}>
            <Title as="h3" className="text-xl mb-2">
              {title}
            </Title>
            <p className="mb-4">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et
              voluptatum suscipit hic similique illo dolores, molestias repellat
              excepturi vero perspiciatis tempora, omnis nam. Eveniet nesciunt
              atque amet dolorum repellendus eaque.
            </p>
          </Fragment>
        ))}
        <div className="pt-2">
          {/* TODO: Icon is a "bad export" from Figma and does not include the green circle in the background. */}
          <InfoIcon size={24} />
          <p className="font-medium mt-2">
            Bitte beachte: Feldarbeit kann unter Umständen sehr anstrengend und
            belastend sein. Du solltest keine Probleme mit häufigem Bücken und
            längerer körperlicher Anstrengung haben.{" "}
          </p>
        </div>
        <PrimaryButton className="my-4" block>
          Ich will helfen
        </PrimaryButton>
      </div>
    </div>
  );
};

export default ProviderDetails;
