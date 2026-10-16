import { useId } from "react";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";

export const inputClass =
  "min-h-[52px] w-full rounded-[6px] border-2 border-line bg-white px-4 text-[17px] outline-none focus:border-charcoal aria-[invalid=true]:border-error";

interface FieldProps {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: (props: { id: string; name: string; "aria-invalid"?: boolean; "aria-describedby"?: string; required?: boolean }) => React.ReactNode;
}

/** Label + control + error message, wired together for screen readers. */
export function Field({ label, name, required, error, hint, className, children }: FieldProps) {
  const id = useId();
  const msgId = `${id}-msg`;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block font-display text-[15px] font-bold">
        {label}
        {required && <span aria-hidden> *</span>}
      </label>
      {children({
        id,
        name,
        required,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error || hint ? msgId : undefined,
      })}
      {(error || hint) && (
        <p id={msgId} className={clsx("mt-1.5 text-[14.5px]", error ? "font-bold text-error" : "text-muted")}>
          {error ?? hint}
        </p>
      )}
    </div>
  );
}

export function SelectBox({
  options,
  defaultValue,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { options: [string, string][] }) {
  return (
    <div className="relative">
      <select {...props} defaultValue={defaultValue} className={clsx(inputClass, "appearance-none pr-10")}>
        {options.map(([value, text]) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
      <ChevronDown size={18} aria-hidden className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" />
    </div>
  );
}

/** Read a <form> into a plain string record. */
export const formToRecord = (form: HTMLFormElement) =>
  Object.fromEntries(Array.from(new FormData(form).entries()).map(([k, v]) => [k, String(v)]));

/** Visible note that a form isn't connected to a back end yet. */
export function DemoNote() {
  return <p className="mt-2 text-[13.5px] text-muted">(Demo: messages aren’t sent until the back end is connected.)</p>;
}
