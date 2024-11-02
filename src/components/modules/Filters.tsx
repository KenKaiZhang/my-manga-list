import { useMemo } from "react"
import { Badge } from "../ui/badge"

interface FiltersProps {
    selected: string[],
    options: string[],
    onClick: (value: string) => void
}

const Filters: React.FC<FiltersProps> = ({
    selected,
    options,
    onClick
}) => {

    const availableOptions = useMemo(() => (
        options
            .filter((opt) => !selected.includes(opt))
            .sort((a, b) => a.localeCompare(b))
    ), [options, selected])

    return (
        <div className="pb-2 flex gap-2 flex-wrap">
            {availableOptions.map((opt) => (
                <Badge 
                    key={opt}
                    className="cursor-pointer"
                    onClick={() => onClick(opt)}
                >
                        {opt}
                </Badge>
            ))}
        </div>
    )
}

export default Filters