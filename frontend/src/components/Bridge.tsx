import kakarotMessaging from "../../data/kakarotMessaging.json"
import starknetMessaging from "../../data/starknetMessaging.json"
import { useWriteContract } from "wagmi";

export const Bridge = () => {

  const { data: sendMessageData, writeContract: writeSendMessage, isError, error } = useWriteContract()

  const handleSend = () => {
    console.log("Sending message to Kakarot L2")
    const message = 1
    const value = BigInt(0.0001 * 1e18)
    writeSendMessage({
      address: kakarotMessaging.address as `0x${string}`,
      abi: kakarotMessaging.abi,
      functionName: "sendMessageToL2",
      args: [starknetMessaging.address, value, message]
    })
  }

  return (
    <div>
      <h1>Bridge</h1>
      <button onClick={handleSend}>Send Message</button>
      {sendMessageData && (
        <div>{JSON.stringify(sendMessageData, null, 2)}</div>
      )}
    </div>
  );
};
