import { Dimensions, TouchableOpacity, TouchableOpacityProps } from "react-native";
import clsx from 'clsx';
import { generateProgressPercentage } from "../utils/generate-progress-percentage";
import dayjs from "dayjs";

const WEEK_DAYS = 8;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 6;
export const DAY_SIZE =( Dimensions.get('screen').width / WEEK_DAYS) - (DAY_MARGIN_BETWEEN + 5);

interface Props extends TouchableOpacityProps {
    amountOfHabits?: number;
    amountCompleted?: number;
    date: Date;
};

export function HabitDay({ amountOfHabits = 0, amountCompleted = 0, date, ...rest }: Props) {

    const amountAccomplishedPeercentage = amountOfHabits > 0 ? generateProgressPercentage(amountOfHabits, amountCompleted) : 0
    const today = dayjs().startOf('day').toDate();
    const isCurrentDay = dayjs(date).isSame(today);

    return(
        <TouchableOpacity 
            className={clsx("rounded-lg border-2 m-1", {
                ["bg-zinc-900 border-zinc-800"] : amountAccomplishedPeercentage === 0,
                ["bg-violet-900 border-violet-700"] : amountAccomplishedPeercentage > 0 && amountAccomplishedPeercentage < 20,
                ["bg-violet-800 border-violet-600"] : amountAccomplishedPeercentage >= 20 && amountAccomplishedPeercentage < 40,
                ["bg-violet-700 border-violet-500"] : amountAccomplishedPeercentage >= 40 && amountAccomplishedPeercentage < 60,
                ["bg-violet-600 border-violet-500"] : amountAccomplishedPeercentage >= 60 && amountAccomplishedPeercentage < 80,
                ["bg-violet-500 border-violet-400"] : amountAccomplishedPeercentage >= 80,
                ["border-white border-4"] : isCurrentDay ,
            })}
            style={{width: DAY_SIZE, height: DAY_SIZE}}
            activeOpacity={0.7}
            { ...rest }
        />
    );
}