type BoxProps = {
    title: string,
    dates: string,
    description: string,
};

export default function Box({ title, dates, description }: BoxProps) {
    return (
        <div className="border-l-4 border-blue-500 bg-slate-900/60 px-5 py-4 mb-6 rounded-3xl shadow-lg">
            <h3 className="text-xl font-semibold text-slate-100">{title}</h3>
            <span className="text-sm text-slate-400">{dates}</span>
            <p className="mt-2 text-slate-200">{description}</p>
        </div>
    );
}
