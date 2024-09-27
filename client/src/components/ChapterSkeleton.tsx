import React from "react";

const ChapterSkeleton = () => {
  return (
    <div className="flex flex-col max-h-screen space-y-6 ">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="w-1/2 h-6 bg-gray-300 animate-pulse rounded"></div>
          <div className="w-1/4 h-6 bg-gray-300 animate-pulse rounded"></div>
        </div>
      </header>

      <div className="container flex flex-col md:flex-row gap-12">
        <main className="flex w-full flex-1 flex-col border rounded">
          {/* Chapter content loading skeleton */}
          <div className="flex-1 overflow-y-auto max-h-[32rem]">
            <div className="container my-4">
              <div className="w-full h-96 bg-gray-300 animate-pulse rounded"></div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChapterSkeleton;
