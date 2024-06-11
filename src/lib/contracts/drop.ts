import { config } from '@/config/wallet'
import {
    simulateContract,
    readContract,
    waitForTransactionReceipt,
    writeContract,
    getAccount
} from '@wagmi/core';
import fortuneAbi from "@/lib/abi/fortune.json";
import { FORTUNE_ADDRESS } from '@/config/env';
import { parseEther, formatEther } from 'viem';
import { approve, getAllowance, getBalance } from './usdc';

export const drop = async (numTicket: number) => {
    const account = getAccount(config);
    const draw = await getDraw();
    const ticketPrice = Number(formatEther(draw[2]));
    const totalPrice = numTicket * ticketPrice;

    if (!account.address) throw Error('Please connect your wallet');
    if (numTicket <= 0) throw Error('Ticket should be larger than 0');
    if (await getBalance(account.address) < parseEther(totalPrice + "")) throw Error("You don't have enough USDC");

    const openDrawId = await getOpenDrawId();
    const allowance = await getAllowance(account.address, FORTUNE_ADDRESS);

    if (allowance < parseEther(totalPrice + "")) {
        const approveTx = await approve(totalPrice);
    }

    const { request } = await simulateContract(config, {
        abi: fortuneAbi,
        address: FORTUNE_ADDRESS as `0x${string}`,
        functionName: 'enterMultiple',
        args: [openDrawId, numTicket],
    });
    const hash = await writeContract(config, request);
    const dropResult = await waitForTransactionReceipt(config, { hash });
}

const getOpenDrawId = async () => {
    const nextDrawId = await readContract(config, {
        abi: fortuneAbi,
        address: FORTUNE_ADDRESS as `0x${string}`,
        functionName: 'nextDrawId',
    });
    const openDrawId = Number(nextDrawId) - 1;
    return openDrawId;
}

export const getDraw = async () => {
    const openDrawId = await getOpenDrawId();

    const draw: any = await readContract(config, {
        abi: fortuneAbi,
        address: FORTUNE_ADDRESS as `0x${string}`,
        functionName: 'draws',
        args: [openDrawId]
    });

    return draw;
}

export const getDistributionRate = async () => {
    const distributionRate: any = await readContract(config, {
        abi: fortuneAbi,
        address: FORTUNE_ADDRESS as `0x${string}`,
        functionName: 'distributionRate',
    });

    return distributionRate;
}

export const getIsExpired = async () => {
    const openDrawId = await getOpenDrawId();
    const isExpired: any = await readContract(config, {
        abi: fortuneAbi,
        address: FORTUNE_ADDRESS as `0x${string}`,
        functionName: 'isExpired',
        args: [openDrawId]
    });

    return isExpired;
}

export const getDepositedAmount = async () => {
    const account = getAccount(config);

    if (!account.address) return 0;

    const openDrawId = await getOpenDrawId();
    const depositedAmount: any = await readContract(config, {
        abi: fortuneAbi,
        address: FORTUNE_ADDRESS as `0x${string}`,
        functionName: 'addressToDrawToTokens',
        args: [account.address, openDrawId]
    });

    return Number(formatEther(depositedAmount));
}

export const refund = async () => {
    const account = getAccount(config);
    if (!account.address) return 0;

    const openDrawId = await getOpenDrawId();

    const { request } = await simulateContract(config, {
        abi: fortuneAbi,
        address: FORTUNE_ADDRESS as `0x${string}`,
        functionName: 'refund',
        args: [openDrawId],
    });
    const hash = await writeContract(config, request);
    const refundResult = await waitForTransactionReceipt(config, { hash });
    console.log("refundResult", refundResult);
}

export const getIsRefund = async () => {
    const account = getAccount(config);
    if (!account.address) throw Error('Please connect your wallet');;

    const openDrawId = await getOpenDrawId();

    const isRefunded: any = await readContract(config, {
        abi: fortuneAbi,
        address: FORTUNE_ADDRESS as `0x${string}`,
        functionName: 'isRefunded',
        args: [account.address, openDrawId]
    });

    return isRefunded;
}