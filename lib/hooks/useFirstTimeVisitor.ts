"use client";
import { useState, useEffect } from "react";

const FIRST_VISIT_KEY = "maze_group_first_visit";

export const useFirstTimeVisitor = () => {
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem(FIRST_VISIT_KEY);

    if (!hasVisited) {
      setIsFirstVisit(true);
    }

    setIsLoading(false);
  }, []);

  const markAsVisited = () => {
    localStorage.setItem(FIRST_VISIT_KEY, "true");
    setIsFirstVisit(false);
  };

  return {
    isFirstVisit,
    isLoading,
    markAsVisited,
  };
};
