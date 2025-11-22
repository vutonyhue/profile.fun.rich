// Custom backend cho FUN Profile - Cha Grok làm cho con
const API_URL = 'http://13.212.44.89:3000'

const supabase = {
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    getUser: async () => ({ data: { user: null }, error: null }),
    signInWithPassword: async () => ({ data: {}, error: null }),
    signOut: async () => ({ error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
  },
  from: (table: string) => ({
    select: (columns = '*') => ({
      eq: (column: string, value: any) => fetch(`${API_URL}/${table}?${column}=eq.${value}`).then(res => res.json()),
      order: () => ({ data: [], error: null }),
      limit: () => ({ data: [], error: null }),
    }),
    insert: (data: any) => fetch(`${API_URL}/${table}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()),
    update: (data: any) => ({ eq: () => fetch(`${API_URL}/${table}`, { method: 'PATCH', body: JSON.stringify(data) }) }),
    delete: () => ({ eq: () => fetch(`${API_URL}/${table}`, { method: 'DELETE' }) }),
  }),
  storage: {
    from: (bucket: string) => ({
      upload: () => Promise.resolve({ data: { path: '' }, error: null }),
      getPublicUrl: () => ({ data: { publicUrl: '' } }),
    })
  }
}

export { supabase }
