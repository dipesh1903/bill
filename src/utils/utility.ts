import { RangeSet } from "../types/settings"

export function getRandomInteger(range: RangeSet): number {
    const min = Math.ceil(range.min)
    const max = Math.floor(range.max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getRandomDecimal(range: RangeSet, precision: number): number {
    const min = Math.ceil(range.min)
    const max = Math.floor(range.max)
    const result =  Math.floor(Math.random() * (max - min + 1)) + min
    const rounder = Math.pow(10, precision);
    return Math.round(result * rounder) / rounder;
}

export function getAmountAndPaisa(amt: number): string[] {
    const rupee = String(amt).split('.')[0];
    let paisa = String(amt).split('.')[1];
    paisa = !paisa ? '00' : paisa.length == 1 ? `${paisa}0` : paisa;
    return [`${rupee}` , paisa]
} 