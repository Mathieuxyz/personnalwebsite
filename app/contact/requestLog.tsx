'use server'

import { headers } from "next/headers";
import { redirect } from "next/navigation";

let requests: { mail: string; subject: string; message: string }[] = [];

export async function getRequest() {
    return requests;
}

export async function addRequest(form: FormData) {

    const mail = form.get('mail')?.toString() ?? '';
    const subject = form.get('subject')?.toString() ?? '';
    const message = form.get('message')?.toString() ?? '';

    requests.push({
        mail,
        subject,
        message,
    });

    redirect('/confirmation');
}