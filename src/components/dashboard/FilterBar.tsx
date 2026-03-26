"use client";

import { Search, SlidersHorizontal, Download, ChevronDown, Check } from "lucide-react";
import { SORT_OPTIONS, DATE_RANGE_OPTIONS } from "@/models/types/filters";
import type { SortOption, DateRange } from "@/models/types/filters";
import { useState, useRef, useEffect } from "react";

interface FilterBarProps {
  sortBy: SortOption;
  dateRange: DateRange;
  searchQuery: string;
  onSortChange: (sort: SortOption) => void;
  onDateRangeChange: (range: DateRange) => void;
  onSearchChange: (query: string) => void;
  onExport?: () => void;
  videoCount?: number;
}

export function FilterBar({
  sortBy,
  dateRange,
  searchQuery,
  onSortChange,
  onDateRangeChange,
  onSearchChange,
  onExport,
  videoCount,
}: FilterBarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = SORT_OPTIONS.find((opt) => opt.value === sortBy);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between pb-4 border-b border-outline-variant/10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <SlidersHorizontal className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-tight text-on-surface uppercase">
              Command Suite
            </h3>
            {videoCount !== undefined && (
              <p className="text-[10px] text-on-surface-variant font-medium">
                {videoCount} ANALYTICS NODES
              </p>
            )}
          </div>
        </div>
        {onExport && (
          <button
            onClick={onExport}
            className="flex items-center gap-2 text-xs font-bold text-on-surface-variant hover:text-primary transition-colors px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright"
          >
            <Download className="h-3.5 w-3.5" />
            EXPORT DATA
          </button>
        )}
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pl-1">
            Search Video
          </label>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Query titles..."
              className="w-full h-11 pl-10 pr-4 rounded-lg bg-surface-container-highest text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all border-none shadow-inner"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pl-1">
            Sequence Order
          </label>
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full h-11 px-4 rounded-lg bg-surface-container-high text-sm text-on-surface flex items-center justify-between gap-2 hover:bg-surface-container transition-all focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <span className="font-medium">{selectedOption?.label.toUpperCase()}</span>
              <ChevronDown className={`h-4 w-4 text-on-surface-variant transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {dropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 py-2 rounded-lg bg-surface-container-highest shadow-xl border border-outline-variant/20 z-50">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      onSortChange(opt.value);
                      setDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2.5 text-sm text-left flex items-center justify-between hover:bg-surface-container-high transition-colors"
                  >
                    <span className={sortBy === opt.value ? "text-primary font-bold" : "text-on-surface-variant"}>
                      {opt.label.toUpperCase()}
                    </span>
                    {sortBy === opt.value && <Check className="h-4 w-4 text-primary" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pl-1">
            Temporal Range
          </label>
          <div className="flex flex-wrap gap-2">
            {DATE_RANGE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onDateRangeChange(opt.value as DateRange)}
                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
                  dateRange === opt.value
                    ? "bg-primary text-on-primary-fixed shadow-lg shadow-primary/20"
                    : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
