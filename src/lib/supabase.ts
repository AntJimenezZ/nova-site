import { createClient } from '@supabase/supabase-js'

type SupabaseConfig = {
	url: string
	key: string
}

function getSupabaseConfig(): SupabaseConfig | null {
	const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || ''
	const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

	if (!url || !key) {
		return null
	}

	if (url === 'https://placeholder.supabase.co' || key === 'placeholder') {
		return null
	}

	return { url, key }
}

export function getSupabaseServerClient() {
	const config = getSupabaseConfig()

	if (!config) {
		return null
	}

	return createClient(config.url, config.key)
}
