import { ReactNode } from "react";
import Box from "@/components/CVEntry";
import Text from "@/components/textEntry"
import GithubButton from "@/components/button";


export default function CV() {
    return (
    <div className="max-w-25xl mx-auto">
        <div className="flex flex-col my-8">
            <Text 
            h1="Curriculum Vitae" 
            h2="Aviation passionate, computer science and electronics enthusiast"
            />

            <Text 
            h1="Education" 
            h2="Mostly engineering, computer science and electronics"
            />

            <Box 
                title="ECAM/RMA" 
                dates="2023 - 2026" 
                description="Bachelor in industrial engineering, major in computer science and electronics"
            />

            <Box 
                title="TUDelft" 
                dates="2022 - 2023" 
                description="Engineering preparation year - Faculty of mechanical engineering - 60ECTS"
            />

            <Box 
                title="Collège Saint-Michel" 
                dates="2015 - 2021" 
                description="High school diploma - Science and mathematics major"
            />

            <Text 
            h1="Flight training" 
            h2="+ 40 hours of total flight time + Flew on DG400, Twin II, Twin III, Tecnam P2008 JC, Tomahowk, Cessna 152 + Class 1 Medical certificate valid until 02/10/2026 + Passionate since the age of 7"
            />

            <Box 
                title="Sabena Aeroclub" 
                dates="2025 - Now"
                description="PPL on P208 JC"
            />

            <Box 
                title="RBAC" 
                dates="2021 - 2024"
                description="SPL on Twin II, Twin III and DG400"
            />

            <Text 
            h1="Languages" 
            />
            <Box 
                title="French" 
                dates="Native"
            />
            <Box 
                title="Dutch" 
                dates="C1 level, fluent"
            />
            <Box 
                title="English" 
                dates="C1 level, fluent"
            />
            <Box 
                title="Portuguese" 
                dates="B1 level, fluent"
            />
            <Box 
                title="German" 
                dates="A2 level, basic knowledge"
                description="Taking weekly lessons now"
            />

            <Text 
            h1="Usefull links" 
            />

            <GithubButton />
        </div>

    </div>
    );
}