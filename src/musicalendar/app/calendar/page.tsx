'use client'

import React, { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  EllipsisHorizontalIcon,
  SunIcon,
  MoonIcon,
  CalendarIcon,
  PlusIcon
} from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const days = [
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
    events: [
      { id: 1, name: 'Design review', time: '10AM', datetime: '2022-01-03T10:00', href: '#' },
      { id: 2, name: 'Sales meeting', time: '2PM', datetime: '2022-01-03T14:00', href: '#' },
    ],
  },
  { date: '2022-01-04', isCurrentMonth: true, events: [] },
  { date: '2022-01-05', isCurrentMonth: true, events: [] },
  { date: '2022-01-06', isCurrentMonth: true, events: [] },
  {
    date: '2022-01-07',
    isCurrentMonth: true,
    events: [{ id: 3, name: 'Date night', time: '6PM', datetime: '2022-01-08T18:00', href: '#' }],
  },
  { date: '2022-01-08', isCurrentMonth: true, events: [] },
  { date: '2022-01-09', isCurrentMonth: true, events: [] },
  { date: '2022-01-10', isCurrentMonth: true, events: [] },
  { date: '2022-01-11', isCurrentMonth: true, events: [] },
  {
    date: '2022-01-12',
    isCurrentMonth: true,
    isToday: true,
    events: [{ id: 6, name: "Sam's birthday party", time: '2PM', datetime: '2022-01-25T14:00', href: '#' }],
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
    isSelected: true,
    events: [
      { id: 4, name: 'Maple syrup museum', time: '3PM', datetime: '2022-01-22T15:00', href: '#' },
      { id: 5, name: 'Hockey game', time: '7PM', datetime: '2022-01-22T19:00', href: '#' },
    ],
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
    events: [{ id: 7, name: 'Cinema with friends', time: '9PM', datetime: '2022-02-04T21:00', href: '#' }],
  },
  { date: '2022-02-05', events: [] },
  { date: '2022-02-06', events: [] },
]


const selectedDay = days.find((day) => day.isSelected)

export default function Calendar() {
  const [isDark, setIsDark] = useState(false);
  const [currentView, setCurrentView] = useState('month');

  const baseTheme = {
    layout: isDark ? 'bg-gray-900' : 'bg-gray-50',
    card: isDark ? 'bg-gray-800' : 'bg-white',
    text: isDark ? 'text-white' : 'text-gray-800',
    border: isDark ? 'border-gray-700' : 'border-gray-200',
    buttonBg: isDark ? 'bg-gray-700' : 'bg-white',
    buttonHover: isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-50',
    secondaryText: isDark ? 'text-gray-800' : 'text-gray-700',
    menuBg: isDark ? 'bg-gray-800' : 'bg-white',
    calendarDayBg: isDark ? 'bg-gray-800' : 'bg-white',
    calendarDayHover: isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100',
    inactiveDay: isDark ? 'bg-gray-900/50 text-gray-500' : 'bg-gray-50 text-gray-600',
    accent: 'bg-indigo-600 hover:bg-indigo-500',
    accentText: 'text-indigo-600',
    shadow: isDark ? '' : 'shadow-lg',
    transition: 'transition-all duration-200 ease-in-out'
  };

  return (
    <div className={classNames(
      "min-h-screen p-4 lg:p-8",
      baseTheme.layout,
      baseTheme.transition
    )}>
      <div className={classNames(
        "mx-auto max-w-7xl rounded-2xl",
        baseTheme.card,
        baseTheme.shadow,
        baseTheme.transition
      )}>
        <header className={classNames(
          "flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between border-b p-6",
          baseTheme.border
        )}>
          <div className="flex items-center space-x-4">
            <CalendarIcon className={classNames("size-8", baseTheme.accentText)} />
            <div>
              <h1 className="text-2xl font-bold text-gray-600">Calendar</h1>
              <p className={baseTheme.secondaryText}>January 2022</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className={classNames(
                "rounded-full p-2",
                baseTheme.buttonBg,
                baseTheme.buttonHover,
                baseTheme.transition
              )}
            >
              {isDark ? (
                <SunIcon className="size-5 text-yellow-400" />
              ) : (
                <MoonIcon className="size-5 text-gray-600" />
              )}
            </button>

            {/* Navigation Controls */}
            <div className="flex items-center rounded-lg shadow-sm">
              <button
                type="button"
                className={classNames(
                  "flex h-10 w-10 items-center justify-center rounded-l-lg border",
                  baseTheme.buttonBg,
                  baseTheme.buttonHover,
                  baseTheme.border,
                  baseTheme.transition, 
                  baseTheme.text
                )}
              >
                <ChevronLeftIcon className="size-5" />
              </button>
              <button
                type="button"
                className={classNames(
                  "hidden px-4 font-medium border-y sm:block",
                  baseTheme.buttonBg,
                  baseTheme.buttonHover,
                  baseTheme.border,
                  baseTheme.transition,
                  baseTheme.text
                )}
              >
              <button
                  type="button"
                  className={classNames(
                    "hidden px-4 font-medium border-y sm:block",
                    baseTheme.buttonBg,
                    baseTheme.buttonHover,
                    baseTheme.border,
                    baseTheme.transition,
                    baseTheme.text
                  )}
              >
                Today
              </button>
              </button>
              <button
                type="button"
                className={classNames(
                  "flex h-10 w-10 items-center justify-center rounded-r-lg border",
                  baseTheme.buttonBg,
                  baseTheme.buttonHover,
                  baseTheme.border,
                  baseTheme.transition,
                  baseTheme.text
                )}
              >
                <ChevronRightIcon className="size-5" />
              </button>
            </div>

            {/* View Selector */}
            <Menu as="div" className="relative">
              <MenuButton
                className={classNames(
                  "flex items-center space-x-2 rounded-lg px-4 py-2",
                  baseTheme.buttonBg,
                  baseTheme.buttonHover,
                  baseTheme.border,
                  baseTheme.transition, 
                  baseTheme.text
                )}
              >
                <span>{currentView.charAt(0).toUpperCase() + currentView.slice(1)} view</span>
                <ChevronDownIcon className="size-4" />
              </MenuButton>

              <MenuItems
                className={classNames(
                  "absolute right-0 z-10 mt-2 w-40 rounded-lg py-1",
                  baseTheme.menuBg,
                  baseTheme.shadow,
                  baseTheme.text,
                  "ring-1 ring-black ring-opacity-5"
                )}
              >
                {['day', 'week', 'month', 'year'].map((view) => (
                  <MenuItem key={view}>
                    {({ active }) => (
                      <button
                        onClick={() => setCurrentView(view)}
                        className={classNames(
                          "block w-full px-4 py-2 text-left",
                          active ? baseTheme.buttonHover : '',
                          view === currentView ? baseTheme.accentText : ''
                        )}
                      >
                        {view.charAt(0).toUpperCase() + view.slice(1)} view
                      </button>
                    )}
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>

            {/* Add Event Button */}
            <button
              type="button"
              className={classNames(
                "flex items-center space-x-2 rounded-lg px-4 py-2 text-white",
                baseTheme.accent,
                baseTheme.transition
              )}
            >
              <PlusIcon className="size-5" />
              <span className="hidden sm:inline">Add Event</span>
            </button>
          </div>
        </header>

        <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
          {/* Weekday Headers */}
          <div className={classNames(
            "grid grid-cols-7 gap-px border-b text-center text-xs font-medium",
            baseTheme.border
          )}>
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
                    'group relative min-h-[100px] py-2 px-3',
                    baseTheme.calendarDayHover,
                    baseTheme.transition
                  )}
                >
                  <time
                    dateTime={day.date}
                    className={classNames(
                      "flex size-6 items-center justify-center rounded-full",
                      day.isToday ? 'bg-indigo-600 text-white' : '',
                      'group-hover:bg-indigo-100 group-hover:text-indigo-600',
                      baseTheme.transition
                    )}
                  >
                    {day.date.split('-').pop().replace(/^0/, '')}
                  </time>

                  {day.events.length > 0 && (
                    <ol className="mt-2 space-y-1">
                      {day.events.slice(0, 2).map((event) => (
                        <li
                          key={event.id}
                          className={classNames(
                            "rounded-md px-2 py-1",
                            baseTheme.buttonHover,
                            baseTheme.transition
                          )}
                        >
                          <a href={event.href} className="flex group">
                            <p className="flex-auto truncate text-sm font-medium group-hover:text-indigo-600">
                              {event.name}
                            </p>
                            <time
                              dateTime={event.datetime}
                              className="ml-3 hidden flex-none text-sm xl:block"
                            >
                              {event.time}
                            </time>
                          </a>
                        </li>
                      ))}
                      {day.events.length > 2 && (
                        <li className={classNames("text-sm", baseTheme.secondaryText)}>
                          + {day.events.length - 2} more
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
  )
}