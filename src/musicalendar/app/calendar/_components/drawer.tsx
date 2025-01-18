'use client'

import { Dispatch, SetStateAction } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Day } from '../page';
import Image from 'next/image';

interface DrawerProps {
  selectedDay: Day | null;
  setSelectedDay: Dispatch<SetStateAction<Day | null>>
};

export default function Drawer({ selectedDay, setSelectedDay }: DrawerProps) {
  return (
    <Dialog
      open={selectedDay !== null}
      onClose={() => { setSelectedDay(null) }}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                <div className="px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-base font-semibold text-gray-900">Songs of <time dateTime={selectedDay?.date}>{selectedDay?.date}</time></DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setSelectedDay(null)}
                        className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="size-6" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  {selectedDay?.events.map((event, index) => (
                    <div key={event.id} className="flex items-center py-2 border-b border-gray-200">
                      <img src={event.imageLink} alt={"album cover for " + event.name} className="rounded-md w-1/3" />
                      <div className="text-sm font-semibold text-gray-900 ml-3">{event.name}</div>
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
