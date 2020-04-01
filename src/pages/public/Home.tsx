import React from "react";
import { Info, User, Briefcase, CheckCircle } from "react-feather";

import { Gradient } from "~/components/Gradient";
import { Logo } from "~/components/Logo";
import { Map } from "~/components/Map";
import { Title } from "~/components/Title";
import { useMobileDevice } from "~/lib/hooks";
import { Steps } from "~/components/Steps";

type Props = {};

const steps = [
  { title: "Hinweis", Icon: Info, Content: Info },
  { title: "Über dich", Icon: User, Content: User },
  { title: "Konditionen", Icon: Briefcase, Content: Briefcase },
  { title: "Fertig!", Icon: CheckCircle, Content: CheckCircle }
];

const Home = (props: Props) => {
  const isMobile = useMobileDevice();
  const logoSize = isMobile ? 60 : 80;

  return (
    <main className="h-100vh">
      <div className="relative z-10 bg-white flex justify-between p-2 pb-4">
        <div className="flex items-center">
          <Logo size={logoSize} />
          <Title as="h1" className="text-3xl sm:text-4xl text-brand ml-1" bold>
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
          <div className="block w-full">
            <Steps steps={steps} />
          </div>
        </div>
        <div className="backdrop-blur fixed inset-0 z-0 h-100vh">
          <Map hideNavigationControl hideFullScreenControl blur={4} />
        </div>
      </div>
    </main>
  );
};

export default Home;
