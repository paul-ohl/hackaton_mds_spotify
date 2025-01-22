import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Day } from "../page";
import { SpotifyTrack } from "@/app/types/spotify";

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

function formatDate(date: Date) {
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

function getDaysArray(currentDate: Date, songs: SpotifyTrack[]) {
  const startOfWeekDay = 1; // Monday
  // const areSongsDisplayedEveryYear = false; // Display songs from previous years

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const getAdjustedWeekDay = (date: Date) => (date.getDay() + (7 - startOfWeekDay)) % 7;

  const generateDaysArray = (startDate: Date, length: number, isCurrentMonth: boolean) => {
    return Array.from({ length }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const day: Day = {
        date: formatDate(date),
        isToday: date.toDateString() === today.toDateString(),
        isCurrentMonth,
        tracks: songs.filter((song) => new Date(song.added_at).toDateString() === date.toDateString())
      };
      return day;
    });
  };

  // Calculate first and last days of the week
  const firstDayOfWeek = getAdjustedWeekDay(new Date(year, month, 1));
  const lastDayOfWeek = getAdjustedWeekDay(new Date(year, month, daysInMonth));

  // Generate days before the current month
  const daysBefore = generateDaysArray(
    new Date(year, month, 1 - firstDayOfWeek),
    firstDayOfWeek,
    false
  );

  // Generate days in the current month
  const daysOfMonth = generateDaysArray(
    new Date(year, month, 1),
    daysInMonth,
    true
  );

  // Generate days after the current month
  const daysAfter = generateDaysArray(
    new Date(year, month, daysInMonth + 1),
    6 - lastDayOfWeek,
    false
  );

  // Combine all days and set state
  return ([...daysBefore, ...daysOfMonth, ...daysAfter]);
}

interface MonthViewProps {
  currentDate: Date;
  setSelectedDay: Dispatch<SetStateAction<Day | null>>;
  songs: SpotifyTrack[];
}

export default function MonthView({ currentDate, setSelectedDay, songs }: MonthViewProps) {
  const [days, setDays] = useState<Day[]>([]);

  useEffect(() => {
    setDays(getDaysArray(currentDate, songs));
  }, [currentDate, songs]);

  return (
    <div className="shadow lg:flex lg:flex-auto lg:flex-col">
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-px border-b text-center text-xs font-medium border-border dark:border-border-dark text-primary dark:text-primary-dark">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <div
            key={day}
            className="py-3 dark:bg-gray-800 bg-white"
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
                'group relative min-h-[100px] py-2 px-3 border-b border-border dark:border-border-dark dark:hover:bg-gray-700 hover:bg-gray-100 ',
                day.isCurrentMonth ? 'dark:bg-gray-800 bg-white' : 'dark:bg-gray-900/50 bg-gray-50',
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
                )}
              >
                {day.date.split('-').pop()?.replace(/^0/, '')}
              </time>

              {/* Songs list */}
              {day.tracks.length > 0 && (
                <ol className="mt-2 space-y-1 text-primary dark:text-primary-dark">
                  {day.tracks.slice(0, 2).map((event) => (
                    <li
                      key={event.track.id + new Date(event.added_at).toISOString()}
                      className="rounded-md px-2 dark:hover:bg-gray-600 hover:bg-gray-300"
                    >
                      <a onClick={() => setSelectedDay(day)} className="flex group">
                        <p className="flex-auto truncate text-sm font-medium">
                          {event.track.name}
                        </p>
                      </a>
                    </li>
                  ))}
                  {day.tracks.length > 2 && (
                    <li className="rounded-md px-2 dark:hover:bg-gray-600 hover:bg-gray-300" >
                      <a onClick={() => setSelectedDay(day)} className="flex group">
                        <p className="flex-auto truncate text-sm font-medium">
                          + {day.tracks.length - 2} more
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
  );
}
