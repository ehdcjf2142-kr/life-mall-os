import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import {
  ALL_CATEGORIES,
  SEED_RECORDS,
  type LifeRecord,
} from '../data/mallData'

type RecordsContextValue = {
  records: LifeRecord[]
  inboxCount: number
  addInboxRecord: (title: string, content: string) => void
  routeFromInbox: (recordId: string, categoryName: string) => void
  getRecordsByCategory: (categoryName: string) => LifeRecord[]
}

const RecordsContext = createContext<RecordsContextValue | null>(null)

function formatNow() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
    now.getDate(),
  ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(
    now.getMinutes(),
  ).padStart(2, '0')}`
}

export function RecordsProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<LifeRecord[]>(SEED_RECORDS)

  const value = useMemo<RecordsContextValue>(
    () => ({
      records,
      inboxCount: records.filter((record) => record.isInbox).length,
      addInboxRecord: (title, content) => {
        setRecords((previous) => [
          {
            id: crypto.randomUUID(),
            title,
            content,
            floor: '1F',
            tagCategory: '',
            createdAt: formatNow(),
            isInbox: true,
          },
          ...previous,
        ])
      },
      routeFromInbox: (recordId, categoryName) => {
        const categoryMeta = ALL_CATEGORIES.find(
          (category) => category.name === categoryName,
        )
        if (!categoryMeta) return

        setRecords((previous) =>
          previous.map((record) =>
            record.id === recordId
              ? {
                  ...record,
                  isInbox: false,
                  floor: categoryMeta.floor,
                  tagCategory: categoryMeta.name,
                }
              : record,
          ),
        )
      },
      getRecordsByCategory: (categoryName) =>
        records.filter(
          (record) => !record.isInbox && record.tagCategory === categoryName,
        ),
    }),
    [records],
  )

  return (
    <RecordsContext.Provider value={value}>{children}</RecordsContext.Provider>
  )
}

export function useRecords() {
  const context = useContext(RecordsContext)
  if (!context) {
    throw new Error('useRecords must be used within RecordsProvider')
  }
  return context
}
