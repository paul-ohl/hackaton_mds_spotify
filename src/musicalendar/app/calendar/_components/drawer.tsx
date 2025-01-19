'use client'

import { Dispatch, SetStateAction } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Day } from '../page';
import Image from 'next/image';

interface DrawerProps {
  selectedDay: Day | null;
  setSelectedDay: Dispatch<SetStateAction<Day | null>>;
};

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Drawer({ selectedDay, setSelectedDay }: DrawerProps) {
  const baseTheme = {
    card: 'dark:bg-gray-800 bg-white',
    text: 'dark:text-white text-gray-800',
    border: 'dark:border-gray-700 border-gray-200',
    buttonBg: 'dark:bg-gray-700 bg-gray-100',
    buttonHover: 'dark:hover:bg-gray-600 hover:bg-gray-200',
    backdrop: 'dark:bg-gray-600/75 bg-gray-500/75'
  };

  return (
    <Dialog
      open={selectedDay !== null}
      onClose={() => { setSelectedDay(null) }}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className={classNames(
          "fixed inset-0 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0",
          baseTheme.backdrop
        )}
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className={classNames("flex h-full flex-col overflow-y-scroll py-6 shadow-xl", baseTheme.card)}>
                <div className="px-4 sm:px-6">
                  <div className={classNames("flex items-start justify-between", baseTheme.text)}>
                    <DialogTitle className="text-base font-semibold">Songs of <time dateTime={selectedDay?.date}>{selectedDay?.date}</time></DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setSelectedDay(null)}
                        className={classNames("relative rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2", baseTheme.buttonBg, baseTheme.buttonHover)}
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="size-6" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  {selectedDay?.events.map((event) => (
                    <div key={event.id} className={classNames("flex items-center py-4 border-b", baseTheme.border)}>
                      <Image
                        src={event.imageLink}
                        alt={"album cover for " + event.name}
                        className="rounded-md"
                        width="100"
                        height="100"
                        unoptimized
                      />
                      <div className={classNames("text-sm font-semibold ml-3", baseTheme.text)}>{event.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
