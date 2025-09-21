"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { usenotPractikeWords, useupdateword } from '@/hooks/lessons'
import { CheckCircle, XCircle, BookOpen, ArrowLeftCircle } from "lucide-react";
import Loader from '@/components/ui/loaders/Loader';

export default function NotLearnedPage() {
  const { id } = useParams();
  const { data, isLoading } = usenotPractikeWords(id);
  // So'zlar ro'yxatini local state'da bir marta saqlab qo'yamiz (backend yangilansa ham yo'qolmaydi)
  const allWords = useMemo(
    () => Array.isArray(data) ? data.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) : [],
    [data]
  );

  const updatewordMutation = useupdateword();
  const [mode, setMode] = useState(null); // 'en-uz' yoki 'uz-en'
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState(null);
  const [showTranslate, setShowTranslate] = useState(false);
  // Har bir so'z uchun {id, correct} obyektini saqlaymiz
  const [results, setResults] = useState([]);
  // Yakunlash tugmasi uchun flag
  const [finished, setFinished] = useState(false);
  // To'g'ri va noto'g'ri so'zlarni yakuniy state'da saqlash
  const [finalResults, setFinalResults] = useState(null);

  // Har bir check/skip/translate tugmasida faqat local natija saqlanadi
  const updateLearned = (id, correct) => {
    setResults(prev => {
      const filtered = prev.filter(r => r.id !== id);
      if (correct) return [...filtered, { id, correct: true }];
      const wasCorrect = prev.find(r => r.id === id && r.correct);
      if (wasCorrect) return prev;
      return [...filtered, { id, correct: false }];
    });
  };

  const speakWord = (text) => {
    if (!text) return;
    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <span className="text-lg text-gray-500"><Loader/></span>
    </div>
  );

  if (!allWords.length) return (
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

  if (!mode) {
    return (
      <div className='min-h-screen bg-gray-50'>
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-10 ">
          <div className='bg-white rounded-xl shadow p-8 text-center'>
            <h2 className="text-xl font-bold mb-6">Mode-ni tanlang</h2>
            <div className="flex gap-6 justify-center">
              <button onClick={() => setMode('en-uz')} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">English → Uzbek</button>
              <button onClick={() => setMode('uz-en')} className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">Uzbek → English</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Barcha so'zlar tugasa
  if (index >= allWords.length || finalResults) {
    const showResults = finalResults || results;
    const correctWords = showResults.filter(r => r.correct).map(r => r.id);
    const wrongWords = showResults.filter(r => !r.correct).map(r => r.id);
    const handleFinish = () => {
      results.forEach(({ id, correct }) => {
        updatewordMutation.mutate({ id, learned: correct ? 1 : 0 });
      });
      setFinalResults([...results]);
      setFinished(true);
    };

    const homePage = () => {
      handleFinish()
    }

    return (
      <div className='bg-gray-50 min-h-screen'>
        <Navbar />
        <div className=" mt-12  px-64 flex  items-center justify-center ">
          <div className="w-full max-w-7xl  p-10  rounded-3xl shadow border bg-white ">
            <h2 className="text-3xl font-extrabold mb-12 text-gray-800 text-center">Barcha so‘zlar yakunlandi 🎉</h2>

            <div className="flex flex-col lg:flex-row gap-12">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-green-600 mb-6 flex items-center gap-3">
                  <CheckCircle className="w-7 h-7" /> To'g'ri topilgan so'zlar
                </h3>
                {correctWords.length === 0 ? (
                  <p className="text-gray-400 italic">Yo'q</p>
                ) : (
                  <ul className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
                    {allWords.filter(w => correctWords.includes(w.id)).map(w => (
                      <li
                        key={w.id}
                        className="bg-green-50 text-green-800 px-5 py-3 rounded-xl shadow-sm flex justify-between items-center transition  hover:bg-green-100 cursor-pointer"
                      >
                        <span className="font-medium">{w.en}</span>
                        <span className="font-semibold">→</span>
                        <span className="">{w.uz}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Noto'g'ri so'zlar */}
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-red-600 mb-6 flex items-center gap-3">
                  <XCircle className="w-7 h-7" /> Noto'g'ri yoki o'tkazib yuborilgan so'zlar
                </h3>
                {wrongWords.length === 0 ? (
                  <p className="text-gray-400 italic">Yo'q</p>
                ) : (
                  <ul className="space-y-3 pl-2">
                    {allWords.filter(w => wrongWords.includes(w.id)).map(w => (
                      <li
                        key={w.id}
                        className="bg-red-50 text-red-800 px-5 py-3 rounded-xl shadow-sm flex justify-between items-center transition  hover:bg-red-100 cursor-pointer"
                      >
                        <span className="font-medium">{w.en}</span>
                        <span className="font-semibold">→</span>
                        <span className="">{w.uz}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Yakunlash tugmasi yoki saqlangan habar */}
            <div className="mt-12 flex flex-col lg:flex-row gap-6 justify-center">
              {!finished && !finalResults ? (
                <button
                  className="w-full lg:w-1/3 py-4 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 transition"
                  onClick={handleFinish}
                >
                  Yakunlash (saqlash)
                </button>
              ) : (
                <p className="text-green-600 font-semibold text-center lg:w-1/3">Natijalar saqlandi!</p>
              )}

              <Link
                onClick={homePage}
                href={`/dashboard/lesson/${id}`}
                className="w-full lg:w-1/3 block py-4 bg-gray-500 text-white font-medium rounded-2xl hover:bg-gray-600 transition text-center"
              >
                Bosh sahifa
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const current = allWords[index];
  const correctAnswer = mode === 'en-uz' ? current.uz : current.en;
  const showWord = mode === 'en-uz' ? current.en : current.uz;

  const handleCheck = () => {
    const isCorrect = answer.trim().toLowerCase() === correctAnswer.toLowerCase();
    updateLearned(current.id, isCorrect);
    if (isCorrect) {
      setResult('correct');
      setTimeout(() => {
        setIndex(i => i + 1);
        setAnswer('');
        setResult(null);
        setShowTranslate(false);
      }, 700);
    } else {
      setResult('wrong');
    }
  };

  const handleSkip = () => {
    updateLearned(current.id, false);
    setIndex(i => i + 1);
    setAnswer('');
    setResult(null);
    setShowTranslate(false);
  };

  const handleTranslate = () => {
    updateLearned(current.id, false);
    setShowTranslate(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="h-2 rounded-full bg-blue-600 transition-all" style={{ width: `${((index + 1) / allWords.length) * 100}%` }}></div>
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center">{index + 1} / {allWords.length}</p>
          </div>

          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">{showWord}</h2>

          {/* Eshitish faqat en-uz modeda */}
          {mode === 'en-uz' && (
            <div className="flex justify-center mb-4">
              <button onClick={() => speakWord(current.en)} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">🔊 Listen</button>
            </div>
          )}

          <input
            type="text"
            placeholder={mode === 'en-uz' ? 'Write the translation in Uzbek...' : 'Write the translation in English...'}
            value={answer}
            disabled={showTranslate}
            onChange={e => setAnswer(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />

          {result === 'correct' && <p className="text-green-600 font-semibold mt-3 text-center">✅ Correct!</p>}
          {result === 'wrong' && !showTranslate && <p className="text-red-600 font-semibold mt-3 text-center">❌ Wrong! Try again.</p>}
          {showTranslate && (
            <p className="text-blue-600 font-semibold mt-3 text-center">Tarjima: {correctAnswer}</p>
          )}

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handleCheck}
              disabled={showTranslate || result === 'correct'}
              className={`px-6 py-3 rounded-lg text-white transition ${(showTranslate || result === 'correct') ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              Check
            </button>
            <button
              onClick={handleSkip}
              className="px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
            >
              Skip
            </button>
            <button
              onClick={handleTranslate}
              disabled={showTranslate}
              className={`px-6 py-3 rounded-lg text-white transition ${showTranslate ? 'bg-gray-300 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600'}`}
            >
              Translate
            </button>
          </div>
        </div>
      </main>
    </div>
  );
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

