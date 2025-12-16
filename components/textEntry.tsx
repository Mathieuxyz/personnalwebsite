import { ReactNode } from "react";

type BoxProps = {

    h1?: string;
    h2?: string | string[];
    h3?: string;
};

export default function Text({h1, h2, h3}: BoxProps) {
    return (
        <div className="bg-slate-900/70 border border-slate-800 px-6 py-4 mb-6 rounded-3xl shadow-lg">
            <h1 className="text-2xl font-semibold text-slate-100">{h1}</h1>
            <h2 className="mt-2 text-slate-300">{h2}</h2>
            <h3 className="mt-2 text-slate-400">{h3}</h3>
        </div>
    );
}
