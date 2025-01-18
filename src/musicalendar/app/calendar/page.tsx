'use client';

import React, { useEffect } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/20/solid'
import Link from 'next/link';
import { getPlaylistTracks } from './fetch_songs';

const daysInitialValue: {
  date: string;
  events: {
    id: string,
    name: string,
    imageLink: string,
    href: string
  }[];
  isCurrentMonth?: boolean;
  isToday?: boolean;
  isSelected?: boolean;
}[] = [
    { date: '2021-12-27', events: [] },
    { date: '2021-12-28', events: [] },
    { date: '2021-12-29', events: [] },
    { date: '2021-12-30', events: [] },
    { date: '2021-12-31', events: [] },
    { date: '2022-01-01', isCurrentMonth: true, events: [] },
    { date: '2022-01-02', isCurrentMonth: true, events: [] },
    {
      date: '2022-01-03',
      isCurrentMonth: true,
      events: [],
    },
    { date: '2022-01-04', isCurrentMonth: true, events: [] },
    { date: '2022-01-05', isCurrentMonth: true, events: [] },
    { date: '2022-01-06', isCurrentMonth: true, events: [] },
    {
      date: '2022-01-07',
      isCurrentMonth: true,
      events: [],
    },
    { date: '2022-01-08', isCurrentMonth: true, events: [] },
    { date: '2022-01-09', isCurrentMonth: true, events: [] },
    { date: '2022-01-10', isCurrentMonth: true, events: [] },
    { date: '2022-01-11', isCurrentMonth: true, events: [] },
    {
      date: '2022-01-12',
      isCurrentMonth: true,
      isToday: true,
      events: [],
    },
    { date: '2022-01-13', isCurrentMonth: true, events: [] },
    { date: '2022-01-14', isCurrentMonth: true, events: [] },
    { date: '2022-01-15', isCurrentMonth: true, events: [] },
    { date: '2022-01-16', isCurrentMonth: true, events: [] },
    { date: '2022-01-17', isCurrentMonth: true, events: [] },
    { date: '2022-01-18', isCurrentMonth: true, events: [] },
    { date: '2022-01-19', isCurrentMonth: true, events: [] },
    { date: '2022-01-20', isCurrentMonth: true, events: [] },
    { date: '2022-01-21', isCurrentMonth: true, events: [] },
    {
      date: '2022-01-22',
      isCurrentMonth: true,
      events: [],
    },
    { date: '2022-01-23', isCurrentMonth: true, events: [] },
    { date: '2022-01-24', isCurrentMonth: true, events: [] },
    { date: '2022-01-25', isCurrentMonth: true, events: [] },
    { date: '2022-01-26', isCurrentMonth: true, events: [] },
    { date: '2022-01-27', isCurrentMonth: true, events: [] },
    { date: '2022-01-28', isCurrentMonth: true, events: [] },
    { date: '2022-01-29', isCurrentMonth: true, events: [] },
    { date: '2022-01-30', isCurrentMonth: true, events: [] },
    { date: '2022-01-31', isCurrentMonth: true, events: [] },
    { date: '2022-02-01', events: [] },
    { date: '2022-02-02', events: [] },
    { date: '2022-02-03', events: [] },
    {
      date: '2022-02-04',
      events: [],
    },
    { date: '2022-02-05', events: [] },
    { date: '2022-02-06', events: [] },
  ]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function dateFromISO(dateString: string): string {
  return dateString.split('T')[0];
}

export default function Calendar() {
  const [days, setDays] = React.useState(daysInitialValue);
  const [selectedDay, setSelectedDay] = React.useState(days.find((day) => day.isToday));

  useEffect(() => {
    getPlaylistTracks("37i9dQZF1DXcBWIGoYBM5M").then((data) => {
      const songsData = JSON.parse(data).items;
      setDays((days) => days.map((day) => {
        const events: { id: string, name: string, href: string, imageLink: string }[] = songsData
          .filter((song: any) => day.date === dateFromISO(song.added_at))
          .map((event: any) => ({
            id: event.added_at + event.track.id,
            name: event.track.name + ' - ' + event.track.artistName,
            imageLink: event.track.album.images[0].url,
            href: event.track.href,
          }));
        day.events = events;
        return day;
      }));
    });
  }, [])

  return (
    <div className="lg:flex lg:h-full lg:flex-col">
      <header className="flex items-center justify-between border-b border-gray-200 px-12 py-4 lg:flex-none">
        <div className='flex'>
          <button
            type="button"
            className="flex h-9 w-12 items-center justify-center rounded-md border-gray-300 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:hover:bg-gray-50 mr-2"
          >
            <Link href="/">
              <span className="sr-only">Back to home</span>
              <ChevronLeftIcon className="size-8" aria-hidden="true" />
            </Link>
          </button>
          <h1 className="mt-1 text-base font-semibold text-gray-900">
            <time dateTime="2022-01">January 2022</time>
          </h1>
        </div>
        <div className="flex items-center">
          <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
            <button
              type="button"
              className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-600 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="h-9 w-12 border-y border-gray-300 px-2 text-gray-600 hover:text-gray-800 focus:relative md:hover:bg-gray-50"
            >
              Today
            </button>
            <button
              type="button"
              className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-600 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      <div className="shadow ring-1 ring-black/5 lg:flex lg:flex-auto lg:flex-col">
        <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs/6 font-semibold text-gray-700 lg:flex-none">
          <div className="bg-white py-2">
            M<span className="sr-only sm:not-sr-only">on</span>
          </div>
          <div className="bg-white py-2">
            T<span className="sr-only sm:not-sr-only">ue</span>
          </div>
          <div className="bg-white py-2">
            W<span className="sr-only sm:not-sr-only">ed</span>
          </div>
          <div className="bg-white py-2">
            T<span className="sr-only sm:not-sr-only">hu</span>
          </div>
          <div className="bg-white py-2">
            F<span className="sr-only sm:not-sr-only">ri</span>
          </div>
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">at</span>
          </div>
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">un</span>
          </div>
        </div>

        <div className="flex bg-gray-200 text-xs/6 lg:flex-auto">
          <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
            {days.map((day) => (
              <div
                key={day.date}
                className={classNames(
                  day.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-500',
                  'relative px-3 py-2',
                )}
              >
                <time
                  dateTime={day.date}
                  className={
                    day.isToday
                      ? 'flex z-10 size-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white'
                      : undefined
                  }
                >
                  {day.date.split('-').pop().replace(/^0/, '')}
                </time>
                {day.events.length > 0 && (
                  <ol className="mt-2">
                    {day.events.slice(0, 2).map((event) => (
                      <li key={event.id}>
                        <a href={event.href} className="group flex">
                          <p className="flex-auto truncate font-medium">
                            {event.name}
                          </p>
                        </a>
                      </li>
                    ))}
                    {day.events.length > 2 && <li className="text-gray-600">+ {day.events.length - 2} more</li>}
                  </ol>
                )}
              </div>
            ))}
          </div>
          <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
            {days.map((day) => (
              <button
                key={day.date}
                type="button"
                className={classNames(
                  day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                  (day.isSelected || day.isToday) && 'font-semibold',
                  day.isSelected && 'text-white',
                  !day.isSelected && day.isToday && 'text-indigo-600',
                  !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900',
                  !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-500',
                  'flex h-14 flex-col px-3 py-2 hover:bg-gray-100 focus:z-10',
                )}
              >
                <time
                  dateTime={day.date}
                  className={classNames(
                    day.isSelected && 'flex size-6 items-center justify-center rounded-full',
                    day.isSelected && day.isToday && 'bg-indigo-600',
                    day.isSelected && !day.isToday && 'bg-gray-900',
                    'ml-auto',
                  )}
                >
                  {day.date.split('-').pop().replace(/^0/, '')}
                </time>
                <span className="sr-only">{day.events.length} events</span>
                {day.events.length > 0 && (
                  <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                    {day.events.map((event) => (
                      <span key={event.id} className="mx-0.5 mb-1 size-1.5 rounded-full bg-gray-400" />
                    ))}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      {selectedDay?.events.length > 0 && (
        <div className="px-4 py-10 sm:px-6 lg:hidden">
          <ol className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black/5">
            {selectedDay.events.map((event) => (
              <li key={event.id} className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50">
                <div className="flex-auto">
                  <p className="font-semibold text-gray-900">{event.name}</p>
                </div>
                <a
                  href={event.href}
                  className="ml-6 flex-none self-center rounded-md bg-white px-3 py-2 font-semibold text-gray-900 opacity-0 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:opacity-100 group-hover:opacity-100"
                >
                  Edit<span className="sr-only">, {event.name}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}

