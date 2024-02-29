import { createContext, useState } from "react";


export const counterContext = createContext(0)

export function CounterContextProvider({children})
{
   let [counter,setCounter] = useState(10)


    return <counterContext.Provider value={{counter,setCounter}}>
        {children}
    </counterContext.Provider>
}