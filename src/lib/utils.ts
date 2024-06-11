import { getDraw } from "./contracts/drop";

export const shortenAddress = (address: `0x${string}`) => {
    const totalLength = address.length;
    return `${address.slice(0, 4)}...${address.slice(totalLength - 4, totalLength)}`;
};

export const calculateCompletionPercentage = (balance: number, hardcap: number) => {
    const completionPercentage = (balance / hardcap) * 100;
    if (completionPercentage > 100) return 100;
    return completionPercentage;
};

export const isExpired = async () => {
    const draw = await getDraw();
    return draw[1] === 1 && draw[3] < draw[9] && Math.floor(Date.now() / 1000) >= draw[0] + draw[10];
}


