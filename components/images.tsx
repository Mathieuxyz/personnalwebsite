import Image from 'next/image'

export default function zelensky() {
  return (
    <Image
      src="/zelensky.jpg"
      width={500}
      height={500}
      alt="zelensky"
    />
  )
}