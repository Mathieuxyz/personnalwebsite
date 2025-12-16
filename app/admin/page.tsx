'use server'

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

const DATA_PATH = path.join(process.cwd(), "data.json");
const PUBLIC_DIR = path.join(process.cwd(), "public");

async function readCvData() {
  try {
    return await fs.readFile(DATA_PATH, "utf-8");
  } catch (error) {
    return JSON.stringify({ curriculum_vitae: { sections: [] } }, null, 2);
  }
}

async function saveCvData(formData: FormData) {
  "use server";
  const payload = formData.get("payload")?.toString() ?? "";

  try {
    JSON.parse(payload);
  } catch {
    throw new Error("Invalid JSON. Please fix the syntax before saving.");
  }

  await fs.writeFile(DATA_PATH, payload, "utf-8");
  revalidatePath("/cv");
}

async function saveImage(formData: FormData) {
  "use server";
  const file = formData.get("image");
  if (!file || !(file instanceof File) || file.size === 0) {
    throw new Error("Please select an image before uploading.");
  }

  const parsed = path.parse(file.name);
  const safeBase =
    parsed.name.replace(/[^a-zA-Z0-9_-]/g, "-").replace(/-+/g, "-").toLowerCase() ||
    `upload-${Date.now()}`;
  const safeExt =
    parsed.ext && parsed.ext.length > 0
      ? parsed.ext
      : `.${file.type?.split("/").pop() ?? "png"}`;
  const relativeName = `${safeBase}${safeExt}`;
  const bytes = await file.arrayBuffer();
  await fs.writeFile(path.join(PUBLIC_DIR, relativeName), Buffer.from(bytes));
  revalidatePath("/");
}

export default async function Admin() {
  const rawJson = await readCvData();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-slate-100 space-y-8">
      <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-slate-50">CV and Blog Console</h1>
          <p className="text-slate-300 mt-2">
            Use this terminal-like editor to add or remove entries. The content below maps directly to data.json. Modify the JSON and save to update the CV page instantly.
          </p>
        </div>

        <form action={saveCvData} className="space-y-4">
          <textarea
            name="payload"
            defaultValue={rawJson}
            className="w-full min-h-[24rem] font-mono text-sm bg-slate-950 text-green-300 rounded-2xl p-4 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <p className="text-slate-300 mt-2">
            Ensure to use the correct syntax, otherwise the system crashes!
          </p>
          <button
            type="submit"
            className="py-3 px-5 text-sm font-medium text-center text-white rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-indigo-600 hover:to-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Save JSON
          </button>
        </form>
      </div>

      <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-slate-50">Public Image Console</h2>
        </div>

        <form action={saveImage} className="space-y-4" encType="multipart/form-data">
          <div className="space-y-2">
            <label htmlFor="image" className="text-sm font-medium text-slate-200">
              Select image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="py-3 px-5 text-sm font-medium text-center text-white rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-indigo-600 hover:to-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Upload image
          </button>
        </form>
      </div>
    </div>
  );
}
