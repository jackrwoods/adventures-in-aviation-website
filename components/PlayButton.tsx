interface PlayButtonProps {
  className?: string;
}

export default function PlayButton({ className = "" }: PlayButtonProps) {
  return (
    <span
      aria-hidden="true"
      className={`
        inline-flex items-center justify-center
        w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16
        rounded-full bg-white/90 shadow-md
        backdrop-blur-sm
        transition-all duration-normal ease-spring
        group-hover:scale-110 group-hover:bg-white
        group-hover:shadow-lg
        ${className}
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-navy-800 transition-transform duration-fast ease-spring group-hover:scale-105"
        aria-hidden="true"
      >
        <path d="M8 5.14v14.72a1 1 0 001.5.86l11-7.36a1 1 0 000-1.72l-11-7.36a1 1 0 00-1.5.86z" />
      </svg>
    </span>
  );
}
