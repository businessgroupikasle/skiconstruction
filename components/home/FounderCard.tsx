import Image from "next/image";
import { UserRound } from "lucide-react";
import { founder } from "@/lib/brand";

/** Founder introduction card. Credentials are shown exactly as supplied by the company. */
export function FounderCard({ imageSrc = "/images/about/about2.png" }: { imageSrc?: string }) {
  return (
    <article className="relative isolate overflow-hidden rounded-3xl bg-brand-dark shadow-card">
      <div className="relative aspect-[4/4.4]">
        <Image
          src={imageSrc}
          alt="Er. D. Satheeshkumar, DCE., BE. - SKI Construction"
          fill
          sizes="(min-width: 1024px) 26vw, (min-width: 640px) 60vw, 92vw"
          className="object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/25 to-transparent" />
      </div>
      <div className="absolute inset-x-4 bottom-4 flex items-center gap-4 rounded-2xl bg-white/95 p-4 shadow-soft backdrop-blur">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-primary text-white">
          <UserRound aria-hidden="true" className="size-6" />
        </span>
        <div className="min-w-0">
          <p className="text-base leading-tight font-extrabold text-brand-dark">{founder.name}</p>
          <p className="text-sm font-semibold text-brand-primary">
            {founder.credentials}
          </p>
          <p className="text-xs text-brand-muted">{founder.role}</p>
        </div>
      </div>
    </article>
  );
}