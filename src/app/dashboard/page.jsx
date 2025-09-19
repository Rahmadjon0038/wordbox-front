'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import CreateLessonModal from '@/components/ui/modals/CreateLessonModals'
import Login from '@/components/ui/modals/login'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useAddLesson, usegetAllLessons } from '@/hooks/lessons'

export default function Dashboard() {
  const { data, isLoading, error } = usegetAllLessons();
  const lessons = data?.lessons
  const lessonMutation = useAddLesson();


  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-10">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <StatCard label="Total Lessons" value={lessons?.length} />
          <StatCard label="Total Words" value={lessons?.reduce((sum, l) => sum + l.words, 0)} />
          <StatCard label="Learned Words" value={lessons?.reduce((sum, l) => sum + l.learned, 0)} />
        </div>

        {/* Lessons */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">My Lessons</h2>
          <CreateLessonModal >
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              + New Lesson
            </button>
          </CreateLessonModal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons?.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </main >
    </div >
  )
}

function Navbar() {
  const router = useRouter();

  const logout = () => {
    Cookies.remove('role')
    router.push('/')
  }
  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">WM</div>
          <span className="font-bold text-gray-800">WordMaster</span>
        </Link>

        <div className="flex items-center gap-4">
          {/* <Login>
            <button className="text-gray-600 hover:text-gray-900">Login</button>
          </Login> */}
          <Link href="/profile" className="text-gray-600 hover:text-gray-900">Profile</Link>

          <button onClick={logout} className="px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-600">Logout</button>
        </div>
      </div>
    </nav>
  )
}

function StatCard({ label, value }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-bold mt-2">{value}</div>
    </div>
  )
}

function LessonCard({ lesson }) {
  const progress = Math.round((lesson.learned / lesson.words) * 100)

  return (
    <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between">
      <div>
        <p>{lesson?.id}</p>
        <h3 className="text-lg font-semibold mb-2">{lesson.title}</h3>
        <p className="text-sm text-gray-500 mb-4">{lesson.words} words • {lesson.learned} learned</p>

        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mb-4">
          <div className="h-full bg-blue-600" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="flex gap-3">
        <Link href={`/dashboard/lesson/${lesson.id}`} className="flex-1 text-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Open</Link>
        <Link href={`/dashboard/lesson/${lesson.id}/practice`} className="flex-1 text-center px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition">Practice</Link>
      </div>
    </div>
  )
}
