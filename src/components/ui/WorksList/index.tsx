import React from 'react'
import type { Work } from '@/types'

interface Props {
  works: Array<Work>
}

const WorkList: React.FC<Props> = ({ works }) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 w-full max-w-5xl">
      {works.map((work) => (
        <li key={work.videoId} className="w-full aspect-video">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${work.videoId}?rel=0`}
            title={work.title}
            className="aspect-video w-full min-w-80 md:min-w-96 lg:min-w-md rounded-xl border-0 bg-[#050610] shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
            allowFullScreen
            loading="lazy"
          />
        </li>
      ))}
    </ul>
  )
}

export default WorkList
