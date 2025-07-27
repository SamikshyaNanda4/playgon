// components/LoadingButton.tsx
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes } from "react";
import { Button } from "@/components/ui/button";

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    variant?: "default" | "link" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
    size?: "default" | "sm" | "lg" | "icon" | null | undefined
}

export const ButtonWithLoader = ({
    isLoading,
    variant,
    size,
    children,
    className = "",
    ...props
}: LoadingButtonProps) => {
    return (
        <Button
            className={`relative flex items-center justify-center ${className} cursor-pointer`}
            disabled={isLoading}
            variant={variant ?? "default"}
            size={size ?? "default"}
            {...props}
        >
            {isLoading && (
                <Loader2 className="absolute h-5 w-5 animate-spin" />
            )}
            <span className={isLoading ? "opacity-0" : "opacity-100"}>
                {children}
            </span>
        </Button>
    );
};