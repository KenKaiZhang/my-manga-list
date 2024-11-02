import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { useMemo } from "react";

type Manga = {
    id: string;
    title: string;
    author: string;
    ongoing: boolean;
    chapters: number;
    tags: string[];
    cover: string;
};

interface MangaListProps {
    mangas: Manga[]
    status: string
    search: string
    filters: string[]
}

const MangaList: React.FC<MangaListProps> = ({ mangas, status, search, filters }) => {

    const filteredMangas = useMemo(() => {
        const searchLower = search.toLowerCase()
        return mangas
            .filter(({ title, tags, ongoing }) => {
                const statusMatch = status === "all" 
                    ? true 
                    : status === "ongoing" && ongoing
                    ? true
                    : status === "completed" && !ongoing
                    ? true
                    : false
                const titleMatch = title.toLowerCase().includes(searchLower)
                const tagMatch = filters.length > 0 ? tags.some(tag => filters.includes(tag)) : true;
                return titleMatch && tagMatch && statusMatch
            })
            .sort((a, b) => a.title.localeCompare(b.title))
    },[filters, mangas, search, status])

    return (
        <div className="pb-4 grid gap-2 sm:grid-cols-2">
            {filteredMangas.map(({ id, title, author, ongoing, chapters, tags, cover } ) => {
                return (
                    <Dialog key={id}>
                        <DialogTrigger asChild>
                            <div className="relative pr-1 pl-4 py-1 h-[100px] flex items-center border rounded-md duration-300 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer">
                                <div>
                                    <h1 className="font-bold">{title}</h1>
                                    <p className="text-xs text-gray-400">{author}</p>
                                </div>   
                                <div 
                                    className="absolute -top-2 -right-2 h-[15px] aspect-square rounded-full"
                                    style={{ background: ongoing ? "#ff9800" : "#28E745"}}
                                />
                                <img 
                                    src={cover}
                                    alt={id}
                                    className="ml-auto h-full aspect-[2/3] rounded-md object-cover shadow-xl"
                                />                            
                            </div>
                        </DialogTrigger>
                        <DialogContent className="p-0">
                            <div className="relative h-[300px] flex justify-center items-center overflow-hidden">
                                <img 
                                    src={cover}
                                    alt={id}
                                    className="absolute inset-0 w-full h-full object-cover blur-md filter brightness-75"
                                />   
                                <div className="relative flex h-[90%] max-w-[90%] gap-4">
                                    <img 
                                        src={cover}
                                        alt={id}
                                        className="h-full aspect-[2/3] rounded-md object-cover shadow-lg"
                                    />  
                                    <div className="mt-auto">
                                        <h1 className="font-bold text-white text-4xl">{title}</h1>
                                        <p className="text-white">{author}</p>
                                    </div>   
                                </div>
                            </div>
                            <div className="px-4 pb-4 flex flex-col gap-2">
                                <span><b>Chapters: </b>{chapters}</span>
                                <span className="mb-2 flex gap-2">
                                    <b>Status: </b>
                                    <p style={{ color: ongoing ? "#ff9800" : "#28E745"}}>
                                        {ongoing ? "Ongoing" : "Completed"}
                                    </p>
                                </span>
                                <div className="flex gap-2 flex-wrap">
                                    {tags.map((tag) => <Badge key="tag">{tag}</Badge>)}
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                )
            })}
        </div>
    )
}

export default MangaList