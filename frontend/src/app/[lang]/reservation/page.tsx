"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Loader from "../components/Loader";
import PageHeader from "../components/PageHeader";
import { fetchAPI } from "../utils/fetch-api";

type Inputs = {
    startDate: string
    endDate: string
    numberOfGuests: number
}

export default function Booking() {
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
            const path = `/reservations`;
            const options = { headers: { Authorization: `Bearer ${token}` } };
            const responseData = await fetchAPI(path, options); 

            console.log("responseData",responseData)
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(JSON.stringify(data));
    }

    console.log(watch("startDate"))
    console.log(watch("endDate"))


    useEffect(()=>{
        fetchData();
    }, []);


    if(isLoading) return <Loader />

    return (
        <div className="flex flex-col items-center justify-center">

            <PageHeader heading="Réservez votre séjour" text="Etape importante pour passer un agréable moment" />

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-10  text-center bg-gray-600 p-3 rounded-lg w-80">
                <input
                    type="date"
                    {...register("startDate", { required: true })}
                    placeholder="Date de début"
                    className="text-black bold p-2 rounded-lg w-full "
                />

                {errors.numberOfGuests && <span className="text-red-500">Ce champ est obligatoire</span>}

                <input
                    type="date"
                    {...register("endDate", { required: true })}
                    placeholder="Date de fin"
                    className="text-black bold p-2 rounded-lg w-full"
                />

                {errors.numberOfGuests && <span className="text-red-500">Ce champ est obligatoire</span>}

                <input
                    type="number"
                    {...register("numberOfGuests", { required: true, min: 0, max: 15 })}
                    placeholder="Nombre de personnes"
                    className="text-black bold p-3 rounded-lg w-full"
                />

                {errors.numberOfGuests && <span className="text-red-500">Ce champ est obligatoire</span>}

                <input
                    type="submit"
                    className="w-full inline-block px-4 py-2 mt-4 text-sm font-semibold text-white transition duration-200 ease-in-out bg-violet-500 rounded-lg hover:bg-violet-600"
                />
            </form>
        </div>
    )
}