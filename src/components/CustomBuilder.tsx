import { useState } from "react";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

const SERVICES = [
  "Umrah Visa",
  "Air Tickets",
  "Makkah Hotel",
  "Madinah Hotel",
  "Shared Transport",
  "Private Transport",
  "VIP Transport",
  "Family Package",
  "Group Package",
  "Guided Support",
];

const TIERS = [
  { label: "3 Star", note: "Essential comfort" },
  { label: "4 Star", note: "Refined stay" },
  { label: "5 Star", note: "Premium luxury" },
  { label: "Luxury VIP", note: "Haram-view suites" },
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

interface Props {
  onSubmit: () => void;
}

export function CustomBuilder({ onSubmit }: Props) {
  const [step, setStep] = useState(0);
  const [services, setServices] = useState<string[]>(["Umrah Visa", "Makkah Hotel"]);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [month, setMonth] = useState("March");
  const [duration, setDuration] = useState("10 nights");
  const [tier, setTier] = useState("5 Star");

  const toggleService = (s: string) =>
    setServices((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  return (
    <div className="bg-emerald-deep text-sand border border-gold/20 shadow-elegant">
      <div className="grid grid-cols-4 border-b border-gold/15">
        {["Services", "Travel", "Hotel", "Summary"].map((label, i) => (
          <div
            key={label}
            className={`p-4 text-center border-r border-gold/10 last:border-r-0 transition-colors ${
              i === step ? "bg-gold/10" : ""
            }`}
          >
            <div
              className={`text-[10px] uppercase tracking-[0.25em] ${
                i <= step ? "text-gold" : "text-sand/40"
              }`}
            >
              0{i + 1}
            </div>
            <div
              className={`text-xs mt-1 font-medium ${
                i === step ? "text-sand" : "text-sand/60"
              }`}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 md:p-10 min-h-[420px]">
        {step === 0 && (
          <div className="space-y-6 animate-fade-up">
            <h3 className="font-display text-3xl italic">Select your sacred services</h3>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
              {SERVICES.map((s) => {
                const active = services.includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleService(s)}
                    className={`group flex items-center justify-between gap-3 p-4 border text-left transition-all ${
                      active
                        ? "border-gold bg-gold/10 text-sand"
                        : "border-sand/15 text-sand/80 hover:border-gold/50"
                    }`}
                  >
                    <span className="text-sm">{s}</span>
                    <span
                      className={`size-4 border flex items-center justify-center transition-colors ${
                        active ? "border-gold bg-gold text-emerald-deep" : "border-sand/30"
                      }`}
                    >
                      {active && <Check className="size-3" strokeWidth={3} />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6 animate-fade-up">
            <h3 className="font-display text-3xl italic">Travel details</h3>
            <div className="grid grid-cols-2 gap-5">
              <Counter label="Adults" value={adults} onChange={setAdults} min={1} />
              <Counter label="Children" value={children} onChange={setChildren} min={0} />
              <Selector
                label="Travel Month"
                value={month}
                onChange={setMonth}
                options={MONTHS}
              />
              <Selector
                label="Duration"
                value={duration}
                onChange={setDuration}
                options={["7 nights", "10 nights", "14 nights", "21 nights", "Custom"]}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-up">
            <h3 className="font-display text-3xl italic">Accommodation tier</h3>
            <div className="grid grid-cols-2 gap-4">
              {TIERS.map((t) => {
                const active = tier === t.label;
                return (
                  <button
                    key={t.label}
                    type="button"
                    onClick={() => setTier(t.label)}
                    className={`p-6 border text-left transition-all ${
                      active
                        ? "border-gold bg-gold/10"
                        : "border-sand/15 hover:border-gold/40"
                    }`}
                  >
                    <div className="font-display text-2xl">{t.label}</div>
                    <div className="text-xs text-sand/60 mt-1">{t.note}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-up">
            <h3 className="font-display text-3xl italic">Your bespoke itinerary</h3>
            <dl className="divide-y divide-sand/10 border-y border-sand/10">
              <Row label="Services" value={services.join(" · ") || "—"} />
              <Row label="Travelers" value={`${adults} adults · ${children} children`} />
              <Row label="Travel Month" value={month} />
              <Row label="Duration" value={duration} />
              <Row label="Hotel Category" value={tier} />
            </dl>
            <p className="text-xs text-sand/60 leading-relaxed">
              Final pricing depends on travel season, flight & hotel availability and is confirmed
              by our specialist within 24 hours.
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between p-6 border-t border-gold/15 gap-4">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-sand/70 hover:text-gold disabled:opacity-30 transition-colors"
        >
          <ArrowLeft className="size-4" /> Back
        </button>
        {step < 3 ? (
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(3, s + 1))}
            className="flex items-center gap-3 bg-gold text-emerald-deep px-6 py-3 text-xs uppercase tracking-[0.25em] font-semibold hover:bg-gold-soft transition-colors"
          >
            Continue <ArrowRight className="size-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onSubmit}
            className="flex items-center gap-3 bg-gold text-emerald-deep px-6 py-3 text-xs uppercase tracking-[0.25em] font-semibold hover:bg-gold-soft transition-colors"
          >
            Request My Custom Package <ArrowRight className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function Counter({
  label,
  value,
  onChange,
  min = 0,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-[10px] uppercase tracking-[0.25em] text-gold font-semibold">
        {label}
      </label>
      <div className="flex items-center border border-sand/15">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="px-4 py-3 text-sand/70 hover:text-gold"
        >
          −
        </button>
        <div className="flex-1 text-center font-display text-2xl">{value}</div>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="px-4 py-3 text-sand/70 hover:text-gold"
        >
          +
        </button>
      </div>
    </div>
  );
}

function Selector({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="space-y-2">
      <label className="block text-[10px] uppercase tracking-[0.25em] text-gold font-semibold">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border border-sand/15 px-3 py-3 text-sm text-sand focus:border-gold outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-emerald-deep">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-4">
      <dt className="text-[10px] uppercase tracking-[0.25em] text-gold">{label}</dt>
      <dd className="text-sm text-sand text-right">{value}</dd>
    </div>
  );
}
