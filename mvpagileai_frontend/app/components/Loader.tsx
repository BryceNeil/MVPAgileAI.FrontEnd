'use client';

import { BounceLoader } from "react-spinners";

interface LoaderProps{
  size: number
}

const Loader: React.FC<LoaderProps> = ({size}) => {
  return ( 
    <div
    className="
      flex 
      flex-col 
      justify-center 
      items-center 
    "
    >
      <BounceLoader
        size={size}
        color="black"
      />
    </div>
   );
}
 
export default Loader;