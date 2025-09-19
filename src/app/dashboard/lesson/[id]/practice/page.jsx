'use client'
import React, { useState } from 'react'
import Link from 'next/link'

export default function PracticePage() {
 const words = [
  // Oddiy so'zlar
  { en: "apple", uz: "olma" },
  { en: "book", uz: "kitob" },
  { en: "friend", uz: "do‘st" },

  // Erkak va ayollar uchun
  { en: "man", uz: "erkak" },
  { en: "woman", uz: "ayol" },
  { en: "boy", uz: "o‘g‘il bola" },
  { en: "girl", uz: "qiz bola" },
  { en: "father", uz: "ota" },
  { en: "mother", uz: "ona" },
  { en: "son", uz: "o‘g‘il" },
  { en: "daughter", uz: "qiz" },
  { en: "brother", uz: "aka / uka" },
  { en: "sister", uz: "opa / singil" },
  { en: "husband", uz: "er" },
  { en: "wife", uz: "xotin / turmush o‘rtog‘i" },
  { en: "uncle", uz: "amaki / tog‘a" },
  { en: "aunt", uz: "amma / xola" },
  { en: "nephew", uz: "jiyan (o‘g‘il)" },
  { en: "niece", uz: "jiyan (qiz)" },
  { en: "grandfather", uz: "bobo" },
  { en: "grandmother", uz: "buvi" },
  { en: "grandson", uz: "nabira (o‘g‘il)" },
  { en: "granddaughter", uz: "nabira (qiz)" },
  { en: "king", uz: "podsho" },
  { en: "queen", uz: "qirolicha / malika" },
  { en: "prince", uz: "shahzoda" },
  { en: "princess", uz: "malikaxon" },
  { en: "actor", uz: "aktyor" },
  { en: "actress", uz: "aktrisa" },
  { en: "waiter", uz: "ofitsiant (erkak)" },
  { en: "waitress", uz: "ofitsiantka (ayol)" },
  { en: "policeman", uz: "militsioner (erkak)" },
  { en: "policewoman", uz: "militsioner (ayol)" },
  { en: "gentleman", uz: "janob" },
  { en: "lady", uz: "xonim" },
  { en: "hero", uz: "qahramon (erkak)" },
  { en: "heroine", uz: "qahramon (ayol)" },
  { en: "host", uz: "mezbon (erkak)" },
  { en: "hostess", uz: "mezbon (ayol)" },
  { en: "steward", uz: "parvoz xodimi (erkak)" },
  { en: "stewardess", uz: "parvoz xodimasi (ayol)" },
  { en: "bachelor", uz: "yolg‘iz (uylanmagan)" },
  { en: "spinster", uz: "turmushga chiqmagan ayol" },
  { en: "wizard", uz: "sehrgar (erkak)" },
  { en: "witch", uz: "sehrgar (ayol)" },
  { en: "duke", uz: "gersog" },
  { en: "duchess", uz: "gersoginya" },
  { en: "lord", uz: "janob / hukmdor" },
  { en: "lady", uz: "xonim" },
  { en: "emperor", uz: "imperator" },
  { en: "empress", uz: "imperator ayol" },
  { en: "god", uz: "xudo (erkak ko‘rinishida)" },
  { en: "goddess", uz: "ma’buda" },
  { en: "monk", uz: "rohib" },
  { en: "nun", uz: "rohiba" },

  // Hayvonlarda
  { en: "bull", uz: "buqa" },
  { en: "cow", uz: "sigir" },
  { en: "rooster", uz: "xo‘roz" },
  { en: "hen", uz: "tovuq" },
  { en: "stallion", uz: "ayg‘ir" },
  { en: "mare", uz: "biy" },
  { en: "ram", uz: "qo‘chqor" },
  { en: "ewe", uz: "qo‘y" },
  { en: "dog", uz: "it (erkak)" },
  { en: "bitch", uz: "it (urg‘ochi)" },
  { en: "tiger", uz: "yo‘lbars (erkak)" },
  { en: "tigress", uz: "yo‘lbars (urg‘ochi)" },
  { en: "lion", uz: "sher (erkak)" },
  { en: "lioness", uz: "sher (urg‘ochi)" },

  // Boshqa umumiy so'zlar
  { en: "great", uz: "zo‘r / ajoyib" },
  { en: "bad", uz: "yomon" },
  { en: "sad", uz: "xafa / g‘amgin" },
  { en: "hobby", uz: "qiziqish / hobi" },
  { en: "favorite", uz: "sevimli" },
  { en: "study", uz: "o‘qish / o‘rganish" },
  { en: "what", uz: "nima" },
  { en: "which", uz: "qaysi" },
  { en: "why", uz: "nega" },
  { en: "low", uz: "past" },
  { en: "well", uz: "yaxshi" },
  { en: "make sure", uz: "ishonch hosil qilmoq" },
  { en: "general", uz: "umumiy" },
  { en: "live", uz: "yashamoq / jonli" }
]



  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState("")
  const [result, setResult] = useState(null) // correct | wrong | null
  const [learned, setLearned] = useState([])
  const [unlearned, setUnlearned] = useState([])
  const [finished, setFinished] = useState(false)

  const checkAnswer = () => {
    if (answer.trim().toLowerCase() === words[index].uz.toLowerCase()) {
      setResult("correct")
      setLearned([...learned, words[index]])
      setTimeout(() => nextWord(), 1000) // 1 sekunddan keyin avtomatik keyingiga o'tadi
    } else {
      setResult("wrong")
    }
  }

  const nextWord = () => {
    setAnswer("")
    setResult(null)
    if (index + 1 < words.length) {
      setIndex(index + 1)
    } else {
      setFinished(true)
    }
  }

  const skipWord = () => {
    setUnlearned([...unlearned, words[index]])
    nextWord()
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
                  style={{ width: `${((index + 1) / words.length) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2 text-center">
                {index + 1} / {words.length}
              </p>
            </div>

            {/* Word */}
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
              {words[index].en}
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
              {learned.length === 0 ? (
                <p className="text-gray-500">No words learned.</p>
              ) : (
                <ul className="space-y-1">
                  {learned.map((w, i) => (
                    <li key={i}>{w.en} → {w.uz}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* Unlearned words */}
            <div>
              <h3 className="text-lg font-semibold text-red-600 mb-2">❌ Unlearned Words</h3>
              {unlearned.length === 0 ? (
                <p className="text-gray-500">No unlearned words.</p>
              ) : (
                <ul className="space-y-1">
                  {unlearned.map((w, i) => (
                    <li key={i}>{w.en} → {w.uz}</li>
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
