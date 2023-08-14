'use client'

import { useSession } from "next-auth/react"
import { useState,useEffect } from "react"

export default function User(){
    const {data:session} =useSession()
    return(
        <>
            <h2>Hey {session?.user?.name}</h2>
        </>
    )
}