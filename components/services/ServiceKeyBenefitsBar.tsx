import {
  ShieldCheck,
  Layers,
  Users,
  HardHat,
  Calendar,
  Sparkles,
} from "lucide-react";

/**
 * Key Benefits Ribbon
 * Matches Section 3 of mockup:
 * Dark emerald ribbon with vertical gold accent, "Key Benefits" heading,
 * and 6 horizontal benefit items with icons.
 */
export function ServiceKeyBenefitsBar() {
  const benefits = [
    { title: "Quality Construction", icon: ShieldCheck },
    { title: "Premium Materials", icon: Layers },
    { title: "Experienced Team", icon: Users },
    { title: "Safety & Compliance", icon: HardHat },
    { title: "On-Time Completion", icon: Calendar },
    { title: "Long-Lasting & Durable", icon: Sparkles },
  ];

  return (
    <section aria-label="Key Benefits" className="bg-[#fbfdf9] py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl sm:rounded-3xl bg-[#092217] text-white p-5 sm:p-6 lg:p-7 shadow-xl border border-[#143d2b]/60 flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
          {/* Left Title: Vertical Gold Bar + "Key Benefits" */}
          <div className="flex items-center gap-3.5 shrink-0 border-b lg:border-b-0 lg:border-r border-[#1a4430] pb-4 lg:pb-0 lg:pr-8 w-full lg:w-auto">
            <span className="w-1.5 h-10 sm:h-12 bg-[#d4972a] rounded-full inline-block" />
            <div className="flex flex-col leading-tight">
              <span className="text-base sm:text-lg font-bold text-gray-200">Key</span>
              <span className="text-xl sm:text-2xl font-extrabold text-white">Benefits</span>
            </div>
          </div>

          {/* Right 6 Benefit Items */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6 w-full items-center">
            {benefits.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex flex-col items-center text-center gap-2 group cursor-default"
                >
                  <span className="flex size-11 items-center justify-center rounded-xl bg-[#143d2b]/80 border border-[#21573e] text-[#d4972a] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#1b4b35]">
                    <Icon className="size-5.5 text-[#e5b357]" />
                  </span>
                  <span className="text-xs sm:text-[0.82rem] font-medium text-gray-200 leading-snug max-w-[110px]">
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

