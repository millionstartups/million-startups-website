import {Fragment} from 'react'
import Image from 'next/image'
import {CircleImage} from '../layout/pageStyles'
export default function Avatar({ name, picture }) {
  return (
    <div>
      <CircleImage>
      <Image src={picture} alt={name} width={50} height={50} layout='fixed' />
      </CircleImage>
      <div className="text-xl font-bold">By {name}</div>
    </div>
  )
}
