// src/components/atoms/Input.jsx
import { useId, useState } from "react";

function mapToMaterialIcon(name) {
  if (!name) return null;
  const dict = {
    user: "person",
    lock: "lock",
    search: "search",
    eye: "visibility",
    eyeOff: "visibility_off",
    mail: "mail",
    phone: "phone",
  };
  return dict[name] || name;
}

export default function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  leftIcon,          // ex: "user" | "search" | "lock"
  rightIcon,         // ex: "search"
  error,
  helper,
  rounded = "full",  // "full" | "xl" | "md"
  className = "",
  ...props
}) {
  const id = useId();
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const effectiveType = isPassword && show ? "text" : type;

  const roundCls =
    rounded === "xl" ? "rounded-xl" :
    rounded === "md" ? "rounded-md" : "rounded-full";

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-white text-sm sm:text-base mb-2">
          {label}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <i className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-white/60 text-base">
            {mapToMaterialIcon(leftIcon)}
          </i>
        )}

        <input
          id={id}
          name={name}
          type={effectiveType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full bg-transparent border border-white text-white placeholder-white/50
            px-4 py-2 ${leftIcon ? "pl-9" : ""} ${isPassword || rightIcon ? "pr-10" : ""}
            ${roundCls} focus:outline-none ${error ? "border-red-400" : ""}
            ${className}`}
          {...props}
        />

        {/* Right adornment / password toggle */}
        {isPassword ? (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 focus:outline-none"
            aria-label={show ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
          >
            <i className="material-icons text-base">
              {mapToMaterialIcon(show ? "eyeOff" : "eye")}
            </i>
          </button>
        ) : rightIcon ? (
          <i className="material-icons absolute right-3 top-1/2 -translate-y-1/2 text-white/60 text-base">
            {mapToMaterialIcon(rightIcon)}
          </i>
        ) : null}
      </div>

      {error ? (
        <p className="mt-1 text-xs text-red-400">{error}</p>
      ) : helper ? (
        <p className="mt-1 text-xs text-white/60">{helper}</p>
      ) : null}
    </div>
  );
}
