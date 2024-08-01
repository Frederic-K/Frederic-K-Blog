import ImagesFrieze from "./ImagesFrieze"
import Typewriter from "../../features/Typewriter/Typewriter"
import LogoFKRed from "/images/logo/LogoFK-waterpx-red3-100px.png"

const SignHeroTitle = () => {
  return (
    <div className="relative mx-auto h-48 w-full max-w-[350px]">
      <div className="animate-fadeIn animation-delay-1500 absolute inset-0 opacity-0">
        <img
          // src={theme === "light" ? LogoFKBlack : LogoFKRed}
          src={LogoFKRed}
          alt="Background Logo"
          className="size-full object-contain opacity-30"
        />
      </div>
      <div className="absolute left-1/2 z-10 w-full -translate-x-1/2 text-center">
        <h1 className="mt-2 text-4xl font-bold text-orange-950 dark:text-orange-200">
          <Typewriter text="Frederic-K Blog" delay={100} />
        </h1>
      </div>
      <p className="animate-fadeIn animation-delay-1500 absolute left-1/2 top-14 z-10 w-full -translate-x-1/2 text-center text-sm font-bold opacity-0 sm:top-16">
        This is a MERN-Stack demo project. You can sign in with your email and
        password or with Google.
      </p>
      <div className="absolute bottom-4 left-1/2 z-10 w-full -translate-x-1/2">
        <ImagesFrieze />
      </div>
    </div>
  )
}

export default SignHeroTitle
