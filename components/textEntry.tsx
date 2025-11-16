import { ReactNode } from "react";

type BoxProps = {

    text: string,
};

export default function Text({text}: BoxProps) {
    return (
        <div className="border-l-4 border-slate-800 pl-4 mb-6 rounded-s-2xl rounded-e-2xl">
            <p className="mt-2 text-slate-700">{text}</p>
        </div>
    );
}