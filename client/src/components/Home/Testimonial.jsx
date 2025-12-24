import React from 'react'
import Title from './Title'
import { BookUserIcon } from 'lucide-react'

const Testimonial = () => {
  const cardsData = [
        {
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
            name: 'Briar Martin',
            handle: '@neilstellar',
        },
        {
            image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
            name: 'Avery Johnson',
            handle: '@averywrites',
        },
        {
            image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60',
            name: 'Jordan Lee',
            handle: '@jordantalks',
        },
        {
            image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60',
            name: 'Avery Johnson',
            handle: '@averywrites',
        },
    ];
  return (
    <div id='testimonials' className="flex flex-col items-center my-10 scroll-mt-12">
    <div className="flex items-center gap-2 text-sm text-indigo-600 bg-indigo-400/10 rounded-full px-6 py-1.5">
            <BookUserIcon className="size-4.5 stroke-indigo-600"/>
            <span>Testimonials</span>
    </div>    
    <Title title="Don't just take our words" description="Hear what our users say about us. We're always looking for ways to improve. If you have a positive experience with us, leave a review." />
    </div>
  )
}

export default Testimonial
