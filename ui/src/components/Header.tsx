import kkrtLogo from "/kkrt-logo.svg";
import { ConnectButton } from "./";

export const Header = () => {
  return (
    <div className="flex w-full justify-between px-10 pt-6">
      <div className="flex justify-center items-center">
        <img src={kkrtLogo} alt="Kakarot Logo" width={240} height={180} />
      </div>
      <div className="w-2/7">
        <ConnectButton />
      </div>
    </div>
  );
};
