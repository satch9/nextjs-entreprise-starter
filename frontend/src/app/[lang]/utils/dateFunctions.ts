export const getFirstDayOfMonth = (annee: number, mois: number) => {
    return new Date(annee, mois, 1).getDay();
}