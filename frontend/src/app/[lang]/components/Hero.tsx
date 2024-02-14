"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import HighlightedText from "./HighlightedText";
import { getStrapiMedia } from "../utils/api-helpers";
import { renderButtonStyle } from "../utils/render-button-style";
import Calendar from "./Calendar";
import { fetchAPI } from "../utils/fetch-api";
import { useEffect, useState } from "react";
import { CalendarProps } from "../utils/model";

interface Button {
  id: string;
  url: string;
  text: string;
  type: string;
  newTab: boolean;
}

interface Picture {
  data: {
    id: string;
    attributes: {
      url: string;
      name: string;
      alternativeText: string;
    };
  };
}

interface HeroProps {
  data: {
    id: string;
    title: string;
    description: string;
    picture: Picture;
    buttons: Button[];
  };
}



export default function Hero({ data }: Readonly<HeroProps>) {
  const imgUrl = getStrapiMedia(data.picture.data.attributes.url);
  const path = usePathname();


  const [calendarData, setCalendarData] = useState<CalendarProps[]>([]);

  const getReservations = async () => {
    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
      const path = `/reservations`;
      const options = { headers: { Authorization: `Bearer ${token}` } };

      const responseData = await fetchAPI(path, options);
      console.log("responseData", responseData);
      const reservations = responseData.data.map((reservation: any) => {
        console.log("reservation", reservation);
        const id = reservation.id;
        const startDate = reservation.attributes.startDate;
        const endDate = reservation.attributes.endDate;
        const guests = reservation.attributes.guests;

        return { id, startDate, endDate, guests };
      });
      setCalendarData(reservations);

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getReservations();
  }, []);

  return (
    <section className="dark:bg-black dark:text-gray-100">
      <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-around">
        <div className="flex flex-col justify-center p-6 text-center rounded-lg lg:max-w-md xl:max-w-lg lg:text-left">
          <HighlightedText
            text={data.title}
            tag="h1"
            className="text-5xl font-bold leading-none sm:text-6xl mb-8"
            color="dark:text-violet-400"
          />

          <HighlightedText
            text={data.description}
            tag="p"
            className="tmt-6 mb-8 text-lg sm:mb-12"
            color="dark:text-violet-400"
          />
          <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
            {data.buttons.map((button: Button, index: number) => (
              <Link
                key={index}
                href={button.url}
                target={button.newTab ? "_blank" : "_self"}
                className={renderButtonStyle(button.type)}
              >
                {button.text}
              </Link>
            ))}
          </div>
        </div>

        {
          path.split("/")[2] == "about" ? (
            <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
              <Image
                src={imgUrl || ""}
                alt={
                  data.picture.data.attributes.alternativeText || "none provided"
                }
                className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 "
                width={600}
                height={600}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center p-6 mt-8 ">
              <Calendar data={calendarData} />
            </div>
          )}
      </div>
    </section>
  );
}
