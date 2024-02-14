"use client";
import React, { useState } from "react";
import { ephemeride } from "../utils/ephemeride";
import { getFirstDayOfMonth } from "../utils/dateFunctions";

// Styles réutilisés
const dayCellStyle: string = "w-full flex justify-center";
const emptyDayCellStyle: string = "pt-2";
const dayCellContentStyle: string = "px-1 py-1 flex w-full justify-center";
const dayNumberStyle: string = "text-base text-gray-500 dark:text-gray-100 font-medium";

// Interface pour les données d'éphéméride
interface DayCellProps {
    dayOfMonth: number;
}


export default function Calendar({ data }: any) {
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [month, setMonth] = useState<number>(new Date().getMonth());

    console.log("calendarData", data)
    const reservedDates = new Set<string>();
    data.forEach((reservation: any) => {
        const startDateTime = new Date(reservation.startDate);
        const endDateTime = new Date(reservation.endDate);
        const startDay = startDateTime.getDate();
        const endDay = endDateTime.getDate();
        const startMonth = startDateTime.getMonth();
        const endMonth = endDateTime.getMonth();
        const startYear = startDateTime.getFullYear();
        const endYear = endDateTime.getFullYear();

        for (let date = startDay; date <= endDay; date++) {
            reservedDates.add(`${startYear}-${startMonth < 10 ? "0" + startMonth : startMonth}-${date}`);
        }
        // Check if start and end month are same
        if (startMonth !== endMonth) {
            for (let date = 1; date <= endDay; date++) {
                reservedDates.add(`${endMonth}-${endYear}-${date}`);
            }
        }
    });

    console.log("reservedDates", reservedDates)
    console.log("year-month-day", `${year}-${month < 10 ? "0" + month : month}`)

    // Composant pour une cellule de jour
    const DayCell: React.FC<DayCellProps> = ({ dayOfMonth }) => {
        const isReserved = reservedDates.has(`${year}-${month < 10 ? "0" + month : month}-${dayOfMonth}`);
        return (
            <td className={`${emptyDayCellStyle} ${isReserved ? 'w-13' : 'w-12'}`}>
                <div className={dayCellContentStyle}>
                    <p className={`${dayNumberStyle} ${isReserved ? 'focus:outline-none  focus:ring-2 focus:ring-offset-2text-base w-7 h-7 flex items-center justify-center font-medium text-white bg-indigo-700 rounded-full' : ''}`}>{dayOfMonth}</p>
                </div>
            </td>
        )
    };

    const monthNames: string[] = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];

    const changeMonth = (direction: string): void => {
        const newMonth: number = direction === "next" ? month + 1 : month - 1;
        if (newMonth < 0) {
            setMonth(11);
            setYear(year - 1);
        } else if (newMonth > 11) {
            setMonth(0);
            setYear(year + 1);
        } else {
            setMonth(newMonth);
        }
    };

    const daysInMonth = (): (number | null)[] => {
        const monthName: string = monthNames[month];
        const days: (number | null)[] = ephemeride[monthName].map(([day]) => {
            const parsedDay: number | null = day ? parseInt(day) : null;
            return typeof parsedDay === 'number' ? parsedDay : null;
        });

        const firstDayOfMonth: number = getFirstDayOfMonth(year, month);
        const emptyDays: number = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

        return Array.from({ length: emptyDays }).fill(null).concat(days) as (number | null)[];
    };

    const elementsNull: number = daysInMonth().filter((element: number | null) => element !== null).length;


    return (
        <div className="flex items-center justify-center py-8 px-4">
            <div className="max-w-sm w-full shadow-lg">
                <div className="md:p-8 p-5 dark:bg-gray-800 bg-white rounded-t">
                    <div className="px-4 flex items-center justify-between">
                        <span className="focus:outline-none text-base font-bold dark:text-gray-100 text-gray-800">
                            {monthNames[month]} {year}
                        </span>
                        <div className="flex items-center">
                            <button
                                aria-label="calendar backward"
                                onClick={() => changeMonth("prev")}
                                className="focus:text-gray-400 hover:text-gray-400 text-gray-800 dark:text-gray-100"
                            >
                                &lt;
                            </button>
                            <button
                                aria-label="calendar forward"
                                onClick={() => changeMonth("next")}
                                className="focus:text-gray-400 hover:text-gray-400 ml-3 text-gray-800 dark:text-gray-100"
                            >
                                &gt;
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between pt-12 overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    {["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"].map((day: string, index: number) => (
                                        <th key={index}>
                                            <div className={dayCellStyle}>
                                                <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">{day}</p>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {Array.from({ length: getFirstDayOfMonth(year, month) === 0 ? Math.ceil(elementsNull / 7) + 1 : Math.ceil(elementsNull / 7) }).map((_, rowIndex: number) => (
                                    <tr key={rowIndex}>
                                        {Array.from({ length: 7 }).map((_, colIndex: number) => {
                                            const dayIndex: number = rowIndex * 7 + colIndex;
                                            const day: number | null = daysInMonth()[dayIndex];
                                            let dayOfMonth: number | null = null;
                                            if (day !== null) {
                                                const firstDayOfMonth: number = getFirstDayOfMonth(year, month);
                                                const emptyDays: number = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
                                                const firstDayOfMonthIndex: number = emptyDays + 1;
                                                dayOfMonth = dayIndex - firstDayOfMonthIndex + 2;
                                                if (dayOfMonth < 1 || dayOfMonth > elementsNull) {
                                                    dayOfMonth = null;
                                                }
                                            }

                                            return (
                                                <React.Fragment key={colIndex}>
                                                    {day === null ? (
                                                        <td className={emptyDayCellStyle}></td>
                                                    ) : (
                                                        <DayCell dayOfMonth={dayOfMonth as number} />
                                                    )}
                                                </React.Fragment>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}