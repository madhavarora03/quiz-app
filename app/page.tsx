import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import appDemo from "@/public/app-demo.png";

export default function Home() {
  return (
    <main className="overflow-scroll p-2 lg:p-5 bg-gradient-to-bl from-secondary to-indigo-600 flex-1">
      <div className="bg-secondary py-24 sm:py-32 rounded-md drop-shadow-xl">
        <div className="flex flex-col justify-center items-center mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-500">
              Your Interactive Document Companion
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-secondary-foreground sm:text-6xl">
              Transform Your PDFs into Interactive Conversations
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
              Introducing{" "}
              <span className="font-bold text-indigo-600 dark:text-indigo-500">
                Chat with PDF.
              </span>
              <br />
              <br />
              Upload your document, and out chatbot will answer questions,
              summarize content, and answer all your Qs. Ideal for everyone,{" "}
              <span className="text-indigo-600 dark:text-indigo-500">
                Chat with PDF
              </span>{" "}
              turns static documents into{" "}
              <span className="font-bold">dynamic conversations</span> enhancing
              productivity 10x effortlessly.
            </p>
          </div>
          <Button asChild className="mt-10">
            <Link href="/dashboard">Get Started</Link>
          </Button>
          <ModeToggle />
        </div>

        <div className="relative overflow-hidden pt-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Image
              alt="App screenshot"
              src={appDemo}
              width={2432}
              height={1442}
              className="mb-[-0%] rounded-xl shadow-2xl ring-1 ring-gray-900/10"
            />
            <div aria-hidden="true" className="relative">
              <div className="absolute bottom-0 -inset-x-32 bg-gradient-to-t from-secondary/95 pt-[5%]" />
            </div>
          </div>
        </div>
        {/* <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-16 sm:mt-20 md:mt-24">
          <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
            {features.map((feature, index) => (
              <div className="relative pl-9" key={index}>
                <dt className="inline font-semibold text-gray-900">
                  <feature.icon
                    aria-hidden="true"
                    className="absolute left-1 top-1 h-5 w-5 text-indigo-600"
                  />
                </dt>
                <dd>{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div> */}
      </div>
    </main>
  );
}
