import Link from "next/link";
import { Head } from "../components/Head";

export default function Custom404() {
  return (
    <>
      <Head title="404 Page Not Found - Anonymize JavaScript">
        <meta name="robots" content="noindex,follow" />
      </Head>
      <div className="flex flex-col h-screen sm:px-8 px-4">
        <div className="flex flex-col flex-1 justify-center mx-auto">
          <h1 className="sm:text-5xl md:text-6xl text-3xl font-extrabold tracking-tighter">
            Page not found
          </h1>
          <Link href="/">
            <a className="sm:text-xl sm:mt-8 mt-4">Back to anonymizing code</a>
          </Link>
        </div>
      </div>
    </>
  );
}
