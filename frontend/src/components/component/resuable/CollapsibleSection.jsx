import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from "lucide-react"
export default function CollapsibleSection({ children, title, defaultShow = false }) {
    const [show, setShow] = useState(defaultShow);

    return <>
        <div className="flex justify-between items-center">
            <h1 className="font-bold">{title}</h1>
            {
                show ?
                    <ChevronUp className='cursor-pointer' onClick={() => setShow(prev => !prev)} />
                    :
                    <ChevronDown className='cursor-pointer' onClick={() => setShow(prev => !prev)} />
            }
        </div>
        {show && children}
    </>
}
