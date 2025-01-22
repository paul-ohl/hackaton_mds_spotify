'use client';

import React, { useEffect, useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarIcon,
  ArrowLeftIcon,
} from '@heroicons/react/20/solid'
import Drawer from './_components/drawer';
import MonthView from './_components/month_view';
import Link from 'next/link';
import { usePlaylist } from '../context/PlaylistContext';
import { SpotifyTrack } from '../types/spotify';

export type Day = {
  date: string;
  tracks: SpotifyTrack[];
  isCurrentMonth?: boolean;
  isToday?: boolean;
  isSelected?: boolean;
};

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Calendar() {
  const [selectedDay, setSelectedDay] = useState<Day | null>(null);
  const [currentView, setCurrentView] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [songs, setSongs] = useState<SpotifyTrack[]>([]);

  const { playlists } = usePlaylist();

  const formatter = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });

  useEffect(() => {
    setSongs(playlists[0]?.tracks?.items || []);
  }, [playlists]);

  return (
    <div className="min-h-screen p-4 lg:p-8 bg-gray-50 dark:bg-gray-900" >
      <Drawer selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      <div className="mx-auto max-w-7xl rounded-2xl bg-white dark:bg-gray-800" >
        <header className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between border-b border-border dark:border-border-dark p-6" >
          <div className="flex items-center space-x-4">
            <Link href="/">
              <ArrowLeftIcon className="size-8 text-primary dark:text-primary-dark" />
            </Link>
            <CalendarIcon className="size-8 text-accent dark:text-accent-dark" />
            <div>
              <h1 className="text-2xl font-bold text-accent dark:text-accent-dark">Calendar</h1>
              <p className="text-primary dark:text-primary-dark">{formatter.format(currentDate)}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Navigation Controls */}
            <div className="flex items-center rounded-lg shadow-sm">
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-l-lg border dark:bg-gray-700 bg-gray-200 dark:hover:bg-gray-600 hover:bg-gray-300 border-border dark:border-border-dark text-primary dark:text-primary-dark"
                onClick={() => setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, d.getDate()))}
              >
                <ChevronLeftIcon className="size-5" />
              </button>
              <button
                type="button"
                className="hidden px-4 font-medium border-y sm:block h-10 dark:bg-gray-700 bg-gray-200 dark:hover:bg-gray-600 hover:bg-gray-300 border-border dark:border-border-dark text-primary dark:text-primary-dark"
                onClick={() => setCurrentDate(new Date())}
              >
                Today
              </button>
              <button
                type="button"
                className=
                "flex h-10 w-10 items-center justify-center rounded-r-lg border dark:bg-gray-700 bg-gray-200 dark:hover:bg-gray-600 hover:bg-gray-300 border-border dark:border-border-dark text-primary dark:text-primary-dark"
                onClick={() => setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, d.getDate()))}
              >
                <ChevronRightIcon className="size-5" />
              </button>
            </div>

            {/* View Selector */}
            <Menu as="div" className="relative">
              <MenuButton className="flex items-center space-x-2 rounded-lg px-4 py-2 border dark:bg-gray-700 bg-gray-200 dark:hover:bg-gray-600 hover:bg-gray-300 border-border dark:border-border-dark text-primary dark:text-primary-dark" >
                <span>{currentView.charAt(0).toUpperCase() + currentView.slice(1)} view</span>
                <ChevronDownIcon className="size-4" />
              </MenuButton>

              <MenuItems className="absolute right-0 z-10 mt-2 w-40 rounded-lg py-1 dark:bg-gray-800 bg-white text-primary dark:text-primary-dark ring-1 ring-black ring-opacity-5" >
                {['month', 'year'].map((view) => (
                  <MenuItem key={view}>
                    <button
                      onClick={() => setCurrentView(view)}
                      className={classNames(
                        "block w-full px-4 py-2 text-left dark:hover:bg-gray-600 hover:bg-gray-300",
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

        <MonthView currentDate={currentDate} setSelectedDay={setSelectedDay} songs={songs} />
      </div>
    </div >
  );
}
