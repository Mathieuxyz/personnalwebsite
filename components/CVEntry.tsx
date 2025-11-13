import { ReactNode } from "react";

type BoxProps = {
    title: string,
    dates: Int16Array,
    description: string,
};

export default function Box({ title, dates, description }: BoxProps) {
    return (
        <div className="border-l-4 border-slate-800 pl-4 mb-6">
            <h3 className="text-xl font-semibold">{title}</h3>
            <span className="text-sm text-slate-500">{dates}</span>
            <p className="mt-2 text-slate-700">{description}</p>
        </div>
    );
}