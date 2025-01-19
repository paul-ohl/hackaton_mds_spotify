'use client';

import React, { useEffect, useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarIcon,
} from '@heroicons/react/20/solid'
import { getPlaylistTracks } from './fetch_songs';
import Drawer from './_components/drawer';

export type Day = {
  date: string;
  events: Event[];
  isCurrentMonth?: boolean;
  isToday?: boolean;
  isSelected?: boolean;
};

export type Event = {
  id: string,
  name: string,
  imageLink: string,
  href: string
};

const daysInitialValue: Day[] = [
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

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

function dateFromISO(dateString: string): string {
  return dateString.split('T')[0];
}

export default function Calendar() {
  const [days, setDays] = useState(daysInitialValue);
  const [selectedDay, setSelectedDay] = useState<Day | null>(null);
  const [currentView, setCurrentView] = useState('month');

  const baseTheme = {
    buttonBg: 'dark:bg-gray-700 bg-gray-200',
    buttonHover: 'dark:hover:bg-gray-600 hover:bg-gray-300',
    menuBg: 'dark:bg-gray-800 bg-white',
    calendarDayBg: 'dark:bg-gray-800 bg-white',
    calendarDayHover: 'dark:hover:bg-gray-700 hover:bg-gray-100',
    inactiveDay: 'dark:bg-gray-900/50 bg-gray-50',
    transition: 'transition-all duration-200 ease-in-out'
  };

  useEffect(() => {
    getPlaylistTracks("37i9dQZF1DXcBWIGoYBM5M").then((data) => {
      const songsData = JSON.parse(data).items;
      setDays((days) => days.map((day) => {
        const events: Event[] = songsData
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
  }, []);

  return (
    <div className={classNames(
      "min-h-screen p-4 lg:p-8 bg-gray-50 dark:bg-gray-900",
      baseTheme.transition
    )}>
      <Drawer selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      <div className={classNames(
        "mx-auto max-w-7xl rounded-2xl bg-white dark:bg-gray-800",
        baseTheme.transition
      )}>
        <header className={classNames(
          "flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between border-b border-border dark:border-border-dark p-6",
        )}>
          <div className="flex items-center space-x-4">
            <CalendarIcon className={classNames("size-8", "text-accent dark:text-accent-dark")} />
            <div>
              <h1 className={classNames("text-2xl font-bold", "text-accent dark:text-accent-dark")}>Calendar</h1>
              <p className={"text-primary dark:text-primary-dark"}>January 2022</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Navigation Controls */}
            <div className="flex items-center rounded-lg shadow-sm">
              <button
                type="button"
                className={classNames(
                  "flex h-10 w-10 items-center justify-center rounded-l-lg border",
                  baseTheme.buttonBg,
                  baseTheme.buttonHover,
                  "border-border dark:border-border-dark",
                  baseTheme.transition,
                  "text-primary dark:text-primary-dark"
                )}
              >
                <ChevronLeftIcon className="size-5" />
              </button>
              <button
                type="button"
                className={classNames(
                  "hidden px-4 font-medium border-y sm:block h-10",
                  baseTheme.buttonBg,
                  baseTheme.buttonHover,
                  "border-border dark:border-border-dark",
                  baseTheme.transition,
                  "text-primary dark:text-primary-dark"
                )}
              >
                Today
              </button>
              <button
                type="button"
                className={classNames(
                  "flex h-10 w-10 items-center justify-center rounded-r-lg border",
                  baseTheme.buttonBg,
                  baseTheme.buttonHover,
                  "border-border dark:border-border-dark",
                  baseTheme.transition,
                  "text-primary dark:text-primary-dark"
                )}
              >
                <ChevronRightIcon className="size-5" />
              </button>
            </div>

            {/* View Selector */}
            <Menu as="div" className="relative">
              <MenuButton
                className={classNames(
                  "flex items-center space-x-2 rounded-lg px-4 py-2 border",
                  baseTheme.buttonBg,
                  baseTheme.buttonHover,
                  "border-border dark:border-border-dark",
                  baseTheme.transition,
                  "text-primary dark:text-primary-dark"
                )}
              >
                <span>{currentView.charAt(0).toUpperCase() + currentView.slice(1)} view</span>
                <ChevronDownIcon className="size-4" />
              </MenuButton>

              <MenuItems
                className={classNames(
                  "absolute right-0 z-10 mt-2 w-40 rounded-lg py-1",
                  baseTheme.menuBg,
                  "text-primary dark:text-primary-dark",
                  "ring-1 ring-black ring-opacity-5"
                )}
              >
                {['month', 'year'].map((view) => (
                  <MenuItem key={view}>
                    <button
                      onClick={() => setCurrentView(view)}
                      className={classNames(
                        "block w-full px-4 py-2 text-left",
                        baseTheme.buttonHover,
                        view === currentView ? "text-accent dark:text-accent-dark" : ''
                      )}
                    >
                      {view.charAt(0).toUpperCase() + view.slice(1)} view
                    </button>
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          </div>
        </header>

        <div className="shadow lg:flex lg:flex-auto lg:flex-col">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-px border-b text-center text-xs font-medium border-border dark:border-border-dark text-primary dark:text-primary-dark">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div
                key={day}
                className={classNames(
                  "py-3",
                  baseTheme.calendarDayBg,
                  baseTheme.transition
                )}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="flex flex-auto overflow-hidden">
            <div className="w-full grid grid-cols-7 grid-rows-6 gap-px">
              {days.map((day) => (
                <div
                  key={day.date}
                  className={classNames(
                    day.isCurrentMonth ? baseTheme.calendarDayBg : baseTheme.inactiveDay,
                    'group relative min-h-[100px] py-2 px-3 border-b border-border dark:border-border-dark',
                    baseTheme.calendarDayHover,
                    baseTheme.transition
                  )}
                >
                  {/* Day number */}
                  <time
                    dateTime={day.date}
                    className={classNames(
                      "flex size-6 items-center justify-center rounded-full",
                      day.isToday ? 'bg-indigo-600 text-white' : undefined,
                      day.isCurrentMonth ? "text-primary dark:text-primary-dark" : "text-secondary dark:text-secondary-dark",
                      'group-hover:bg-indigo-100 group-hover:text-indigo-600',
                      baseTheme.transition
                    )}
                  >
                    {day.date.split('-').pop().replace(/^0/, '')}
                  </time>

                  {/* Songs list */}
                  {day.events.length > 0 && (
                    <ol className="mt-2 space-y-1 text-primary dark:text-primary-dark">
                      {day.events.slice(0, 2).map((event) => (
                        <li
                          key={event.id}
                          className={classNames(
                            "rounded-md px-2",
                            baseTheme.buttonHover,
                            baseTheme.transition
                          )}
                        >
                          <a onClick={() => setSelectedDay(day)} className="flex group">
                            <p className="flex-auto truncate text-sm font-medium">
                              {event.name}
                            </p>
                          </a>
                        </li>
                      ))}
                      {day.events.length > 2 && (
                        <li
                          className={classNames(
                            "rounded-md px-2",
                            baseTheme.buttonHover,
                            baseTheme.transition
                          )}
                        >
                          <a onClick={() => setSelectedDay(day)} className="flex group">
                            <p className="flex-auto truncate text-sm font-medium">
                              + {day.events.length - 2} more
                            </p>
                          </a>
                        </li>
                      )}
                    </ol>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
