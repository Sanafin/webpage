"use client"

import { useActionState } from "react"
import { login, type LoginState } from "./actions"

export function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(login, {})
  return (
    <form action={formAction} className="mt-6 space-y-4">
      <div>
        <label htmlFor="passcode" className="block text-[13px] font-medium text-[#1f1a17]">
          Passcode
        </label>
        <input
          id="passcode"
          name="passcode"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          aria-invalid={state.error ? true : undefined}
          aria-describedby={state.error ? "passcode-error" : undefined}
          className="form-field mt-1.5 block w-full rounded-xl border border-[#e6dfd8] bg-white px-4 py-3 text-[15px] text-[#1f1a17] outline-none focus:border-[#1f1a17]"
        />
        {state.error && (
          <p id="passcode-error" role="alert" className="mt-2 text-[13px] text-[#c4460f]">
            {state.error}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#f15d22] px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#d94f18] disabled:opacity-60"
      >
        {pending ? "Opening…" : "Open preview"}
      </button>
    </form>
  )
}
