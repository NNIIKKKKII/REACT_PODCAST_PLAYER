import React from "react";

const Episode = ({ title, pubDate, link, mp3 }) => {
  return (
    <li className="rounded-2xl overflow-hidden bg-stone-900/80 backdrop-blur-sm border border-amber-500/20 shadow-xl hover:border-amber-500/40 transition-colors">
      <div className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5 sm:gap-6">
        <div className="flex-1 min-w-0">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <p className="text-stone-100 font-semibold text-lg leading-snug group-hover:text-amber-400 transition-colors line-clamp-2">
              {title}
            </p>
          </a>
          <p className="text-amber-500/90 text-sm mt-2 font-medium">{pubDate}</p>
          <audio
            className="mt-4 w-full h-10 accent-amber-500"
            src={mp3}
            controls
          />
        </div>
        <div className="sm:w-56 flex-shrink-0 flex flex-col">
          <label className="text-stone-400 text-sm font-medium mb-2">
            Notes
          </label>
          <textarea
            placeholder="What do you think of this episode?"
            className="w-full min-h-[80px] rounded-xl bg-stone-800/80 border border-stone-600 text-stone-200 placeholder-stone-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 resize-y"
            name="notes"
            id={`notes-${link}`}
          />
        </div>
      </div>
    </li>
  );
};

export default Episode;
