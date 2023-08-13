import Link from "next/link";
import React from "react";
import { Chapter } from "../../global";

interface ModuleCardProps {
  chapter: Chapter;
}
const ChapterCard = ({ chapter }: ModuleCardProps) => {
  return (
    <Link href={`/chapter/${chapter.slug}`}>
      <div className="relative overflow-hidden rounded-lg border bg-background p-2 cursor-pointer hover:border-primary hover:shadow-lg">
        <div className="flex h-[150px] flex-col justify-between rounded-md p-6">
          <div className="space-y-2">
            <h3 className="font-bold">{chapter.name}</h3>
            <p className="text-sm text-muted-foreground">
              {chapter.description.length > 100
                ? chapter.description.substring(0, 100) + "..."
                : chapter.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ChapterCard;
