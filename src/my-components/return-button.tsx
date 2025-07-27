import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "lucide-react"

interface ReturnButtonProps {
    href: string;
    label: string
}

export const ReturnButton = (
    { href, label }: ReturnButtonProps
) => {
    return (
        <>
            <Button size="sm" asChild variant="ghost">
                <Link href={href}>
                    <ArrowLeftIcon /> <span className="whitespace-nowrap">{label}</span>
                </Link>
            </Button>
        </>
    )
}