export interface Paste {
  id: string
  slug: string
  title: string | null
  content: string
  is_public: boolean
  creator_id: string | null
  expires_at: Date | null
  created_at: Date
  updated_at: Date
}

export interface PasteDTO
  extends Omit<Paste, 'id' | 'slug' | 'created_at' | 'updated_at'> {}
