import React from "react";
import { assets } from "../../assets/assets";

const AppDownload = () => {
  return (
    <div
      id="app-download"
      className="mt-24 text-center font-medium text-[clamp(20px,3vw,32px)]"
    >
      <p>For better experience download</p>
      <p className="mt-2">Tomato app</p>

      <div className="flex justify-center gap-[clamp(10px,2vw,20px)] mt-10">
        <img
          src={assets.play_store}
          alt="Play Store"
          className="w-[clamp(120px,30vw,180px)] transition-transform duration-500 cursor-pointer hover:scale-105"
        />
        <img
          src={assets.app_store}
          alt="App Store"
          className="w-[clamp(120px,30vw,180px)] transition-transform duration-500 cursor-pointer hover:scale-105"
        />
      </div>
    </div>
  );
};

export default AppDownload;
