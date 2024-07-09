import kkrtLogo from "/kkrt-logo.svg";
import { ConnectButton } from "./";

export const Header = () => {
  return (
    <div className="flex w-full justify-between p-4">
      <div className="flex justify-center items-center">
        <img src={kkrtLogo} alt="Kakarot Logo" width={156} height={156} />
      </div>
      <div className="w-2/7">
        <ConnectButton />
      </div>
    </div>
  );
};
