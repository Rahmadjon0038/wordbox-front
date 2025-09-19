'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function LessonPage() {
    const [words, setWords] = useState([
        // Erkak va Ayollar uchun
        { id: 1, english: 'man', uzbek: 'erkak', example: 'The man is tall.', exampleUz: 'Erkak bo‘ychan.', learned: false },
        { id: 2, english: 'woman', uzbek: 'ayol', example: 'That woman is a nurse.', exampleUz: 'O‘sha ayol hamshira.', learned: false },
        { id: 3, english: 'boy', uzbek: 'o‘g‘il bola', example: 'The boy is playing football.', exampleUz: 'O‘g‘il bola futbol o‘ynamoqda.', learned: false },
        { id: 4, english: 'girl', uzbek: 'qiz bola', example: 'The girl is reading a book.', exampleUz: 'Qiz bola kitob o‘qimoqda.', learned: false },
        { id: 5, english: 'father', uzbek: 'ota', example: 'My father is a teacher.', exampleUz: 'Mening otam o‘qituvchi.', learned: false },
        { id: 6, english: 'mother', uzbek: 'ona', example: 'Her mother is kind.', exampleUz: 'Onasi mehribon.', learned: false },
        { id: 7, english: 'son', uzbek: 'o‘g‘il', example: 'They have one son.', exampleUz: 'Ularning bitta o‘g‘li bor.', learned: false },
        { id: 8, english: 'daughter', uzbek: 'qiz', example: 'His daughter is 5 years old.', exampleUz: 'Qizi 5 yoshda.', learned: false },
        { id: 9, english: 'brother', uzbek: 'aka / uka', example: 'My brother is older than me.', exampleUz: 'Akam mendan katta.', learned: false },
        { id: 10, english: 'sister', uzbek: 'opa / singil', example: 'Her sister is very smart.', exampleUz: 'Opasi juda aqlli.', learned: false },
        { id: 11, english: 'husband', uzbek: 'er', example: 'She loves her husband.', exampleUz: 'U eri bilan baxtli.', learned: false },
        { id: 12, english: 'wife', uzbek: 'xotin / turmush o‘rtog‘i', example: 'His wife is a doctor.', exampleUz: 'Xotini shifokor.', learned: false },
        { id: 13, english: 'uncle', uzbek: 'amaki / tog‘a', example: 'My uncle lives in Tashkent.', exampleUz: 'Amakim Toshkentda yashaydi.', learned: false },
        { id: 14, english: 'aunt', uzbek: 'amma / xola', example: 'Her aunt is very kind.', exampleUz: 'Xolasi juda mehribon.', learned: false },
        { id: 15, english: 'nephew', uzbek: 'jiyan (o‘g‘il)', example: 'My nephew is 10 years old.', exampleUz: 'Jiyaning 10 yoshda.', learned: false },
        { id: 16, english: 'niece', uzbek: 'jiyan (qiz)', example: 'Her niece is playing.', exampleUz: 'Jiyani o‘ynamoqda.', learned: false },
        { id: 17, english: 'grandfather', uzbek: 'bobo', example: 'My grandfather is strong.', exampleUz: 'Bobom kuchli.', learned: false },
        { id: 18, english: 'grandmother', uzbek: 'buvi', example: 'Her grandmother is kind.', exampleUz: 'Buvisi mehribon.', learned: false },
        { id: 19, english: 'grandson', uzbek: 'nabira (o‘g‘il)', example: 'He has a grandson.', exampleUz: 'Uning nabirasi bor.', learned: false },
        { id: 20, english: 'granddaughter', uzbek: 'nabira (qiz)', example: 'She has a granddaughter.', exampleUz: 'Uning nabirasi bor.', learned: false },

        // Podshohlar va boshqalar
        { id: 21, english: 'king', uzbek: 'podsho', example: 'The king is powerful.', exampleUz: 'Podsho qudratli.', learned: false },
        { id: 22, english: 'queen', uzbek: 'qirolicha / malika', example: 'The queen is kind.', exampleUz: 'Qirolicha mehribon.', learned: false },
        { id: 23, english: 'prince', uzbek: 'shahzoda', example: 'The prince is young.', exampleUz: 'Shahzoda yosh.', learned: false },
        { id: 24, english: 'princess', uzbek: 'malikaxon', example: 'The princess is beautiful.', exampleUz: 'Malika chiroyli.', learned: false },

        // Kasblar
        { id: 25, english: 'actor', uzbek: 'aktyor', example: 'The actor is famous.', exampleUz: 'Aktyor mashhur.', learned: false },
        { id: 26, english: 'actress', uzbek: 'aktrisa', example: 'The actress is talented.', exampleUz: 'Aktrisa iste’dodli.', learned: false },
        { id: 27, english: 'waiter', uzbek: 'ofitsiant (erkak)', example: 'The waiter brought food.', exampleUz: 'Ofitsiant ovqat keltirdi.', learned: false },
        { id: 28, english: 'waitress', uzbek: 'ofitsiantka (ayol)', example: 'The waitress is smiling.', exampleUz: 'Ofitsiantka jilmaymoqda.', learned: false },
        { id: 29, english: 'policeman', uzbek: 'militsioner (erkak)', example: 'The policeman is strict.', exampleUz: 'Militsioner qattiq.', learned: false },
        { id: 30, english: 'policewoman', uzbek: 'militsioner (ayol)', example: 'The policewoman is brave.', exampleUz: 'Ayol militsioner jasur.', learned: false },

        // Qolganlari (general words)
        { id: 31, english: 'great', uzbek: 'zo‘r / ajoyib', example: 'This is a great idea.', exampleUz: 'Bu ajoyib g‘oya.', learned: false },
        { id: 32, english: 'bad', uzbek: 'yomon', example: 'The weather is bad today.', exampleUz: 'Bugun ob-havo yomon.', learned: false },
        { id: 33, english: 'sad', uzbek: 'xafa / g‘amgin', example: 'She is sad today.', exampleUz: 'U bugun xafa.', learned: false },
        { id: 34, english: 'hobby', uzbek: 'qiziqish / hobi', example: 'Reading is my hobby.', exampleUz: 'O‘qish mening hobim.', learned: false },
        { id: 35, english: 'favorite', uzbek: 'sevimli', example: 'Blue is my favorite color.', exampleUz: 'Ko‘k mening sevimli rangim.', learned: false },
        { id: 36, english: 'study', uzbek: 'o‘qish / o‘rganish', example: 'I study English.', exampleUz: 'Men ingliz tilini o‘rganaman.', learned: false },
        { id: 37, english: 'what', uzbek: 'nima', example: 'What is your name?', exampleUz: 'Isming nima?', learned: false },
        { id: 38, english: 'which', uzbek: 'qaysi', example: 'Which book do you like?', exampleUz: 'Qaysi kitobni yoqtirasan?', learned: false },
        { id: 39, english: 'why', uzbek: 'nega', example: 'Why are you late?', exampleUz: 'Nega kechikding?', learned: false },
        { id: 40, english: 'low', uzbek: 'past', example: 'The wall is low.', exampleUz: 'Devor past.', learned: false },
        { id: 41, english: 'well', uzbek: 'yaxshi', example: 'I am well, thank you.', exampleUz: 'Men yaxshiman, rahmat.', learned: false },
        { id: 42, english: 'make sure', uzbek: 'ishonch hosil qilmoq', example: 'Make sure you close the door.', exampleUz: 'Eshikni yopganingga ishonch hosil qil.', learned: false },
        { id: 43, english: 'general', uzbek: 'umumiy', example: 'This is a general rule.', exampleUz: 'Bu umumiy qoida.', learned: false },
        { id: 44, english: 'live', uzbek: 'yashamoq / jonli', example: 'I live in Samarkand.', exampleUz: 'Men Samarqandda yashayman.', learned: false }
    ])



    const [filter, setFilter] = useState('all')
    const { id } = useParams()

    // Inputlar uchun state
    const [newWord, setNewWord] = useState({
        english: '',
        uzbek: '',
        example: '',
        exampleUz: ''
    })

    // O‘qib berish funksiyasi
    const speak = (text) => {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = 'en-US'
        window.speechSynthesis.speak(utterance)
    }

    // Statistikalar
    const total = words.length
    const learnedCount = words.filter(w => w.learned).length
    const notLearnedCount = total - learnedCount

    // Filtrlash
    const filteredWords = words.filter((w) => {
        if (filter === 'learned') return w.learned
        if (filter === 'notLearned') return !w.learned
        return true
    })

    // Yangi so‘z qo‘shish
    const addWord = (e) => {
        e.preventDefault()
        if (!newWord.english || !newWord.uzbek) return

        const newEntry = {
            id: words.length + 1,
            ...newWord,
            learned: false
        }
        setWords([...words, newEntry])

        // Inputlarni tozalash
        setNewWord({ english: '', uzbek: '', example: '', exampleUz: '' })
    }

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

                {/* Word qo‘shish formasi */}
                <div className="mb-8 p-6 bg-white rounded-xl shadow">
                    <h2 className="text-xl font-semibold mb-4">➕ Add New Word</h2>
                    <form onSubmit={addWord} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="English word"
                            value={newWord.english}
                            onChange={(e) => setNewWord({ ...newWord, english: e.target.value })}
                            className="px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                        />
                        <input
                            type="text"
                            placeholder="Uzbek translation"
                            value={newWord.uzbek}
                            onChange={(e) => setNewWord({ ...newWord, uzbek: e.target.value })}
                            className="px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                        />
                        <input
                            type="text"
                            placeholder="Example sentence (EN)"
                            value={newWord.example}
                            onChange={(e) => setNewWord({ ...newWord, example: e.target.value })}
                            className="px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 col-span-2"
                        />
                        <input
                            type="text"
                            placeholder="Example translation (UZ)"
                            value={newWord.exampleUz}
                            onChange={(e) => setNewWord({ ...newWord, exampleUz: e.target.value })}
                            className="px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 col-span-2"
                        />
                        <button
                            type="submit"
                            className="col-span-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Add Word
                        </button>
                    </form>
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
                                    <div className="flex items-center justify-between">
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
                    <Link
                        href={`/dashboard/lesson/${id}/practice`}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Start Practice
                    </Link>
                    <Link
                        href={`/dashboard/lesson/${id}/practice/notlearned`}
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
