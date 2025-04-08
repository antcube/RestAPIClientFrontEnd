import { PropsWithChildren } from "react";

export default function ErrorMessage({children}: PropsWithChildren) {
  return (
    <p className="text-red-700 text-sm font-bold mt-2">
        {children}
    </p>
  )
}