import { useEffect, useState } from "react"
import { Circle, MoonIcon, SearchIcon, SlidersHorizontal, SunIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

interface SearchbarProps {
    value: string,
    onChange: (value: string) => void
    toggleFilter: () => void
    status: string
    toggleStatus: () => void
}

const Searchbar: React.FC<SearchbarProps> = ({ 
    value,
    onChange,
    toggleFilter,
    status,
    toggleStatus
}) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Apply dark mode based on state
    useEffect(() => {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }, [isDarkMode]);
  
    const toggleTheme = () => {
      setIsDarkMode((prevMode) => !prevMode);
    };

    return (
        <div className="flex gap-2">
            <div className="relative w-full">
                <SearchIcon className="absolute top-2.5 left-2.5 size-5" />
                <Input 
                    className="pl-10 h-full" 
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Search manga name..."
                />
            </div>
            <Button onClick={toggleFilter}>
                <SlidersHorizontal />
            </Button>
            <Button onClick={toggleTheme}>
                {isDarkMode ? <SunIcon /> : <MoonIcon /> }
            </Button>
            <Button onClick={toggleStatus}>
                <Circle 
                    style={{
                        "fill": status === "all" 
                        ? "none"
                        : status === "ongoing"
                        ? "#ff9800"
                        : "#28E745"
                    }}
                />
            </Button>
        </div>
    )
}

export default Searchbar