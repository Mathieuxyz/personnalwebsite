import Text from "@/components/textEntry";

export default function Confirmation() {
  return (
    <div className="flex items-center justify-center md:flex-row flex-col">
      <Text h1="Thank you for contacting me !" h2={[]} h3={""} />
      <Text h1 ={""} h2={["I will come back to you ASAP"]} h3={""}/>
    </div>
  );
}
