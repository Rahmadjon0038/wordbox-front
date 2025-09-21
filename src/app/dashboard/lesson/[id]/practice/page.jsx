'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { usegetLessonPractice, useupdateword } from '@/hooks/lessons'
import { useParams } from 'next/navigation'
import { BookOpen, ArrowLeftCircle } from "lucide-react";
import Loader from '@/components/ui/loaders/Loader'
import { CheckCircle, XCircle, Trophy, RotateCcw, Home } from "lucide-react";
export default function PracticePage() {
  const { id } = useParams();
  const { data, isLoading } = usegetLessonPractice(id);
  const words = data?.words || []

  const updatewordMutation = useupdateword();

  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState("")
  const [result, setResult] = useState(null)
  const [learned, setLearned] = useState([])
  const [unlearned, setUnlearned] = useState([])
  const [finished, setFinished] = useState(false)
  const [showTranslate, setShowTranslate] = useState(false)

  // mode: "en-uz" yoki "uz-en"
  const [mode, setMode] = useState(null)

  const logWordCheck = (id, isCorrect) => {
    const learned = isCorrect ? 1 : 0
    updatewordMutation.mutate({ id, learned })
  }

  const checkAnswer = () => {
    const currentWord = words[index]
    const correctAnswer = mode === "en-uz"
      ? currentWord?.uz?.toLowerCase()
      : currentWord?.en?.toLowerCase()

    const isCorrect = answer.trim().toLowerCase() === correctAnswer
    logWordCheck(currentWord?.id, isCorrect)
    if (isCorrect) {
      setResult("correct")
      setLearned([...learned, currentWord])
      setTimeout(() => nextWord(), 1000)
    } else {
      setResult("wrong")
    }
  }

  const nextWord = () => {
    setAnswer("")
    setResult(null)
    setShowTranslate(false)
    if (index + 1 < words.length) {
      setIndex(index + 1)
    } else {
      setFinished(true)
    }
  }

  const skipWord = () => {
    setUnlearned([...unlearned, words[index]])
    logWordCheck(words[index]?.id, false)
    nextWord()
  }

  const translateWord = () => {
    setUnlearned([...unlearned, words[index]])
    logWordCheck(words[index]?.id, false)
    setShowTranslate(true)
  }

  const restart = () => {
    setIndex(0)
    setAnswer("")
    setResult(null)
    setLearned([])
    setUnlearned([])
    setFinished(false)
    setShowTranslate(false)
    setMode(null)
  }

  const speakWord = (text) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    window.speechSynthesis.speak(utterance)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="text-lg text-gray-500"><Loader /></span>
      </div>
    )
  }

  if (!words || words.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-8">
        <div className="bg-white w-full max-w-2xl p-12 rounded-3xl border border-gray-200 text-center">
          <div className="flex flex-col items-center gap-6">
            {/* Icon */}
            <BookOpen className="w-16 h-16 text-blue-600" />

            {/* Title */}
            <h2 className="text-3xl font-extrabold text-gray-800">
              So‘zlar mavjud emas 😕
            </h2>
            <p className="text-gray-500 text-lg">
              Hozircha hech qanday so‘z topilmadi. Keyinroq urinib ko‘ring.
            </p>

            {/* Button */}
            <Link
              href="/dashboard"
              className="mt-6 inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-2xl hover:bg-blue-700 transition"
            >
              <ArrowLeftCircle className="w-6 h-6" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-10">
        {!mode ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <h2 className="text-xl font-bold mb-6">Choose Mode</h2>
            <div className="flex gap-6 justify-center">
              <button
                onClick={() => setMode("en-uz")}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                English → Uzbek
              </button>
              <button
                onClick={() => setMode("uz-en")}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Uzbek → English
              </button>
            </div>
          </div>
        ) : !finished ? (
          <div className="bg-white rounded-xl shadow-sm p-8">
            {/* Progress */}
            <div className="mb-6">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-blue-600 transition-all"
                  style={{ width: `${((index + 1) / words.length) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2 text-center">
                {index + 1} / {words.length}
              </p>
            </div>

            {/* Word */}
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
              {mode === "en-uz" ? words[index]?.en : words[index]?.uz}
            </h2>

            {/* Listen button faqat en-uz da */}
            {mode === "en-uz" && (
              <div className="flex justify-center mb-4">
                <button
                  onClick={() => speakWord(words[index]?.en)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  🔊 Listen
                </button>
              </div>
            )}

            {/* Input */}
            <input
              type="text"
              placeholder="Write the translation..."
              value={answer}
              disabled={showTranslate}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />

            {/* Result */}
            {result === "correct" && (
              <p className="text-green-600 font-semibold mt-3 text-center"> Correct!</p>
            )}
            {result === "wrong" && !showTranslate && (
              <p className="text-red-600 font-semibold mt-3 text-center"> Wrong! Try again.</p>
            )}

            {/* Translate */}
            {showTranslate && (
              <p className=" font-semibold mt-3 text-center">
                translation: {mode === "en-uz" ? words[index]?.uz : words[index]?.en}
              </p>
            )}

            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={checkAnswer}
                disabled={showTranslate}
                className={`px-6 py-3 rounded-lg text-white transition ${showTranslate
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
                  }`}
              >
                Check
              </button>
              <button
                onClick={skipWord}
                className="px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
              >
                Skip
              </button>
              <button
                onClick={translateWord}
                disabled={showTranslate}
                className={`px-6 py-3 rounded-lg text-white transition ${showTranslate
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-yellow-500 hover:bg-yellow-600'
                  }`}
              >
                Translate
              </button>
            </div>
          </div>
        ) : (

          <div className="min-h-screen flex items-center justify-center ">
            <div className="w-full max-w-7xl bg-white p-12 rounded-3xl border border-gray-200">
              {/* Title */}
              <div className="flex flex-col items-center mb-12">
                <Trophy className="w-14 h-14 text-yellow-500 mb-4" />
                <h2 className="text-4xl font-extrabold text-gray-800 text-center">
                  Practice Finished 🎉
                </h2>
                <p className="text-gray-500 mt-3 text-lg text-center max-w-xl">
                  Here are the results of your practice session:
                </p>
              </div>

              {/* Words Section */}
              <div className="flex flex-col lg:flex-row gap-12">
                {/* Learned words */}
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-green-600 mb-6 flex items-center gap-3">
                    <CheckCircle className="w-7 h-7" /> Learned Words
                  </h3>
                  {learned.length === 0 ? (
                    <p className="text-gray-400 italic">No words learned.</p>
                  ) : (
                    <ul className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                      {learned.map((w, i) => (
                        <li
                          key={i}
                          className="bg-green-50 text-green-800 px-5 py-3 rounded-xl flex justify-between items-center"
                        >
                          <span className="font-medium">{w.en}</span>
                          <span className="font-semibold">→</span>
                          <span>{w.uz}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Unlearned words */}
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-red-600 mb-6 flex items-center gap-3">
                    <XCircle className="w-7 h-7" /> Unlearned Words
                  </h3>
                  {unlearned.length === 0 ? (
                    <p className="text-gray-400 italic">No unlearned words.</p>
                  ) : (
                    <ul className="space-y-3 max-h-[60vh] overflow-y-auto pl-2">
                      {unlearned.map((w, i) => (
                        <li
                          key={i}
                          className="bg-red-50 text-red-800 px-5 py-3 rounded-xl flex justify-between items-center"
                        >
                          <span className="font-medium">{w.en}</span>
                          <span className="font-semibold">→</span>
                          <span>{w.uz}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-12 flex flex-col lg:flex-row gap-6 justify-center">
                <button
                  onClick={restart}
                  className="px-12 py-3 flex items-center justify-center gap-2 bg-green-600 text-white  font-semibold rounded-2xl hover:bg-green-700 transition"
                >
                  <RotateCcw className="w-6 h-6" />
                  Restart
                </button>

                <Link
                  href={`/dashboard/lesson/${id}`}
                  className="px-12  flex items-center justify-center gap-2 bg-blue-600 text-white  font-medium rounded-2xl hover:bg-blue-700 transition"
                >
                  <Home className="w-6 h-6" />
                  Back to Dashboard
                </Link>
              </div>
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
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-4 flex items-center justify-between">
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
