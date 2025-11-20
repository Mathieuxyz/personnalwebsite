import { ReactNode } from "react";

type BoxProps = {

    h1?: string;
    h2?: string | string[];
    h3?: string;
};

export default function Text({h1, h2, h3}: BoxProps) {
    return (
        <div className="dark:bg-gray-800/50 pl-4 mb-6 rounded-s-2xl rounded-e-2xl">
            <h1 className="text-xl font-bold mt-2 text-amber-50">{h1}</h1>
            <h2 className="font-bold mt-2 text-amber-50">{h2}</h2>
            <h3 className="mt-2 text-amber-50">{h3}</h3>
        </div>
    );
}