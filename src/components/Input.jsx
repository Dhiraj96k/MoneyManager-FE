import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Input = ({ label, value, onChange, placeHolder, type, isSelect, option }) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassward = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="mb-4">
            <label className="text-[13px] text-slate-800 block mb-1">
                {label}
            </label>

            <div className="relative">
                {isSelect ? (
                    <select
                        className="w-full bg-transparent outline-none border-black rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                        value={value}
                        onChange={(e) => onChange(e)}
                    >

                        {/* 🟢 FIX 1 → Add placeholder */}
                        <option value="">-- Select --</option>

                        {/* 🟢 FIX 2 → Ensure correct key + convert value to string */}
                        {option.map((opt) => (
                            <option key={opt.value} value={String(opt.value)}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                        placeHolder={placeHolder}
                        value={value}
                        onChange={onChange}
                    />
                )}

                {type === 'password' && (
                    <span
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={toggleShowPassward}
                    >
                        {showPassword ? (
                            <Eye size={20} className="text-purple-800" />
                        ) : (
                            <EyeOff size={20} className="text-slate-400" />
                        )}
                    </span>
                )}
            </div>
        </div>
    );
}

export default Input;
