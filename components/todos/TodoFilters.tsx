'use client'

import { Button } from '@/components/ui/button'
import type { TodoFilter } from '@/lib/types'

interface TodoFiltersProps {
  currentFilter: TodoFilter
  onFilterChange: (filter: TodoFilter) => void
  counts: {
    all: number
    active: number
    completed: number
  }
}

export function TodoFilters({ currentFilter, onFilterChange, counts }: TodoFiltersProps) {
  const filters: { value: TodoFilter; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: counts.all },
    { value: 'active', label: 'Active', count: counts.active },
    { value: 'completed', label: 'Completed', count: counts.completed },
  ]

  return (
    <div className="flex gap-2 justify-center">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          variant={currentFilter === filter.value ? 'default' : 'outline'}
          size="sm"
        >
          {filter.label} ({filter.count})
        </Button>
      ))}
    </div>
  )
}
