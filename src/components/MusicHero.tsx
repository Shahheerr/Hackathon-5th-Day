'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import speaker from "@/assets/JBL_BOOMBOX_2_HERO_020_x1 (1) 1.png";

function CountdownTimer() {
  const [time, setTime] = useState({
    hours: 23,
    days: 5,
    minutes: 59,
    seconds: 35,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => {
        const newTime = { ...prevTime }
        if (newTime.seconds > 0) {
          newTime.seconds--
        } else {
          newTime.seconds = 59
          if (newTime.minutes > 0) {
            newTime.minutes--
          } else {
            newTime.minutes = 59
            if (newTime.hours > 0) {
              newTime.hours--
            } else {
              newTime.hours = 23
              if (newTime.days > 0) {
                newTime.days--
              }
            }
          }
        }
        return newTime
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex gap-4 flex-wrap justify-center sm:flex-nowrap">
      {[
        { value: time.hours, label: 'Hours' },
        { value: time.days, label: 'Days' },
        { value: time.minutes, label: 'Minutes' },
        { value: time.seconds, label: 'Seconds' },
      ].map(({ value, label }) => (
        <div 
          key={label}
          className="flex flex-col items-center justify-center w-[62px] h-[62px] sm:w-[75px] sm:h-[75px] bg-white rounded-full"
        >
          <span className="text-lg sm:text-xl font-poppins font-bold text-black">
            {String(value).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs text-black/70">{label}</span>
        </div>
      ))}
    </div>
  )
}

export default function MusicHero() {
  return (
    <div className="bg-white">
      <div className="max-w-[1440px] mx-auto px-4 py-12 sm:py-20 lg:py-[140px]">
        <div className="relative w-full bg-gradient-to-br from-black to-black/80 overflow-hidden rounded-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
                <span className="text-[#00FF66] font-medium font-poppins">Categories</span>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Enhance Your<br />Music Experience
                </h1>

                <div className="flex justify-center lg:justify-start">
                  <CountdownTimer />
                </div>

                <button className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-[#00FF66] text-white font-medium rounded-[4px] font-poppins hover:bg-[#00FF66]/90 transition-colors">
                  Buy Now!
                </button>
              </div>

              <div className="relative h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
                <Image
                  src={speaker}
                  alt="JBL Speaker"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
