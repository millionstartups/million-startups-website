import Image from 'next/image'
import {CircleImage, Flex} from '../layout/pageStyles'
export default function Avatar({ name, picture }) {
  return (
    <Flex>
      <CircleImage>
      <Image src={picture} alt={name} width={50} height={50} layout='fixed' />
      </CircleImage>
      <div className="text-xl font-bold">{name}</div>
    </Flex  >
  )
}
