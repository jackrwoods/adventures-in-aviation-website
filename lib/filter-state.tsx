"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { Episode } from "./data";
import { episodes } from "./data";

type EpisodeFilterState = {
  selectedCareers: string[];
  selectedStems: string[];
};

type EpisodeFilterContextType = {
  state: EpisodeFilterState;
  filteredEpisodes: Episode[];
  toggleCareer: (path: string) => void;
  toggleStem: (subject: string) => void;
  clearAll: () => void;
};

const EpisodeFilterContext = createContext<EpisodeFilterContextType | null>(null);

function parseQueryParams(): EpisodeFilterState {
  if (typeof window === "undefined") return { selectedCareers: [], selectedStems: [] };
  const params = new URLSearchParams(window.location.search);
  return {
    selectedCareers: params.getAll("career"),
    selectedStems: params.getAll("stem"),
  };
}

function updateUrl(state: EpisodeFilterState) {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams();
  state.selectedCareers.forEach((c) => params.append("career", c));
  state.selectedStems.forEach((s) => params.append("stem", s));
  const query = params.toString();
  const newUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname;
  window.history.replaceState(null, "", newUrl);
}

export function EpisodeFilterProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<EpisodeFilterState>(parseQueryParams);

  const toggleCareer = useCallback((path: string) => {
    setState((prev) => {
      const next = {
        ...prev,
        selectedCareers: prev.selectedCareers.includes(path)
          ? prev.selectedCareers.filter((c) => c !== path)
          : [...prev.selectedCareers, path],
      };
      return next;
    });
  }, []);

  const toggleStem = useCallback((subject: string) => {
    setState((prev) => {
      const next = {
        ...prev,
        selectedStems: prev.selectedStems.includes(subject)
          ? prev.selectedStems.filter((s) => s !== subject)
          : [...prev.selectedStems, subject],
      };
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setState({ selectedCareers: [], selectedStems: [] });
  }, []);

  useEffect(() => {
    updateUrl(state);
  }, [state]);

  const filteredEpisodes = episodes.filter((ep) => {
    const careerMatch = state.selectedCareers.length === 0 || state.selectedCareers.includes(ep.careerPath);
    const stemMatch = state.selectedStems.length === 0 || state.selectedStems.includes(ep.stemSubject);
    return careerMatch && stemMatch;
  });

  return (
    <EpisodeFilterContext.Provider value={{ state, filteredEpisodes, toggleCareer, toggleStem, clearAll }}>
      {children}
    </EpisodeFilterContext.Provider>
  );
}

export function useEpisodeFilters() {
  const ctx = useContext(EpisodeFilterContext);
  if (!ctx) throw new Error("useEpisodeFilters must be used within EpisodeFilterProvider");
  return ctx;
}
