import React from "react";

// Interface pour les propriétés d'une cellule de jour
interface DayCellProps {
    dayOfMonth: number | null;
    isReserved: boolean;
}

// Composant pour une cellule de jour
const DayCell: React.FC<DayCellProps> = ({ dayOfMonth, isReserved }) => {
    // Si le jour n'est pas défini, affiche une cellule vide
    if (dayOfMonth === null) {
        return <td className="pt-6"></td>;
    }

    // Applique la classe CSS appropriée en fonction de la réservation
    const dayCellClass = isReserved
        ? "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:bg-indigo-500 hover:bg-indigo-500 text-base w-8 h-8 flex items-center justify-center font-medium text-white bg-indigo-700 rounded-full"
        : "";

    return (
        <td className="pt-6">
            <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                <p className={`text-base text-gray-500 dark:text-gray-100 font-medium ${dayCellClass}`}>
                    {dayOfMonth}
                </p>
            </div>
        </td>
    );
};

export default DayCell;
