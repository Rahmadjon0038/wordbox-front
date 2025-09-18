'use client'
import { useGetNotify } from '@/hooks/notify'
import React from 'react'

function Home() {
    const notify = useGetNotify()
    const clickme = () => notify('ok', 'salomat')
    return (
        <div onClick={clickme}>Home</div>
    )
}

export default Home