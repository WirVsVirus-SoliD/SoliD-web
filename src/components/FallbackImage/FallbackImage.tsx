import React, { useState } from "react";

type Props = {
  children?: any | undefined;
  src: any;
  width: any;
  height: any;
};
const FallbackImage = ({ src, width, height, children, ...rest }: Props) => {
  const [error, setError] = useState(false);

  return (
    <>
      {error ? (
        <div>{children}</div>
      ) : (
        <img
          className={`w-${width} h-${height}`}
          src={src}
          onError={() => setError(true)}
          {...rest}
        />
      )}
    </>
  );
};

export default FallbackImage;
