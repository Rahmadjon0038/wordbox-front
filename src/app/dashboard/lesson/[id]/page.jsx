'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function LessonPage() {
    const [words, setWords] = useState([
        { id: 1, english: 'cat', uzbek: 'mushuk', example: 'The cat is sleeping.', exampleUz: 'Mushuk uxlamoqda.', learned: false },
        { id: 2, english: 'dog', uzbek: 'it', example: 'The dog is barking.', exampleUz: 'It hurmoqda.', learned: true },
        { id: 3, english: 'bird', uzbek: 'qush', example: 'The bird is flying.', exampleUz: 'Qush uchmoqda.', learned: false },
        { id: 4, english: 'apple', uzbek: 'olma', example: 'The apple is red.', exampleUz: 'Olma qizil rangda.', learned: true },
        { id: 5, english: 'car', uzbek: 'mashina', example: 'The car is very fast.', exampleUz: 'Mashina juda tez.', learned: false },
    ])

    const [filter, setFilter] = useState('all') // all | learned | notLearned
    const { id } = useParams();
    // 🔊 O‘qib berish funksiyasi
    const speak = (text) => {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = 'en-US'
        window.speechSynthesis.speak(utterance)
    }

    // Statistikani hisoblash
    const total = words.length
    const learnedCount = words.filter(w => w.learned).length
    const notLearnedCount = total - learnedCount

    // Filtrlash
    const filteredWords = words.filter((w) => {
        if (filter === 'learned') return w.learned
        if (filter === 'notLearned') return !w.learned
        return true
    })

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12 py-10">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold">Lesson: Animals — Basic</h1>
                    <Link href="/dashboard" className="text-blue-600 hover:underline">← Back to Dashboard</Link>
                </div>

                {/* Statistikalar */}
                <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-white shadow rounded-lg">
                        <p className="text-gray-500">Total Words</p>
                        <p className="text-2xl font-bold">{total}</p>
                    </div>
                    <div className="p-4 bg-green-50 shadow rounded-lg">
                        <p className="text-gray-500">Learned</p>
                        <p className="text-2xl font-bold text-green-600">{learnedCount}</p>
                    </div>
                    <div className="p-4 bg-red-50 shadow rounded-lg">
                        <p className="text-gray-500">Not Learned</p>
                        <p className="text-2xl font-bold text-red-600">
                            {notLearnedCount}
                        </p>
                    </div>
                </div>

                {/* Filter buttons */}
                <div className="flex gap-3 mb-8">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                        All Words
                    </button>
                    <button
                        onClick={() => setFilter('learned')}
                        className={`px-4 py-2 rounded-lg ${filter === 'learned' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                        Learned
                    </button>
                    <button
                        onClick={() => setFilter('notLearned')}
                        className={`px-4 py-2 rounded-lg ${filter === 'notLearned' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                        Not Learned
                    </button>
                </div>

                {/* Words list */}
                <div className="p-6 bg-white rounded-xl shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Words in this Lesson</h2>
                    {filteredWords.length === 0 ? (
                        <p className="text-gray-500">No words found.</p>
                    ) : (
                        <ul className="divide-y divide-gray-200">
                            {filteredWords.map((w) => (
                                <li key={w.id} className="py-4">
                                    <div className="flex items-center justify-betweFen">
                                        <div>
                                            <div className="font-medium text-lg">
                                                {w.english} → {w.uzbek}
                                                {w.learned && <span className="ml-2 text-green-600 text-sm">(Learned)</span>}
                                            </div>
                                            <div className="text-sm text-gray-600">{w.example}</div>
                                            <div className="text-sm text-gray-500 italic">({w.exampleUz})</div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => speak(w.english)}
                                                className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
                                            >
                                                🔊 Word
                                            </button>
                                            <button
                                                onClick={() => speak(w.example)}
                                                className="px-3 py-1 bg-green-50 text-green-600 rounded-md hover:bg-green-100"
                                            >
                                                🔊 Sentence
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Practice buttons */}
                <div className="mt-8 text-center flex gap-4 justify-center">
                    {/* Umumiy practice tugmasi */}
                    <Link
                        href={`/dashboard/lesson/1/practice`}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Start Practice
                    </Link>

                    {/* Faqat yodlanmagan practice tugmasi */}
                    <Link
                        href={`/dashboard/lesson/{id}/practice/notlearned`}
                        className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                        Practice Not Learned
                    </Link>

                </div>
            </main>
        </div>
    )
}

function Navbar() {
    return (
        <nav className="w-full bg-white shadow-sm sticky top-0 z-40">
            <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12 py-4 flex items-center justify-between">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">WM</div>
                    <span className="font-bold text-gray-800">WordMaster</span>
                </Link>

                <div className="flex items-center gap-4">
                    <Link href="/profile" className="text-gray-600 hover:text-gray-900">Profile</Link>
                    <Link href="/logout" className="px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-600">Logout</Link>
                </div>
            </div>
        </nav>
    )
}
