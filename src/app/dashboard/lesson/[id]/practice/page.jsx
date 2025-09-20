'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { usegetLessonPractice, useupdateword } from '@/hooks/lessons'
import { useParams } from 'next/navigation'

export default function PracticePage() {
  const { id } = useParams();
  const { data, isLoading, error, refetch } = usegetLessonPractice(id); //practice words
  const words = data?.words

  const updatewordMutation = useupdateword();

  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState("")
  const [result, setResult] = useState(null) // correct | wrong | null
  const [learned, setLearned] = useState([])
  const [unlearned, setUnlearned] = useState([])
  const [finished, setFinished] = useState(false)

  // Har bir so'z uchun id ni chiqaruvchi funksiya
  const logWordCheck = (id, isCorrect) => {
    const learned = isCorrect ? 1 : 0
    updatewordMutation.mutate({ id, learned })
  }

  const checkAnswer = () => {
    const isCorrect = answer.trim().toLowerCase() === words?.[index]?.uz?.toLowerCase();
    logWordCheck(words?.[index]?.id, isCorrect);
    if (isCorrect) {
      setResult("correct")
      setLearned([...(learned || []), words?.[index]])
      setTimeout(() => nextWord(), 1000) // 1 sekunddan keyin avtomatik keyingiga o'tadi
    } else {
      setResult("wrong")
    }
  }

  const nextWord = () => {
    setAnswer("")
    setResult(null)
    if (index + 1 < (words?.length || 0)) {
      setIndex(index + 1)
    } else {
      setFinished(true)
    }
  }

  const skipWord = () => {
    setUnlearned([...(unlearned || []), words?.[index]])
    nextWord()
  }

  if (isLoading || !words) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="text-lg text-gray-500">Loading...</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 md:px-8 lg:px-12 py-10">
        {!finished ? (
          <div className="bg-white rounded-xl shadow-sm p-8">
            {/* Progress */}
            <div className="mb-6">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-blue-600 transition-all"
                  style={{ width: `${((index + 1) / (words?.length || 1)) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2 text-center">
                {index + 1} / {words?.length || 0}
              </p>
            </div>

            {/* Word */}
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
              {words?.[index]?.en}
            </h2>

            {/* Input */}
            <input
              type="text"
              placeholder="Write the translation..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Result */}
            {result === "correct" && (
              <p className="text-green-600 font-semibold mt-3 text-center">✅ Correct!</p>
            )}
            {result === "wrong" && (
              <p className="text-red-600 font-semibold mt-3 text-center">❌ Wrong! Try again.</p>
            )}

            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={checkAnswer}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Check
              </button>
              <button
                onClick={skipWord}
                className="px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
              >
                Skip
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <h2 className="text-2xl font-bold mb-6">Practice Finished 🎉</h2>

            {/* Learned words */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-green-600 mb-2">✅ Learned Words</h3>
              {learned?.length === 0 ? (
                <p className="text-gray-500">No words learned.</p>
              ) : (
                <ul className="space-y-1">
                  {learned?.map?.((w, i) => (
                    <li key={i}>{w?.en} → {w?.uz}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* Unlearned words */}
            <div>
              <h3 className="text-lg font-semibold text-red-600 mb-2">❌ Unlearned Words</h3>
              {unlearned?.length === 0 ? (
                <p className="text-gray-500">No unlearned words.</p>
              ) : (
                <ul className="space-y-1">
                  {unlearned?.map?.((w, i) => (
                    <li key={i}>{w?.en} → {w?.uz}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* Back button */}
            <div className="mt-8">
              <Link
                href="/dashboard"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                ← Back to Dashboard
              </Link>
            </div>
          </div>
        )}
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
