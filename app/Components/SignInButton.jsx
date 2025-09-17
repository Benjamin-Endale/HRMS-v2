"use client"
import { login } from '../lib/actions/auth'
export const SignInButton = () => {
    return(
        <div className="bg-lemongreen w-full h-[3.4375rem] flex items-center justify-center rounded-[0.3125rem] ">
            <button onClick={()=>login()} className=" w-full h-[3.4375rem] rounded-[0.3125rem] border-3 outline-2 border-t-[hidden]   hover:outline-lemongreen cursor-pointer">Sign in with Google</button>
        </div>
    )
}  