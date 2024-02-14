 const yearCurrent = new Date().getFullYear();

const JourAn = new Date(yearCurrent, 0, 1)
const FeteTravail = new Date(yearCurrent, 4, 1)
const Victoire1945 = new Date(yearCurrent, 4, 8)
const FeteNationale = new Date(yearCurrent, 6, 14)
const Assomption = new Date(yearCurrent, 7, 15)
const Toussaint = new Date(yearCurrent, 10, 1)
const Armistice = new Date(yearCurrent, 10, 11)
const FeteCaf = new Date(yearCurrent, 11, 20)
const Noel = new Date(yearCurrent, 11, 25)

const G = (yearCurrent) % 19
const C = Math.floor(yearCurrent / 100)
const H = (C - Math.floor(C / 4) - Math.floor((8 * C + 13) / 25) + 19 * G + 15) % 30
const I = H - Math.floor(H / 28) * (1 - Math.floor(H / 28) * Math.floor(29 / (H + 1)) * Math.floor((21 - G) / 11))
const J = (yearCurrent * 1 + Math.floor((yearCurrent) / 4) + I + 2 - C + Math.floor(C / 4)) % 7
const L = I - J
const MoisPaques = 3 + Math.floor((L + 40) / 44)
const JourPaques = L + 28 - 31 * Math.floor(MoisPaques / 4)
const Paques = new Date(yearCurrent, MoisPaques - 1, JourPaques)
const VendrediSaint = new Date(yearCurrent, MoisPaques - 1, JourPaques - 2)
const LundiPaques = new Date(yearCurrent, MoisPaques - 1, JourPaques + 1)
const Ascension = new Date(yearCurrent, MoisPaques - 1, JourPaques + 39)
const Pentecote = new Date(yearCurrent, MoisPaques - 1, JourPaques + 49)
const LundiPentecote = new Date(yearCurrent, MoisPaques - 1, JourPaques + 50)

const data = {
    public_holidays: [
        {
            name: "Toussaint",
            datePublicHolydays: Toussaint
        },
        {
            name: "Armistice",
            datePublicHolydays: Armistice
        },
        {
            name: "Fête Caf",
            datePublicHolydays: FeteCaf
        },
        {
            name: "Noël",
            datePublicHolydays: Noel
        },
        {
            name: "Jour de l'An",
            datePublicHolydays: JourAn
        },
        {
            name: "Vendredi Saint",
            datePublicHolydays: VendrediSaint
        },
        {
            name: "Pâques",
            datePublicHolydays: Paques
        },
        {
            name: "Lundi de Pâques",
            datePublicHolydays: LundiPaques
        },
        {
            name: "Fête du travail",
            datePublicHolydays: FeteTravail
        },
        {
            name: "Victoire de 1945",
            datePublicHolydays: Victoire1945
        },
        {
            name: "Ascension",
            datePublicHolydays: Ascension
        },
        {
            name: "Pentecôte",
            datePublicHolydays: Pentecote
        },
        {
            name: "Lundi de Penteôte",
            datePublicHolydays: LundiPentecote
        },
        {
            name: "Fête Nationale",
            datePublicHolydays: FeteNationale
        },
        {
            name: "Assomption",
            datePublicHolydays: Assomption
        }
    ]
}

export const getPublicHolidays = () => {
    return data;
}

