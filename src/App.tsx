import { useMemo, useState } from "react";
import { Badge } from "./components/ui/badge";
import { XIcon } from "lucide-react";
import Searchbar from "./components/modules/Searchbar";
import Filters from "./components/modules/Filters";

import MangaList from "./components/modules/MangaList";
import mangaData from "./saved_manga_list.json"

function App() {
  // const [mangaData, setMangaData] = useState<Manga[]>([])
  const [search, setSearch] = useState<string>("")
  const [filters, setFilters] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const [status, setStatus] = useState("all")

  const filterOptions: string[] = useMemo(() => {
    const tagsSet = new Set<string>()
    Object.values(mangaData).map(({ tags }) => {
      tags.forEach((tag: string) => tagsSet.add(tag))
      return null
    })
    return Array.from(tagsSet)
  }, [])

  const toggleFilter = () => {
    setShowFilters(!showFilters)
  }

  const toggleStatus = () => {
    if (status === "all") setStatus("ongoing")
    else if (status === "ongoing") setStatus("completed")
    else setStatus("all")
  }

  const handleSearch = (value: string) => {
    setSearch(value)
  }

  const handleAddFilter = (filter: string) => {
    setFilters((prev) => [...prev, filter])
  }

  const handleRemoveFilter = (filter: string) => {
    setFilters((prev) => prev.filter((f) => f !== filter));
  };

  return (
    <div className="p-4 w-screen h-screen">
      <div className="pb-4 w-full flex justify-center items-center">
        <b>Ken's Manga List</b>
      </div>

      <Searchbar 
        status={status}
        value={search}
        onChange={handleSearch}
        toggleFilter={toggleFilter}
        toggleStatus={toggleStatus}
      />

      <section style={{paddingBlock: filters.length === 0 ? "0.5rem" : "1rem"}}>
        <div className="flex flex-wrap gap-2">
          {filters.length > 0 && (
            <Badge className="bg-red-500 cursor-pointer" onClick={() => setFilters([])}>
              <XIcon className="size-4 cursor-pointer" />
            </Badge>
          )}
          {filters.map((filter) => (
            <Badge>
              {filter}
              <XIcon 
                className="size-4 cursor-pointer" 
                onClick={() => handleRemoveFilter(filter)}
              />
            </Badge>
          ))}
        </div>
        <div 
          className="overflow-hidden ease-in-out duration-300"
          style={{ maxHeight: showFilters ? "500px" : 0 }}
        >
          <div className="py-3 flex justify-center items-center">
            <div className="h-[1px] w-[80%] bg-gray-300" />
          </div>
          <Filters 
            selected={filters}
            onClick={handleAddFilter}
            options={filterOptions} 
          />
        </div>
      </section>

      <MangaList 
        status={status}
        mangas={mangaData} 
        search={search} 
        filters={filters}
      />
    </div>
  );
}

export default App;
