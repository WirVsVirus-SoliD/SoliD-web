import React from "react";
import Storage from "~/lib/storage";

const Banner = () => {
  return (
    <div className="absolute bottom-0 mb-4 z-30 md:text-center md:mx-auto left-1/2 transform -translate-x-1/2">
      <div
        className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
        role="alert"
      >
        <div className="flex">
          <div className="py-1">
            <svg
              className="fill-current h-6 w-6 text-teal-500 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
            </svg>
          </div>
          <div onClick={() => Storage.setHideBanner(true)}>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg
                className="fill-current h-6 w-6 text-teal-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
          <div>
            <p className="font-bold">Demo Modus</p>
            <p className="text-sm">
              Dieses Projekt wurde im Rahmen des #WirVsVirus Hackathon erstellt.
            </p>
            <p className="text-sm">Jegliche Daten sind Testdaten.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
